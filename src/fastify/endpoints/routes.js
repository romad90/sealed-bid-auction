async function routes (fastify, options) {	
  /**
   * @api {get} / Web services status
   * @apiName GetStatus
   * @apiGroup Status
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
   * @api {post} / Run computation on sessions sent
   * @apiName PostAuctions
   * @apiGroup Auction
   *
   *  @apiParam {Object[]} auctions All bids by an auction session.
	 *	@apiParam {Integer} auction.bid.reserve_price Reserve price.
	 *	@apiParam {Integer} auction.bid.some_bidder_name_a Amount bid.
	 *	@apiParam {Integer} auction.bid.some_bidder_name_b Amount bid.
	 *	@apiParam {Integer} [auction.bid.some_bidder_name_c] Amount bid.
	 *	@apiParam {Integer} [auction.bid.some_bidder_name_d] Amount bid.
   *
   *  @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
	 *    "processed": [
	 *        {
	 *           "reserve_price": 100,
	 *           "some_bidder_name_a": [110, 130],
	 *           "some_bidder_name_b": [],
	 *           "some_bidder_name_c": [125],
	 *           "some_bidder_name_d": [105],
	 *           "winner": "some_bidder_name_a",
	 *           "winning_price": 125
	 *        }
	 *    ]
	 *  }
	 *
   * @apiSuccess {Object[]} processed All bids by an auction session, and the state session.
	 * @apiSuccess {Integer} processed.bid.reserve_price Reserve price.
	 * @apiSuccess {Integer} processed.bid.some_bidder_name_a Amount bid.
	 * @apiSuccess {Integer} processed.bid.some_bidder_name_b Amount bid.
	 * @apiSuccess {Integer} [processed.bid.some_bidder_name_c] Amount bid.
	 * @apiSuccess {Integer} [processed.bid.some_bidder_name_d] Amount bid.
   * @apiSuccess {String}  processed.bid.winner Name of the bidder(Or false).
   * @apiSuccess {Integer} processed.bid.winning_price Winner price of the sealed-bid auction(Or false).
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
