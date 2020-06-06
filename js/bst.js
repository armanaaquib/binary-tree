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
  if (root == null) {
    return 0;
  }

  return 1 + Math.max(findDepth(root.left), findDepth(root.right));
};

module.exports = {
  insert,
  search,
  remove,
  rotateLeft,
  rotateRight,
  rotate,
  getBalancedTree,
  rotateByValue,
  findDepth,
};
