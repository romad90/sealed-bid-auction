;`use strict`

/** Class representating a Node datastructure allowing us to manipulate data around the sealed-bid auction. */
const RESERVE_PRICE = '*reservePrice'
class Node {
  /**
   * Creates a node.
   * @param {integer} key - the amount of the bid.
   * @param {string} bidderName - the name of the first bidder putting this amount.
   */
  constructor (key, bidderName = RESERVE_PRICE) {
    if (!Number.isInteger(key)) throw new Error('must be an integer!')
    this.key = key
    this.bidders = [bidderName]
    this.left = null //The left sub-tree of a node has a key less than to its parent node's key.
    this.right = null //The right sub-tree of a node has a key greater than to its parent node's key.
  }
  addBidder (bidderName) {
    if (!bidderName) throw new Error('bidderName cannot be null!')
    this.bidders.push(bidderName)
  }
  addLeftNode (node) {
    if (!node || node.constructor !== Node)
      throw new Error('must be a Node object!')
    if (node.key > this.key)
      throw new Error(
        `New node value must be lesser than the current one : ${node.key} > ${
          this.key
        }.`
      )
    this.left = node
  }
  addRightNode (node) {
    if (!node || node.constructor !== Node)
      throw new Error('must be a Node object!')
    if (node.key < this.key)
      throw new Error(
        `New node value must be greater than the current one : ${node.key} < ${
          this.key
        }.`
      )
    this.right = node
  }
}

module.exports = Node
