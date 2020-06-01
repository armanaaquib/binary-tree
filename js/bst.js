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

module.exports = { insert, search };
