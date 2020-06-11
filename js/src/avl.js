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

const removeAVL = (root, value) => {
  if (root == null) {
    return root;
  }

  if (value < root.value) {
    root.left = removeAVL(root.left, value);
  } else if (value > root.value) {
    root.right = removeAVL(root.right, value);
  } else {
    if (root.left == null) {
      return root.right;
    }

    if (root.right == null) {
      return root.left;
    }

    let minValueNode = root.right;
    while (minValueNode.left) {
      minValueNode = minValueNode.left;
    }

    root.value = minValueNode.value;
    root.right = removeAVL(root.right, minValueNode.value);
  }

  const balance_factor = find_balance_factor(root);

  if (balance_factor > 1 && find_balance_factor(root.left) >= 0) {
    return rotateRight(root);
  }

  if (balance_factor > 1 && find_balance_factor(root.left) < 0) {
    root.left = rotateLeft(root.left);
    return rotateRight(root);
  }

  if (balance_factor < -1 && find_balance_factor(root.right) <= 0) {
    return rotateLeft(root);
  }

  if (balance_factor < -1 && find_balance_factor(root.right) > 0) {
    root.right = rotateRight(root.right);
    return rotateLeft(root);
  }

  return root;
};

module.exports = { insertAVL, removeAVL };
