const { insert } = require('./bst');
const {
  inOrderTraversal,
  preOrderTraversal,
  postOrderTraversal,
} = require('./traversals');

const main = () => {
  const values = [5, 3, 8, 1, 4, 7, 9];
  const binarySearchTree = values.reduce(insert, null);
  console.log(binarySearchTree);

  console.log('In Order:');
  inOrderTraversal(binarySearchTree);

  console.log('Pre Order:');
  preOrderTraversal(binarySearchTree);

  console.log('Post Order:');
  postOrderTraversal(binarySearchTree);
};

main();
