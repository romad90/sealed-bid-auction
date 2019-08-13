/**
 * Custom Binary Search Tree applied to the problem backed on AVLTree
 * Time complexity: Access O(log n), Search O(log n), Delete O(log n), Insert O(log n)
 * Space complexity: O(n)
 */
const TreeNode = require('./treeNode.js')
const RESERVE_PRICE = '*reservePrice'

class AVLTree {
  constructor () {
    this.root = null
    this.isReservePriceSet = false
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
    if (
      this.isReservePriceSet === true &&
      (bidderName === RESERVE_PRICE || !bidderName)
    )
      throw new Error('Reserve price must be set once!')

    if (!this.root) {
      this.isReservePriceSet = true
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
}

module.exports = AVLTree
