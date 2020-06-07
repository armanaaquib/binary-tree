const assert = require('assert');
const { insert } = require('../src/bst');
const {
  rotateLeft,
  rotateRight,
  rotate,
  rotateByValue,
} = require('../src/rotations');

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
  it('should not rotate if root is null', function () {
    let root = [].reduce(insert, null);
    root = rotate(root, null);
    const exp_root = [].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should not rotate if given node is neither right nor left child', function () {
    let root = [10, 20, 5, 1, 8].reduce(insert, null);
    root = rotate(root, root.left.left);
    const exp_root = [10, 20, 5, 1, 8].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

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

describe('rotateByValue()', function () {
  it('should not rotate if value is is not is the bst', function () {
    let root = [10, 20, 5, 1, 8].reduce(insert, null);
    root = rotateByValue(root, 25);
    const exp_root = [10, 20, 5, 1, 8].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

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
