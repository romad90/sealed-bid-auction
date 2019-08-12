/**
 * Custom Binary Search Tree applied to the problem.
 * Based for like AVL Tree, Red-black Tree.
 * Time complexity: Access O(n), Search O(n), Delete O(n), Insert O(n)
 * Space complexity: O(n)
 */
const Node = require('./node.js')

class BST {
  constructor() {
    this.root = null
  }
  isBST() {

  }
  add(key, bidderName) {
    const node = new Node(key, bidderName)
    if (!this.root) {
      this.root = node
      return
    }
    let currNode = this.root
    while (currNode) {
      if (key === currNode.key) {
        currNode.addBidder(bidderName)
        return
      }
      else if (key < currNode.key) {
        if (!currNode.left) {
          currNode.addLeftNode(node)
          return
        } else {
          currNode = currNode.left
        }
      } else {
        if (!currNode.right) {
          currNode.addRightNode(node)
          return
        } else {
          currNode = currNode.right
        }
      }
    }
  }
  search(key) {
    if (!Number.isInteger(key)) throw new Error('must be an integer!')
    if (!this.root) throw new Error('BST is empty!')

    let currNode = this.root
    while (currNode) {
      if (key === currNode.key) return currNode
      if (key < currNode.key) {
        if (!currNode.left) {
          return false
        } else {
          currNode = currNode.left
        }
      } else {
        if (!currNode.right) {
          return false
        } else {
          currNode = currNode.right
        }
      }
    }
  }
  getMin(node) {
    const _ = function (node, min) {
      if (!node) return min
      min = node.key
      return _(node.left, min)
    }
    return _(node || this.root, 0)
  }
  getMax(node) {
    const _ = function (node, max) {
      if (!node) return max
      max = node.key
      return _(node.right, max)
    }

    return _(node || this.root, 0)
  }
}

exports.BST = BST
