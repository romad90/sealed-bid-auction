'use strict'

module.exports = bids => {
  if (!bids.reserve_price) return false
  if (!Number.isInteger(bids.reserve_price)) return false
  if (bids.reserve_price <= 0) return false

  let nBidders = 0
  const keys = Object.keys(bids)
  let isAllBidsAreInteger = true

  keys.forEach(bidderName => {
    if (['reserve_price'].includes(bidderName)) return
    if (bids[bidderName].length > 0) nBidders++

    for (let i = 0; i < bids[bidderName].length; i++) {
      if (!Number.isInteger(bids[bidderName][i])) {
        isAllBidsAreInteger = false
        break
      }
    }
  })
  if (!isAllBidsAreInteger) return false

  if (nBidders < 2) return false

  return true
}
