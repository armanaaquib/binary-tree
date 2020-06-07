const assert = require('assert');
const { insert, search, remove } = require('../src/bst');

describe('search()', function () {
  it('should return null value not in bst', function () {
    const root = [10, 20, 5, 8, 1, 15, 25].reduce(insert, null);
    assert.strictEqual(search(root, -1), null);
  });

  it('should return node if value is in left side of bst', function () {
    const root = [10, 20, 5, 8, 1, 15, 25].reduce(insert, null);
    assert.strictEqual(search(root, 5).value, 5);
  });

  it('should return node if value is in right side of bst', function () {
    const root = [10, 20, 5, 8, 1, 15, 25].reduce(insert, null);
    assert.strictEqual(search(root, 25).value, 25);
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

  it('should delete root node in bst', function () {
    let root = [10, 20, 5, 8, 1, 15, 25].reduce(insert, null);
    root = remove(root, 10);
    const exp_root = [15, 20, 5, 8, 1, 25].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should delete node which has only right child', function () {
    let root = [10, 20, 5, 8, 1, 25].reduce(insert, null);
    root = remove(root, 20);
    const exp_root = [10, 25, 5, 8, 1].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should delete node which has only left child', function () {
    let root = [10, 20, 5, 1, 25].reduce(insert, null);
    root = remove(root, 5);
    const exp_root = [10, 20, 1, 25].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });
});
