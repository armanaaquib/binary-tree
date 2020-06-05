const createNode = (value) => {
  return { value, left: null, right: null };
};

const insert = (tree, value) => {
  if (tree == null) {
    return createNode(value);
  }

  if (value < tree.value) {
    tree.left = insert(tree.left, value);
  } else {
    tree.right = insert(tree.right, value);
  }

  return tree;
};

const search = (root, searchKey) => {
  if (root === null || root.value === searchKey) {
    return root;
  }

  if (searchKey < root.value) {
    return search(root.left, searchKey);
  }

  return search(root.right, searchKey);
};

const remove = (root, value) => {
  if (root == null) {
    return root;
  }

  if (value < root.value) {
    root.left = remove(root.left, value);
    return root;
  }

  if (value > root.value) {
    root.right = remove(root.right, value);
    return root;
  }

  if (root.left == null) {
    return root.right;
  }

  if (root.right == null) {
    return root.left;
  }

  let minValueNode = root.right;
  while (minValueNode.left != null) {
    minValueNode = minValueNode.left;
  }

  root.value = minValueNode.value;

  root.right = remove(root.right, minValueNode.value);
  return root;
};

const rotateLeft = (root) => {
  if (root == null || root.right == null) {
    return root;
  }

  const rightNode = root.right;

  root.right = rightNode.left;
  rightNode.left = root;

  return rightNode;
};

const rotateRight = (root) => {
  if (root == null || root.left == null) {
    return root;
  }

  const leftNode = root.left;

  root.left = leftNode.right;
  leftNode.right = root;

  return leftNode;
};

const rotate = (root, pivotNode) => {
  if (root.right == pivotNode) {
    return rotateLeft(root);
  }

  if (root.left == pivotNode) {
    return rotateRight(root);
  }

  return root;
};

module.exports = { insert, search, remove, rotateLeft, rotateRight, rotate };
