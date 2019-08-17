async function routes (fastify, options) {	
  /**
   * @api {get} / Entry point.
   * @apiName GetConnection
   * @apiGroup Connection
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
   *  Connected to the WebServices around sealed-bid auction!
   */
  fastify.get('/', function (request, reply) {
    reply.send('Connected to the WebServices around sealed-bid auction!')
  })

  /**
   * @api {post} / Request an array of bids objects to computation in order to determine the winner and the winning price.
   * @apiName PostBids
   * @apiGroup Bids
   *
   *  @apiParam {Array} auctions All bids for an auction session.
   *
   *  [ {
   *      reserve_price: 100, //mandatory
   *      A: [ 110, 130 ],
   *      ...
   *      Z: [ 132, 135, 140 ]
   *    }
   *  ]
   *
   *  @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *      "winner": "John Doe",
   *      "winning-price": "67"
   * }
   * @apiSuccess {String} winner Name of the bidder.
   * @apiSuccess {Integer} winning-price Winner price of the sealed-bid auction.
   *
   *
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 404 Not Found
   *  {
   *      "code":"ResourceNotFound",
   *      "message":"/wrong-url does not exist"
   *  }
   *
   * @apiErrorExample {json} Error-Response:
   *   HTTP/1.1 500 Internal Server Error
   *  {
   *      "code":"boom!",
   *      "message":"an internal server error occurred!"
   *  }
   */
  fastify.post('/', function (request, reply) {
    const auctionFilter = require('../../filter_auction.js')
    const rawAuctions = request.body.auctions
    const auctions = rawAuctions.filter(auctionFilter)

    //Computation
    const AVLTree = require('../../../lib/avl_tree.js')
    const processed = []
    auctions.forEach((bids, index) => {
      const bst = new AVLTree()
      bst.insert(bids.reserve_price)
      bids.winner = false
      bids.winning_price = false
      const keys = Object.keys(bids)
      keys.forEach(bidderName => {
        if (['winner', 'winning_price', 'reserve_price'].includes(bidderName))
          return
        bids[bidderName].forEach(amount => {
          bst.insert(amount, bidderName)
        })
      })

      const treeNodeWinner = bst.getTreeNodeWinner()
      if (treeNodeWinner) {
        const treeNodeWinningPrice = bst.getTreeNodeWinningPrice(
          bst.root,
          treeNodeWinner
        )
        if (treeNodeWinningPrice) {
          bids.winner = treeNodeWinner.bidders[0]
          bids.winning_price = treeNodeWinningPrice.key
        }
      }
      processed.push(bids)
      delete auctions[index]
    })

    reply.send({
      processed
    })
  })
}

module.exports = routes
