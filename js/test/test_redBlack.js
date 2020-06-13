const assert = require('assert');
const { insertNode, insertRedBlack } = require('../src/redBlack');

const createRedNode = (value) => {
  return { value, color: 'red', left: null, right: null, parent: null };
};

const createBlackNode = (value) => {
  return { value, color: 'black', left: null, right: null, parent: null };
};

describe('insertRedBlack', function () {
  it('should insert in empty bst', function () {
    const root = insertRedBlack(null, 10);
    const exp_root = [createBlackNode(10)].reduce(insertNode, null);

    assert.deepStrictEqual(root, exp_root);
  });

  it('should insert and balance if parent is black', function () {
    let root = [10].reduce(insertRedBlack, null);
    root = insertRedBlack(root, 20);

    const nodes = [createBlackNode(10), createRedNode(20)];
    const exp_root = nodes.reduce(insertNode, null);

    assert.deepStrictEqual(root, exp_root);
  });

  it('should insert and balance if parent and uncle both are red', function () {
    let root = [15, 10, 20].reduce(insertRedBlack, null);
    root = insertRedBlack(root, 5);

    const nodes = [
      createBlackNode(15),
      createBlackNode(10),
      createBlackNode(20),
      createRedNode(5),
    ];
    const exp_root = nodes.reduce(insertNode, null);

    assert.deepStrictEqual(root, exp_root);
  });

  it('should insert and balance for left right if uncle is black', function () {
    let root = [15, 10].reduce(insertRedBlack, null);
    root = insertNode(root, createBlackNode(20));
    root = insertRedBlack(root, 12);

    const nodes = [
      createBlackNode(12),
      createRedNode(10),
      createRedNode(15),
      createBlackNode(20),
    ];
    const exp_root = nodes.reduce(insertNode, null);

    assert.deepStrictEqual(root, exp_root);
  });

  it('should insert and balance for right left if uncle is black', function () {
    let root = [15, 20].reduce(insertRedBlack, null);
    root = insertNode(root, createBlackNode(10));
    root = insertRedBlack(root, 18);

    const nodes = [
      createBlackNode(18),
      createRedNode(15),
      createRedNode(20),
      createBlackNode(10),
    ];
    const exp_root = nodes.reduce(insertNode, null);

    assert.deepStrictEqual(root, exp_root);
  });
});
