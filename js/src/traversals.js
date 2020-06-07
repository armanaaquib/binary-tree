const inOrderTraversal = (tree) => {
  if (tree == null) {
    return;
  }

  inOrderTraversal(tree.left);
  console.log(tree.value);
  inOrderTraversal(tree.right);
};

const preOrderTraversal = (tree) => {
  if (tree == null) {
    return;
  }

  console.log(tree.value);
  preOrderTraversal(tree.left);
  preOrderTraversal(tree.right);
};

const postOrderTraversal = (tree) => {
  if (tree == null) {
    return;
  }

  postOrderTraversal(tree.left);
  postOrderTraversal(tree.right);
  console.log(tree.value);
};

module.exports = { inOrderTraversal, preOrderTraversal, postOrderTraversal };
