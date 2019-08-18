;`use strict`

const chai = require('chai')
const expect = chai.expect
const AVLTree = require('../lib/avl_tree.js')

describe('AVLTree', () => {
  it('constructor(), bst reservePrice property must be null', done => {
    const bst = new AVLTree()
    expect(bst.reservePrice).to.be.equal(null)
    done()
  })
  it('constructor(), bst reservePrice property must be greater than 0', done => {
    const bst = new AVLTree()
    try {
      bst.insert(0)
    } catch (err) {
      expect(err.message).to.equal('reservePrice property must be greater than 0!')
    }
    done()
  })
  it('constructor(), bst root property must equal null', done => {
    const bst = new AVLTree()
    expect(bst.root).to.be.equal(null)
    done()
  })
  it('insert(119), bst reservePrice property must equal the first key inserted', done => {
    const bst = new AVLTree()
    bst.insert(119)
    expect(bst.reservePrice).to.be.equal(119)
    done()
  })
  it('insert(119), should insert a treeNode root in the BST having a key equal to 119', done => {
    const bst = new AVLTree()
    bst.insert(119)
    expect(bst.root.key).to.be.equal(119)
    done()
  })
  it('insert(119) should insert a treeNode root in the BST having an height equal to 1', done => {
    const bst = new AVLTree()
    bst.insert(119)
    expect(bst.root.height).to.be.equal(1)
    done()
  })
  it('insert(119) should insert a treeNode root in the BST having a left property equal to null', done => {
    const bst = new AVLTree()
    bst.insert(119)
    expect(bst.root.left).to.be.equal(null)
    done()
  })
  it('insert(119) should insert a treeNode root in the BST having a right property equal to null', done => {
    const bst = new AVLTree()
    bst.insert(119)
    expect(bst.root.right).to.be.equal(null)
    done()
  })
  it(`insert(119) should affect 119 as the reservePrice BST property`, done => {
    const bst = new AVLTree()
    bst.insert(119)
    expect(bst.reservePrice).to.be.eql(119)
    done()
  })
  it('insert(119, bravo) should add bravo in the bidders root property.', done => {
    const bst = new AVLTree()
    bst.insert(119)
    bst.insert(119, 'bravo')
    expect(bst.root.bidders).to.be.eql(['bravo'])
    done()
  })
  it('insert(567) should NOT insert a second treeNode without bidderName', done => {
    const bst = new AVLTree()
    bst.insert(119)
    try {
      bst.insert(567)
    } catch (err) {
      expect(err.message).to.be.equal('Reserve price must be set once!')
    }
    done()
  })
  it('insert(99) should insert a treeNode on the left of the BST because 99 < 109', done => {
    const bst = new AVLTree()
    bst.insert(119)
    bst.insert(99, 'alfa')
    expect(bst.root.left.key).to.not.be.equal(null)
    done()
  })
  it('insert(99), should keep root right property equal to null', done => {
    const bst = new AVLTree()
    bst.insert(119)
    bst.insert(99, 'alfa')
    expect(bst.root.right).to.equal(null)
    done()
  })
  it('insert(99) should increment height root property to 2', done => {
    const bst = new AVLTree()
    bst.insert(119)
    bst.insert(99, 'alfa')
    expect(bst.root.height).to.be.equal(2)
    done()
  })
  it('insert(147) should insert a node on the right root in the BST because 147 > 109', done => {
    const bst = new AVLTree()
    bst.insert(119)
    bst.insert(147, 'beta')
    expect(bst.root.right.key).to.not.be.equal(null)
    done()
  })
  it('insert(147) should keep root left property equal to null', done => {
    const bst = new AVLTree()
    bst.insert(119)
    bst.insert(147, 'beta')
    expect(bst.root.left).to.equal(null)
    done()
  })
  it('insert(147) should increment height root property to 2', done => {
    const bst = new AVLTree()
    bst.insert(119)
    bst.insert(147, 'beta')
    expect(bst.root.height).to.be.equal(2)
    done()
  })
  it('check if the current BST respect all properties of a balanced BST.', done => {
    const bst = new AVLTree()
    bst.insert(27)
    bst.insert(14, 'alfa')
    bst.insert(10, 'bravo')
    bst.insert(19, 'charly')
    bst.insert(35, 'delta')
    bst.insert(31, 'echo')
    bst.insert(42, 'foxtrot')
    expect(bst.isBSTBalanced()).to.be.equal(true)
    done()
  })
  it('check if the current BST respect all properties of a BST.', done => {
    const bst = new AVLTree()
    bst.insert(27)
    bst.insert(14, 'alfa')
    bst.insert(10, 'bravo')
    bst.insert(19, 'charly')
    bst.insert(35, 'delta')
    bst.insert(31, 'echo')
    bst.insert(42, 'foxtrot')
    expect(bst.isBST()).to.be.equal(true)
    done()
  })
  it('getTotalHeight(), should return the height of the current BST.', done => {
    const bst = new AVLTree()
    bst.insert(15)
    bst.insert(10, 'alfa')
    bst.insert(20, 'bravo')
    bst.insert(8, 'charly')
    bst.insert(12, 'delta')
    bst.insert(16, 'echo')
    bst.insert(25, 'foxtrot')
    expect(bst.getTotalHeight()).to.be.equal(3)
    done()
  })
  it('getBalance(node), should return 0 the difference in the current BST between the height left and right ', done => {
    const bst = new AVLTree()
    bst.insert(15)
    bst.insert(10, 'alfa')
    bst.insert(20, 'bravo')
    bst.insert(8, 'charly')
    bst.insert(12, 'delta')
    bst.insert(16, 'echo')
    bst.insert(25, 'foxtrot')
    expect(bst.getBalance(bst.root)).to.be.equal(0)
    done()
  })
  it('getBalance(node), should return 1 the difference in the current BST between the height left > right ', done => {
    const bst = new AVLTree()
    bst.insert(15)
    bst.insert(10, 'alfa')
    bst.insert(20, 'bravo')
    bst.insert(8, 'charly')
    bst.insert(12, 'delta')
    expect(bst.getBalance(bst.root)).to.be.equal(1)
    done()
  })
  it('getBalance(node), should return -1 the difference in the current BST between the height left < right ', done => {
    const bst = new AVLTree()
    bst.insert(15)
    bst.insert(10, 'alfa')
    bst.insert(20, 'bravo')
    bst.insert(16, 'echo')
    bst.insert(25, 'foxtrot')
    expect(bst.getBalance(bst.root)).to.be.equal(-1)
    done()
  })
  it('preOrder(), should return an array with values in preOrder pattern => key, left, right', done => {
    const bst = new AVLTree()
    bst.insert(15)
    bst.insert(10, 'alfa')
    bst.insert(20, 'bravo')
    bst.insert(16, 'echo')
    bst.insert(25, 'foxtrot')
    expect(bst.preOrder()).to.be.eql([15, 10, 20, 16, 25])
    done()
  })
  it('getMaxTreeNode(), should return the max tree node without any conditions.', done => {
    const bst = new AVLTree()
    bst.insert(15)
    bst.insert(9, 'alfa')
    bst.insert(2, 'foxtrot')
    bst.insert(5, 'bravo')
    bst.insert(13, 'echo')
    bst.insert(14, 'foxtrot')
    const maxTreeNode = bst.getMaxTreeNode(bst.root)
    expect(maxTreeNode.key).to.be.eql(15)
    done()
  })
})
