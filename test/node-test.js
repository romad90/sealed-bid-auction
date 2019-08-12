`use strict`

const chai = require('chai')
const expect = chai.expect
const Node = require('../lib/node.js')

describe('Node', () => {
  it('add(12.5, charly) should NOT insert a node in the binary search tree because, the key must be an integer.', (done) => {
    try {
      const node = new Node(12.5, 'charly')
    } catch(err) {
      expect(err.message).to.equal('must be an integer!')
    }
    done()
  })
  it('add(667, ) should NOT insert a node in the binary search tree because, the bidderName cannot be null..', (done) => {
    try{
      const node = new Node(667, '')
    }catch(err) {
      expect(err.message).to.equal('bidderName cannot be null!')
    }
    done()
  })
  it('add(957, charly) should insert a node in the binary search tree having a key equal to 957, and the bidders property should have charly inserted in the array.', (done) => {
    const node = new Node(957, 'charly')
    expect(node.key).to.equal(957)
    expect(node.bidders).to.eql(['charly'])
    expect(node.left).to.equal(null)
    expect(node.right).to.equal(null)
    done()
  })
  it('addBidder() should NOT insert a new bidder in the bidders property, because bidderName cannot be null.', (done) => {
    try {
      const node = new Node(957, 'charly')
      node.addBidder()
    } catch (err) {
      expect(err.message).to.equal('bidderName cannot be null!')
    }
    done()
  })
  it('addBidder(bravo) should insert a new bidder in the bidders property.', (done) => {
    const node = new Node(957, 'charly')
    node.addBidder('bravo')
    expect(node.bidders).to.eql(['charly', 'bravo'])
    done()
  })
  it('addLeftNode(node) should NOT insert on the left a new node having a key value greater than the current one.', (done) => {
    const node1 = new Node(957, 'charly')
    const node2 = new Node(958, 'delta')
   try {
     node1.addLeftNode(node2)
    } catch (err) {
      expect(err.message).to.equal(`New node value must be lesser than the current one : ${node2.key} > ${node1.key}.`) 
    } 
    done()
  })
  it('addLeftNode(node) should NOT insert on the left anything <> Node object.', (done) => {
    const node1 = new Node(957, 'charly')
   try {
     node1.addLeftNode()
    } catch (err) {
      expect(err.message).to.equal(`must be a Node object!`) 
    } 
    done()
  })
  it('addLeftNode(node) should insert on the left a new node having a key value lesser than the current one.', (done) => {
    const node1 = new Node(957, 'charly')
    const node2 = new Node(858, 'delta')
    node1.addLeftNode(node2)
    expect(node1.left.key).to.be.lt(node1.key)
    done()
  })
  it('addRightNode(node) should NOT insert on the right a new node having a key value lesser than the current one.', (done) => {
    const node1 = new Node(957, 'charly')
    const node2 = new Node(956, 'delta')
   try {
     node1.addRightNode(node2)
    } catch (err) {
      expect(err.message).to.equal(`New node value must be greater than the current one : ${node2.key} < ${node1.key}.`) 
    } 
    done()
  })
  it('addRightNode(node) should NOT insert on the right anything <> Node object.', (done) => {
    const node1 = new Node(957, 'charly')
   try {
     node1.addRightNode()
    } catch (err) {
      expect(err.message).to.equal(`must be a Node object!`) 
    } 
    done()
  })
  it('addRightNode(node) should insert on the right a new node having a key value greater than the current one.', (done) => {
    const node1 = new Node(957, 'charly')
    const node2 = new Node(1008, 'delta')
    node1.addRightNode(node2)
    expect(node1.right.key).to.be.gt(node1.key)
    done()
  })
})
