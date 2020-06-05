const assert = require('assert');
const { insert, search, remove, rotateLeft } = require('./bst');

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

describe('search()', function () {
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
    root = rotateLeft(root, 20);
    const exp_root = [20, 10, 25, 5, 15].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should not rotate left if root does not have any right child node', function () {
    let root = [10, 5].reduce(insert, null);
    root = rotateLeft(root, 20);
    const exp_root = [10, 5].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should rotate left if root has leaf node as right child node', function () {
    let root = [10, 5, 20].reduce(insert, null);
    root = rotateLeft(root, 20);
    const exp_root = [20, 10, 5].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });
});
