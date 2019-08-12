/**
 * Custom Binary Search Tree applied to the problem.
 * Based for a Self-Balanced BST like AVL Tree, Red-black Tree.
 * Time complexity: Access O(n), Search O(n), Delete O(n), Insert O(n)
 * Space complexity: O(n)
 */
const Node = require('./node.js')
const RESERVE_PRICE = '*reservePrice'

class BST {
  constructor() {
    this.root = null
    this.isReservePriceSet = false
  }
  isBST() {

  }
  add(key, bidderName) {
    if (this.isReservePriceSet === true && (bidderName === RESERVE_PRICE || !bidderName)) 
      throw new Error('Reserve price must be set once!')
    
    if (!this.root) {
      this.root = new Node(key)
      this.isReservePriceSet = true
      return
    }
    const node = new Node(key, bidderName)
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
  getMax(node) {
    const _ = function (node, max) {
      if (!node) return max
      max = node.key
      return _(node.right, max)
    }

    return _(node || this.root, 0)
  }
}

module.exports = BST
