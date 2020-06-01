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
