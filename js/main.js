const { insert, remove } = require('./bst');
const {
  inOrderTraversal,
  preOrderTraversal,
  postOrderTraversal,
} = require('./traversals');

const main = () => {
  // const values = [5, 3, 8, 1, 4, 7, 9];
  // const binarySearchTree = values.reduce(insert, null);

  // console.log('In Order:');
  // inOrderTraversal(binarySearchTree);

  // console.log('Pre Order:');
  // preOrderTraversal(binarySearchTree);

  // console.log('Post Order:');
  // postOrderTraversal(binarySearchTree);

  const values = [15, 20, 25];
  let bst = values.reduce(insert, null);
  console.log(bst);
  bst = remove(bst, 15);
  console.log(bst);

  const x = { a: 1, b: 2 };
  const y = { a: 1, b: 2 };

  x, y;

  x; //?
};
main();
const x = { a: 2 };
x++;
x;
