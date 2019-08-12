;`use strict`

const chai = require('chai')
const expect = chai.expect
const Node = require('../lib/node.js')

describe('Node', () => {
  it('constructor(12.5) should NOT create a node passing a float because, the key must be an integer.', done => {
    try {
      const node = new Node(12.5)
    } catch (err) {
      expect(err.message).to.equal('must be an integer!')
    }
    done()
  })
  it('constructor(true) should NOT create a node passing a boolean  because, the key must be an integer.', done => {
    try {
      const node = new Node('coucou')
    } catch (err) {
      expect(err.message).to.equal('must be an integer!')
    }
    done()
  })
  it('constructor(undefined) should NOT create a node passing a string  because, the key must be an integer.', done => {
    try {
      const node = new Node(undefined)
    } catch (err) {
      expect(err.message).to.equal('must be an integer!')
    }
    done()
  })
  it('constructor({}) should NOT create a node passing an object  because, the key must be an integer.', done => {
    try {
      const node = new Node('coucou')
    } catch (err) {
      expect(err.message).to.equal('must be an integer!')
    }
    done()
  })
  it('constructor(null) should NOT create a node passing a null  because, the key must be an integer.', done => {
    try {
      const node = new Node(null)
    } catch (err) {
      expect(err.message).to.equal('must be an integer!')
    }
    done()
  })
  it('constructor(`12`) should NOT create a node passing a string  because, the key must be an integer.', done => {
    try {
      const node = new Node('12')
    } catch (err) {
      expect(err.message).to.equal('must be an integer!')
    }
    done()
  })
  it('constructor(667) should create a node with a bidders property having *reservePrice(empty) and a key equal to 667.', done => {
    const node = new Node(667)
    expect(node.key).to.equal(667)
    expect(node.bidders).to.eql(['*reservePrice'])
    expect(node.left).to.equal(null)
    expect(node.right).to.equal(null)
    done()
  })
  it('constructor(667, marcus) should create a node with a bidders property having marcus and a key equal to 667.', done => {
    const node = new Node(667, 'marcus')
    expect(node.key).to.equal(667)
    expect(node.bidders).to.eql(['marcus'])
    expect(node.left).to.equal(null)
    expect(node.right).to.equal(null)
    done()
  })
  it('addBidder() should NOT insert a new bidder in the bidders property, because bidderName cannot be null.', done => {
    try {
      const node = new Node(957, 'charly')
      node.addBidder()
    } catch (err) {
      expect(err.message).to.equal('bidderName cannot be null!')
    }
    done()
  })
  it('addBidder(bravo) should insert a new bidder in the bidders property.', done => {
    const node = new Node(957, 'charly')
    node.addBidder('bravo')
    expect(node.bidders).to.eql(['charly', 'bravo'])
    done()
  })
  it('addLeftNode(node) should NOT insert on the left a new node having a key value greater than the current one.', done => {
    const node1 = new Node(957, 'charly')
    const node2 = new Node(958, 'delta')
    try {
      node1.addLeftNode(node2)
    } catch (err) {
      expect(err.message).to.equal(
        `New node value must be lesser than the current one : ${node2.key} > ${
          node1.key
        }.`
      )
    }
    done()
  })
  it('addLeftNode(node) should NOT insert on the left anything <> Node object.', done => {
    const node1 = new Node(957, 'charly')
    try {
      node1.addLeftNode()
    } catch (err) {
      expect(err.message).to.equal(`must be a Node object!`)
    }
    done()
  })
  it('addLeftNode(node) should insert on the left a new node having a key value lesser than the current one.', done => {
    const node1 = new Node(957, 'charly')
    const node2 = new Node(858, 'delta')
    node1.addLeftNode(node2)
    expect(node1.left.key).to.be.lt(node1.key)
    done()
  })
  it('addRightNode(node) should NOT insert on the right a new node having a key value lesser than the current one.', done => {
    const node1 = new Node(957, 'charly')
    const node2 = new Node(956, 'delta')
    try {
      node1.addRightNode(node2)
    } catch (err) {
      expect(err.message).to.equal(
        `New node value must be greater than the current one : ${node2.key} < ${
          node1.key
        }.`
      )
    }
    done()
  })
  it('addRightNode(node) should NOT insert on the right anything <> Node object.', done => {
    const node1 = new Node(957, 'charly')
    try {
      node1.addRightNode()
    } catch (err) {
      expect(err.message).to.equal(`must be a Node object!`)
    }
    done()
  })
  it('addRightNode(node) should insert on the right a new node having a key value greater than the current one.', done => {
    const node1 = new Node(957, 'charly')
    const node2 = new Node(1008, 'delta')
    node1.addRightNode(node2)
    expect(node1.right.key).to.be.gt(node1.key)
    done()
  })
})
