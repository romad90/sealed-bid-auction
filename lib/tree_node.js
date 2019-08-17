;`use strict`
/** Class representating a TreeNode datastructure allowing us to manipulate data around the sealed-bid auction. */
class TreeNode {
  /**
   * Creates a TreeNode.
   * @param {integer} key - the amount of the bid.
   * @param {string} bidderName - the name of the first bidder putting this amount.
   */
  constructor (key, bidderName) {
    if (!Number.isInteger(key)) throw new Error('must be an integer!')
    this.key = key
    this.bidders = bidderName ? [bidderName] : []
    this.left = null //The left sub-tree of a node has a key less than to its parent node's key.
    this.right = null //The right sub-tree of a node has a key greater than to its parent node's key.
    this.height = 1 //Height's TreeNode
  }
  addBidder (bidderName) {
    if (!bidderName) throw new Error('bidderName cannot be null!')
    this.bidders.push(bidderName)
  }
}

module.exports = TreeNode
