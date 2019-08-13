;`use strict`

const chai = require('chai')
const expect = chai.expect
const TreeNode = require('../lib/treeNode.js')

describe('TreeNode', () => {
  it('constructor(12.5) should NOT create a treeNode passing a float because, the key must be an integer.', done => {
    try {
      const treeNode = new TreeNode(12.5)
    } catch (err) {
      expect(err.message).to.equal('must be an integer!')
    }
    done()
  })
  it('constructor(true) should NOT create a treeNode passing a boolean  because, the key must be an integer.', done => {
    try {
      const treeNode = new TreeNode('coucou')
    } catch (err) {
      expect(err.message).to.equal('must be an integer!')
    }
    done()
  })
  it('constructor(undefined) should NOT create a treeNode passing a string  because, the key must be an integer.', done => {
    try {
      const treeNode = new TreeNode(undefined)
    } catch (err) {
      expect(err.message).to.equal('must be an integer!')
    }
    done()
  })
  it('constructor({}) should NOT create a treeNode passing an object  because, the key must be an integer.', done => {
    try {
      const treeNode = new TreeNode('coucou')
    } catch (err) {
      expect(err.message).to.equal('must be an integer!')
    }
    done()
  })
  it('constructor(null) should NOT create a treeNode passing a null  because, the key must be an integer.', done => {
    try {
      const treeNode = new TreeNode(null)
    } catch (err) {
      expect(err.message).to.equal('must be an integer!')
    }
    done()
  })
  it('constructor(`12`) should NOT create a treeNode passing a string  because, the key must be an integer.', done => {
    try {
      const treeNode = new TreeNode('12')
    } catch (err) {
      expect(err.message).to.equal('must be an integer!')
    }
    done()
  })
  it('constructor(667) should create a treeNode with a key equal to 667.', done => {
    const treeNode = new TreeNode(667)
    expect(treeNode.key).to.equal(667)
    done()
  })
  it('constructor(667) should create a treeNode with a bidders property having *reservePrice only.', done => {
    const treeNode = new TreeNode(667)
    expect(treeNode.bidders).to.eql(['*reservePrice'])
    done()
  })
  it('constructor(667) should create a treeNode with a left property equal to null.', done => {
    const treeNode = new TreeNode(667)
    expect(treeNode.left).to.equal(null)
    done()
  })
  it('constructor(667) should create a treeNode with a right property equal to null.', done => {
    const treeNode = new TreeNode(667)
    expect(treeNode.right).to.equal(null)
    done()
  })
  it('constructor(667) should create a treeNode with a height property equal to 1.', done => {
    const treeNode = new TreeNode(667)
    expect(treeNode.height).to.equal(1)
    done()
  })
  it('constructor(667, marcus) should create a treeNode with a bidders property having marcus only.', done => {
    const treeNode = new TreeNode(667, 'marcus')
    expect(treeNode.bidders).to.eql(['marcus'])
    done()
  })
  it('addBidder() should NOT insert a new bidder in the bidders property, because bidderName cannot be null.', done => {
    try {
      const treeNode = new TreeNode(667, 'marcus')
      treeNode.addBidder()
    } catch (err) {
      expect(err.message).to.equal('bidderName cannot be null!')
    }
    done()
  })
  it('addBidder(thomas) should insert a new bidder in the bidders property which must contains [marcus, thomas].', done => {
    const treeNode = new TreeNode(667, 'marcus')
    treeNode.addBidder('thomas')
    expect(treeNode.bidders).to.eql(['marcus', 'thomas'])
    done()
  })
})
