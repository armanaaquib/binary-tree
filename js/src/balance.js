const { rotateByValue } = require('./rotations');

const buildTree = (nodes, start, end) => {
  if (start > end) {
    return null;
  }

  const mid = Math.floor((start + end) / 2);
  const node = nodes[mid];

  node.left = buildTree(nodes, start, mid - 1);
  node.right = buildTree(nodes, mid + 1, end);

  return node;
};

const storeNodes = (node, push_node) => {
  if (node == null) {
    return;
  }

  storeNodes(node.left, push_node);
  push_node(node);
  storeNodes(node.right, push_node);
};

const getBalancedTree = (root) => {
  const bstNodes = [];
  storeNodes(root, bstNodes.push.bind(bstNodes));

  return buildTree(bstNodes, 0, bstNodes.length - 1);
};

const findDepth = (root) => {
  if (root === null) {
    return 0;
  }

  return 1 + Math.max(findDepth(root.left), findDepth(root.right));
};

const find_balance_factor = (root) =>
  findDepth(root.right) - findDepth(root.left);

const isBalanced = (root) => {
  if (root == null) {
    return true;
  }

  const balance_factor = find_balance_factor(root);
  return (
    Math.abs(balance_factor) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
};

const balance = (root) => {
  if (isBalanced(root)) {
    return root;
  }

  const nodes = [];
  storeNodes(root, nodes.push.bind(nodes));

  const mid = Math.floor((nodes.length - 1) / 2);

  const balancedBstRoot = nodes[mid];

  while (root !== balancedBstRoot) {
    root = rotateByValue(root, balancedBstRoot.value);
  }

  root.left = balance(root.left);
  root.right = balance(root.right);

  return root;
};

module.exports = { getBalancedTree, findDepth, isBalanced, balance };
