'use strict'

module.exports = source => {
  const fs = require('fs')
  const path = require('path')

  fs.readFile(path.join(source), function (err, rawData) {
    if (err) {
      throw err
    }
    let data
    try {
      data = JSON.parse(rawData)
    } catch (e) {
      throw e
    }

    const AVLTree = require('../lib/avl_tree.js')
    const auctionFilter = require('./filter_auction.js')
    const auctions = data.auctions.filter(auctionFilter)
    const processed = []

    console.log('*processing:')
    console.log('************\n')

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
      console.log(bids)
      console.log('\n')
      delete auctions[index]
    })
    console.log('*end:')
    console.log('************\n')
    process.exit(0)
  })
}
