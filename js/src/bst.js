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
  while (minValueNode.left) {
    minValueNode = minValueNode.left;
  }

  root.value = minValueNode.value;

  root.right = remove(root.right, minValueNode.value);
  return root;
};

const findDepth = (root) => {
  if (root === null) {
    return 0;
  }

  return 1 + Math.max(findDepth(root.left), findDepth(root.right));
};

const find_balance_factor = (root) =>
  findDepth(root.left) - findDepth(root.right);

module.exports = { insert, search, remove, findDepth, find_balance_factor };
