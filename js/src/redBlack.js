const rotateLeft = (root, node) => {
  const rightNode = node.right;
  node.right = rightNode.left;

  if (rightNode.left) {
    rightNode.left.parent = node;
  }

  if (node.parent === null) {
    root = rightNode;
  } else if (node === node.parent.left) {
    node.parent.left = rightNode;
  } else {
    node.parent.right = rightNode;
  }

  rightNode.parent = node.parent;
  rightNode.left = node;
  node.parent = rightNode;

  return root;
};

const rotateRight = (root, node) => {
  const leftNode = node.left;
  node.left = leftNode.right;

  if (leftNode.right) {
    leftNode.right.parent = node;
  }

  if (node.parent === null) {
    root = leftNode;
  } else if (node === node.parent.left) {
    node.parent.left = leftNode;
  } else {
    node.parent.right = leftNode;
  }

  leftNode.parent = node.parent;
  leftNode.right = node;
  node.parent = leftNode;

  return root;
};

const getSibling = (node) => {
  if (node === null) {
    return null;
  }

  if (node === node.parent.left) {
    return node.parent.right;
  }

  if (node === node.parent.right) {
    return node.parent.left;
  }
};

const fixRedBlackTreeViolation = (root, node) => {
  if (node === root) {
    node.color = 'black';
    return node;
  }

  let parent = node.parent;

  if (parent.color === 'black') {
    return root;
  }

  const uncle = getSibling(node.parent);
  const grandParent = parent.parent;

  if (uncle && uncle.color === 'red') {
    parent.color = 'black';
    uncle.color = 'black';
    grandParent.color = 'red';

    return fixRedBlackTreeViolation(root, grandParent);
  }

  if (parent === grandParent.left && node === parent.right) {
    root = rotateLeft(root, parent);
    node = node.left;
  } else if (parent === grandParent.right && node === parent.left) {
    root = rotateRight(root, parent);
    node = node.right;
  }

  parent = node.parent;

  if (node === parent.left) {
    root = rotateRight(root, grandParent);
  } else {
    root = rotateLeft(root, grandParent);
  }

  parent.color = 'black';
  grandParent.color = 'red';

  return root;
};

const insertNode = (root, node) => {
  if (root == null) {
    return node;
  }

  if (node.value < root.value) {
    root.left = insertNode(root.left, node);
    root.left.parent = root;
  } else {
    root.right = insertNode(root.right, node);
    root.right.parent = root;
  }

  return root;
};

const createNode = (value) => {
  return { value, color: 'red', left: null, right: null, parent: null };
};

const insertRedBlack = (root, value) => {
  const node = createNode(value);
  root = insertNode(root, node);
  return fixRedBlackTreeViolation(root, node);
};

module.exports = { insertRedBlack, insertNode };
