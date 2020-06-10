const assert = require('assert');
const { insert } = require('../src/bst');
const { getBalancedTree, isBalanced, balance } = require('../src/balance');

describe('getBalanceTree()', function () {
  it('should balance if left depth is even and right depth is 0', function () {
    let root = [30, 20, 10].reduce(insert, null);
    root = getBalancedTree(root, root.right);
    const exp_root = [20, 10, 30].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should balance if left depth is odd and right depth is 0', function () {
    let root = [4, 3, 2, 1].reduce(insert, null);
    root = getBalancedTree(root, root.right);
    const exp_root = [2, 1, 3, 4].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should balance all nodes', function () {
    let root = [4, 3, 5, 2, 6, 1, 7].reduce(insert, null);
    root = getBalancedTree(root, root.right);
    const exp_root = [4, 2, 6, 1, 3, 5, 7].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });
});

describe('isBalanced()', function () {
  it('should return true if root has no child', function () {
    const root = [10].reduce(insert, null);
    assert.ok(isBalanced(root));
  });

  it('should return true if both child and sub child has same depth', function () {
    const root = [10, 5, 1, 20, 25].reduce(insert, null);
    assert.ok(isBalanced(root));
  });

  it('should return false if right child has more depth', function () {
    const root = [10, 20, 25].reduce(insert, null);
    assert.ok(!isBalanced(root));
  });

  it('should return false if left child has more depth', function () {
    const root = [10, 5, 2].reduce(insert, null);
    assert.ok(!isBalanced(root));
  });
});

describe('balance()', function () {
  it('should balance if left depth is even and right depth is 0', function () {
    let root = [30, 20, 10].reduce(insert, null);
    root = balance(root);
    const exp_root = [20, 10, 30].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should balance if left depth is odd and right depth is 0', function () {
    let root = [4, 3, 2, 1].reduce(insert, null);
    root = balance(root);
    const exp_root = [2, 1, 4, 3].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should balance all nodes', function () {
    let root = [4, 3, 5, 2, 6, 1, 7].reduce(insert, null);
    root = balance(root);
    const exp_root = [4, 2, 6, 1, 3, 5, 7].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });
});
