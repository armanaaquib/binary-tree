const { rotateLeft, rotateRight } = require('./rotations');
const { find_balance_factor } = require('./bst');

const createNode = (value) => {
  return { value, left: null, right: null };
};

const insertAVL = (root, value) => {
  if (root === null) {
    return createNode(value);
  }

  if (value < root.value) {
    root.left = insertAVL(root.left, value);
  } else {
    root.right = insertAVL(root.right, value);
  }

  const balance_factor = find_balance_factor(root);

  if (balance_factor > 1 && value < root.left.value) {
    return rotateRight(root);
  }

  if (balance_factor > 1 && value >= root.left.value) {
    root.left = rotateLeft(root.left);
    return rotateRight(root);
  }

  if (balance_factor < -1 && value >= root.right.value) {
    return rotateLeft(root);
  }

  if (balance_factor < -1 && value < root.right.value) {
    root.right = rotateRight(root.right);
    return rotateLeft(root);
  }

  return root;
};

module.exports = { insertAVL };
