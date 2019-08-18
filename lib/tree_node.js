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
    
    /**
     * left is a subtree of a node. His key is lesser than it's parent node's
     * key.
     * @type {TreeNode}
     */
    this.left = null

    /**
     * right is a subtree of a node. His key is greater than it's parent node's
     * key.
     * @type {TreeNode}
     */
    this.right = null

    /**
     * height is related to the node. His value is updated when new nodes are
     * added.
     * @type {Integer}
     */
    this.height = 1 //Height's TreeNode
  }
  
  /**
   * Add a bidderName to the bidders property. By this way we are able to know
   * which bid's amount has been placed by who.
   * @type {Integer}
   */
  addBidder (bidderName) {
    if (!bidderName) throw new Error('bidderName cannot be null!')
    this.bidders.push(bidderName)
  }
}

module.exports = TreeNode
