const inOrderTraverse = (tree) => {
  if (tree == null) {
    return;
  }

  inOrderTraverse(tree.left);
  console.log(tree.value);
  inOrderTraverse(tree.right);
};

const preOrderTraverse = (tree) => {
  if (tree == null) {
    return;
  }

  console.log(tree.value);
  preOrderTraverse(tree.left);
  preOrderTraverse(tree.right);
};

const postOrderTraverse = (tree) => {
  if (tree == null) {
    return;
  }

  postOrderTraverse(tree.left);
  postOrderTraverse(tree.right);
  console.log(tree.value);
};

module.exports = { inOrderTraverse, preOrderTraverse, postOrderTraverse };
