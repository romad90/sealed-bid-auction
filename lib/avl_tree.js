'use strict'

/**
 * Custom AVLTree
 * Time complexity: Access O(log n), Search O(log n), Delete O(log n), Insert O(log n)
 * Space complexity: O(n)
 */
const TreeNode = require('./tree_node.js')

class AVLTree {
  /**
   * Creates a AVLTree.
   * @param {TreeNode} root
   * @param {Integer} reservePrice
   */
  constructor () {
    this.root = null
    this.reservePrice = null
  }
  getHeight (root) {
    if (!root) return 0
    return root.height
  }
  getBalance (root) {
    if (!root) return 0
    return this.getHeight(root.left) - this.getHeight(root.right)
  }
  getTotalHeight () {
    if (!this.root) return 0
    return (
      1 +
      Math.max(this.getHeight(this.root.left), this.getHeight(this.root.right))
    )
  }
  //Do a In-Order traversale, keeping track of the previously visited node. If
  //the current node is less than the previous then the tree is not BST.
  //Left subtree of a node must contains only nodes with keys less than the node's key
  //Right substress of a  node contains only nodes with keys greater than the node's key
  //Both leafs must also be binary search trees
  isBST () {
    let prev = null
    const _isBST = root => {
      if (!root) return true
      if (!_isBST(root.left)) return false
      if (prev && prev.key > root.key) return false
      prev = root
      return _isBST(root.right)
    }
    return _isBST(this.root)
  }

  //Return true if difference between heights is not more than 1 and left and right subtrees are balanced, otherwise return false
  isBSTBalanced () {
    const _isBSTBalanced = (self, root) => {
      if (!root) return true

      let lh = self.getHeight(root.left)
      let rh = self.getHeight(root.right)

      if (
        Math.abs(lh - rh) <= 1 &&
        _isBSTBalanced(self, root.left) &&
        _isBSTBalanced(self, root.right)
      )
        return true

      return false
    }
    return _isBSTBalanced(this, this.root)
  }
  insert (key, bidderName) {
    if (!bidderName && this.reservePrice)
      throw new Error('Start price must be set once!')

    if (!this.root) {
      if (key <= 0) throw new Error('start_price must be greater than 0!')
      this.reservePrice = key
      this.root = new TreeNode(key)
      return
    }
    const _insert = (self, root, key, bidderName) => {
      //1- Perform normal BST
      if (!root) {
        return new TreeNode(key, bidderName)
      } else if (key < root.key) {
        root.left = _insert(self, root.left, key, bidderName)
      } else if (key > root.key) {
        root.right = _insert(self, root.right, key, bidderName)
      } else {
        root.addBidder(bidderName)
        return root
      }

      //2- Update the height of the ancestor node
      root.height =
        1 + Math.max(self.getHeight(root.left), self.getHeight(root.right))

      //3- Get the balance factor
      const balance = this.getBalance(root)

      //4- Check if the node is unbalanced - 4 Cases
      if (balance > 1 && key < root.left.key) {
        // LL
        return self.rightRotate(root)
      }
      if (balance < -1 && key > root.right.key) {
        // RR
        return self.leftRotate(root)
      }
      if (balance > 1 && key > root.left.key) {
        //LR
        root.left = self.leftRotate(root.left)
        return self.rightRotate(root)
      }
      if (balance < -1 && key < root.right.key) {
        //RL
        root.right = self.rightRotate(root.right)
        return self.leftRotate(root)
      }
      return root
    }
    this.root = _insert(this, this.root, key, bidderName)
  }
  //rotation to keep the BST balanced
  leftRotate (z) {
    let y = z.right
    let t2 = y.left

    //rotation
    y.left = z
    z.right = t2

    //update heights
    z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right))
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right))

    //return the new root
    return y
  }
  //rotation to keep the BST balanced
  rightRotate (z) {
    let y = z.left
    let t3 = y.right

    //rotation
    y.right = z
    z.left = t3

    //update heights
    z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right))
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right))

    //return the new root
    return y
  }
  preOrder () {
    const out = []
    const preOrderHelper = (node, arr) => {
      if (!node) return arr
      arr.push(node.key)
      preOrderHelper(node.left, arr)
      preOrderHelper(node.right, arr)
    }
    preOrderHelper(this.root, out)
    return out
  }

  getMaxTreeNode (root) {
    if (!root.right) return root
    return this.getMaxTreeNode(root.right)
  }

  //Return the winner of the auction, must be one and only one highest bidder
  getTreeNodeWinner () {
    const _getMax = (node, maxNode) => {
      if (
        !node &&
        maxNode.bidders.length === 1 &&
        maxNode.key > this.reservePrice
      )
        return maxNode
      if (!node) return false
      maxNode = node
      return _getMax(node.right, maxNode)
    }
    return _getMax(this.root, null)
  }

  //Return the winning price, using a variant InorderPrecessor traversale
  getTreeNodeWinningPrice (root, node) {
    if (node === false) return false
    if (node.bidders.length === 1 && node.key === this.reservePrice) return node
    if (node.left) return this.getMaxTreeNode(node.left)

    let predecessor = null

    while (root) {
      if (
        node.key === root.key &&
        predecessor.bidders.indexOf(node.bidders[0]) > -1 &&
        predecessor.bidders.length === 1
      ) {
        return this.getTreeNodeWinningPrice(this.root, predecessor)
      } else if (
        node.key === root.key &&
        predecessor.key >= this.reservePrice
      ) {
        // by now we might found our predecessor
        break
      } else if (node.key === root.key && predecessor.key < this.reservePrice) {
        // by now we know that there is no winner
        predecessor = null
        break
      } else if (node.key < root.key) {
        root = root.left
      } else if (node.key > root.key) {
        predecessor = root
        root = root.right
      }
    }
    return predecessor
  }
}

module.exports = AVLTree
