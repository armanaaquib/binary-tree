const assert = require('assert');
const {
  insert,
  search,
  remove,
  rotateLeft,
  rotateRight,
  rotate,
  getBalancedTree,
  rotateByValue,
} = require('./bst');

describe('search()', function () {
  it('should return null value not in bst', function () {
    const root = [10, 20, 5, 8, 1, 15, 25].reduce(insert, null);
    assert.strictEqual(search(root, -1), null);
  });

  it('should return node in bst', function () {
    const root = [10, 20, 5, 8, 1, 15, 25].reduce(insert, null);
    assert.strictEqual(search(root, 5).value, 5);
  });
});

describe('remove()', function () {
  it('should not delete node if value not in bst', function () {
    let root = [10, 20, 5, 8, 1, 15, 25].reduce(insert, null);
    root = remove(root, -1);
    const exp_root = [10, 20, 5, 8, 1, 15, 25].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should delete leaf node in bst', function () {
    let root = [10, 20, 5, 8, 1, 15, 25].reduce(insert, null);
    root = remove(root, 8);
    const exp_root = [10, 20, 5, 1, 15, 25].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should delete n - 1 depth node in bst', function () {
    let root = [10, 20, 5, 8, 1, 15, 25].reduce(insert, null);
    root = remove(root, 5);
    const exp_root = [10, 20, 8, 1, 15, 25].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should delete root depth node in bst', function () {
    let root = [10, 20, 5, 8, 1, 15, 25].reduce(insert, null);
    root = remove(root, 10);
    const exp_root = [15, 20, 5, 8, 1, 25].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should delete single child node in bst', function () {
    let root = [10, 20, 5, 8, 1, 25].reduce(insert, null);
    root = remove(root, 20);
    const exp_root = [10, 25, 5, 8, 1].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });
});

describe('rotateLeft()', function () {
  it('should rotate left', function () {
    let root = [10, 20, 5, 15, 25].reduce(insert, null);
    root = rotateLeft(root);
    const exp_root = [20, 10, 25, 5, 15].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should not rotate left if root does not have any right child node', function () {
    let root = [10, 5].reduce(insert, null);
    root = rotateLeft(root);
    const exp_root = [10, 5].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should rotate left if root has leaf node as right child node', function () {
    let root = [10, 5, 20].reduce(insert, null);
    root = rotateLeft(root);
    const exp_root = [20, 10, 5].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });
});

describe('rotateRight()', function () {
  it('should rotate right', function () {
    let root = [10, 20, 5, 1, 8].reduce(insert, null);
    root = rotateRight(root);
    const exp_root = [5, 1, 10, 8, 20].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should not rotate right if root does not have any left child node', function () {
    let root = [10, 20].reduce(insert, null);
    root = rotateRight(root);
    const exp_root = [10, 20].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should rotate right if root has leaf node as left child node', function () {
    let root = [10, 5, 20].reduce(insert, null);
    root = rotateRight(root, 20);
    const exp_root = [5, 10, 20].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });
});

describe('rotate()', function () {
  it('should rotate right', function () {
    let root = [10, 20, 5, 1, 8].reduce(insert, null);
    root = rotate(root, root.left);
    const exp_root = [5, 1, 10, 8, 20].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should rotate left', function () {
    let root = [10, 20, 5, 15, 25].reduce(insert, null);
    root = rotate(root, root.right);
    const exp_root = [20, 10, 25, 5, 15].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });
});

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

describe('rotate()', function () {
  it('should rotate if value is left to root node', function () {
    let root = [10, 20, 5, 1, 8].reduce(insert, null);
    root = rotateByValue(root, 5);
    const exp_root = [5, 1, 10, 8, 20].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should rotate if value is right to root node', function () {
    let root = [10, 20, 5, 15, 25].reduce(insert, null);
    root = rotateByValue(root, 20);
    const exp_root = [20, 10, 25, 5, 15].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should rotate if value is right to sub tree root node', function () {
    let root = [10, 20, 5, 15, 25].reduce(insert, null);
    root = rotateByValue(root, 25);
    const exp_root = [10, 5, 25, 20, 15].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should rotate if value is left to sub tree root node', function () {
    let root = [10, 20, 5, 15, 25].reduce(insert, null);
    root = rotateByValue(root, 15);
    const exp_root = [10, 5, 15, 20, 25].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });
});
