const rotateLeft = (root) => {
  if (root === null || root.right === null) {
    return root;
  }

  const rightNode = root.right;

  root.right = rightNode.left;
  rightNode.left = root;

  return rightNode;
};

const rotateRight = (root) => {
  if (root === null || root.left === null) {
    return root;
  }

  const leftNode = root.left;

  root.left = leftNode.right;
  leftNode.right = root;

  return leftNode;
};

const rotate = (root, pivotNode) => {
  if (root === null) {
    return root;
  }

  if (root.right === pivotNode) {
    return rotateLeft(root);
  }

  if (root.left === pivotNode) {
    return rotateRight(root);
  }

  return root;
};

const rotateByValue = (root, value) => {
  let parentParent = null;
  let parent = null;
  let node = root;

  while (node && node.value !== value) {
    parentParent = parent;
    parent = node;
    node = value < node.value ? node.left : node.right;
  }

  if (node == null) {
    return root;
  }

  if (parentParent == null) {
    return rotate(parent, node);
  }

  if (parentParent.left === parent) {
    parentParent.left = rotate(parent, node);
  } else {
    parentParent.right = rotate(parent, node);
  }

  return root;
};

module.exports = { rotateLeft, rotateRight, rotate, rotateByValue };
