`use strict`

const chai = require('chai')
const expect = chai.expect
const BST = require('../lib/binary_search_tree.js')

describe('Binary search tree', () => {
  it('add(119) should insert a node root in the binary search tree having a key equal to 119', (done) => {
    const bst = new BST()
    bst.add(119)
    expect(bst.root.key).to.be.equal(119)
    expect(bst.root.left).to.be.equal(null)
    expect(bst.root.right).to.be.equal(null)
    expect(bst.root.bidders).to.be.eql(['*reservePrice'])
    done()
  })
  it('add(567) should NOT insert a second node without bidderName', (done) => {
    const bst = new BST()
    bst.add(119)
    try{
      bst.add(567)
    } catch(err) {
      expect(err.message).to.be.equal('Reserve price must be set once!')
    }
    done()
  })
  it('add(99) should insert a node on the left root in the binary search tree because 99 < 109', (done) => {
    const bst = new BST()
    bst.add(119)
    bst.add(99, 'alpha')
    expect(bst.root.left.key).to.be.equal(99)
    expect(bst.root.left.bidders).to.be.eql(['alpha'])
    expect(bst.root.right).to.be.equal(null)
    done()
  })
  it('add(147) should insert a node on the right root in the binary search tree because 147 > 109', (done) => {
    const bst = new BST()
    bst.add(119)
    bst.add(147, 'beta')
    expect(bst.root.right.key).to.be.equal(147)
    expect(bst.root.right.bidders).to.be.eql(['beta'])
    expect(bst.root.left).to.be.equal(null)
    done()
  })
  it('search() should return the researched node if the key is found', (done) => {
    const bst = new BST()
    bst.add(27)
    bst.add(14, 'alfa')
    bst.add(10, 'bravo')
    bst.add(19, 'charly')
    bst.add(35, 'delta')
    bst.add(31, 'echo')
    bst.add(42, 'foxtrot')
    const foundNode = bst.search(10)
    expect(foundNode.key).to.be.equal(10)
    expect(foundNode.bidders).to.be.eql(['bravo'])
    done()
  })
  it('search() should NOT return the researched node if the key is not found', (done) => {
    const bst = new BST()
    bst.add(27)
    bst.add(14, 'alfa')
    bst.add(10, 'bravo')
    bst.add(19, 'charly')
    bst.add(35, 'delta')
    bst.add(31, 'echo')
    bst.add(42, 'foxtrot')
    expect(bst.search(999)).to.be.equal(false)
    done()
  })
  it('search() should NOT return the researched node if the bst is empty', (done) => {
    try {
     const bst = new BST()
     bst.search(999)
    }catch (err) {
      expect(err.message).to.be.equal('BST is empty!')
    }
    done()
  })
  it('getMax() should return the maximum node of the BST', (done) => {
    const bst = new BST()
    bst.add(27)
    bst.add(14, 'alfa')
    bst.add(10, 'bravo')
    bst.add(19, 'charly')
    bst.add(35, 'delta')
    bst.add(31, 'echo')
    bst.add(42, 'foxtrot')
    expect(bst.getMax()).to.be.equal(42)
    done()
  })
  it('check if BST is a BST should return true(will be useful when rotations will be apply RB Tree or AVL Tree)', (done) => {
    const bst = new BST()
    bst.add(27)
    bst.add(14, 'alfa')
    bst.add(10, 'bravo')
    bst.add(19, 'charly')
    bst.add(35, 'delta')
    bst.add(31, 'echo')
    bst.add(42, 'foxtrot')
    expect(bst.isBST()).to.be.equal(true)
    done()
  })
})
