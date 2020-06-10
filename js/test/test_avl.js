const assert = require('assert');
const { insertAVL } = require('../src/avl');
const { insert } = require('..//src/bst');

describe('insertAVL()', function () {
  it('should insert in empty tree', function () {
    const root = insertAVL(null, 10);
    const exp_root = [10].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should insert in single node tree', function () {
    let root = [10].reduce(insert, null);
    root = insertAVL(root, 20);
    const exp_root = [10, 20].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should insert and balance for left left', function () {
    let root = [10, 5].reduce(insert, null);
    root = insertAVL(root, 2);
    const exp_root = [5, 2, 10].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should insert and balance for right right', function () {
    let root = [10, 15].reduce(insert, null);
    root = insertAVL(root, 20);
    const exp_root = [15, 10, 20].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should insert and balance for left right', function () {
    let root = [10, 5].reduce(insert, null);
    root = insertAVL(root, 8);
    const exp_root = [8, 5, 10].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should insert and balance for right left', function () {
    let root = [10, 15].reduce(insert, null);
    root = insertAVL(root, 12);
    const exp_root = [12, 10, 15].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });

  it('should insert ascending order number with balancing', function () {
    let root = [10, 20, 30, 40, 50].reduce(insertAVL, null);
    root = insertAVL(root, 25);
    const exp_root = [30, 20, 40, 10, 25, 50].reduce(insert, null);
    assert.deepStrictEqual(root, exp_root);
  });
});
