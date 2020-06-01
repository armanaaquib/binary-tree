const assert = require('assert');
const { insert, search } = require('./bst');

describe('search()', function () {
  it('should return null value not in bst', function () {
    const root = [10, 20, 5, 8, 1, 15, 25].reduce(insert, null);
    assert.strictEqual(search(root, -1), null);
  });

  it('should return node value in bst', function () {
    const root = [10, 20, 5, 8, 1, 15, 25].reduce(insert, null);
    assert.strictEqual(search(root, 5).value, 5);
  });
});
