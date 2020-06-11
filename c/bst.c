#include <stdlib.h>
#include <math.h>
#include "bst.h"

Node_ptr create_node(Value value);
int store_values(Node_ptr node, Value values[], int);
Node_ptr build_tree(Node_ptr, Value[], int, int);
int compare_int(Value, Value);
int max_int(int, int);

Node_ptr create_node(Value value)
{
  Node_ptr node = malloc(sizeof(Node));

  node->value = value;
  node->left = NULL;
  node->right = NULL;

  return node;
}

Node_ptr insert_rec(Node_ptr node, Value value, Matcher matcher)
{
  if (node == NULL)
  {
    return create_node(value);
  }

  if ((*matcher)(value, node->value) < 0)
  {
    node->left = insert_rec(node->left, value, matcher);
  }
  else
  {
    node->right = insert_rec(node->right, value, matcher);
  }

  return node;
}

Node_ptr insert(Node_ptr root, Value value, Matcher matcher)
{
  Node_ptr *p_walk = &root;

  while (*p_walk != NULL)
  {
    p_walk = (*matcher)(value, (*p_walk)->value) < 0
                 ? &(*p_walk)->left
                 : &(*p_walk)->right;
  }

  *p_walk = create_node(value);

  return root;
}

Node_ptr search(Node_ptr head, Value searchValue, Matcher matcher)
{
  Node_ptr p_walk = head;

  while (p_walk != NULL)
  {
    if ((*matcher)(searchValue, p_walk->value) == 0)
    {
      return p_walk;
    }

    p_walk = (*matcher)(searchValue, p_walk->value) < 0
                 ? p_walk->left
                 : p_walk->right;
  }

  return p_walk;
}

Node_ptr remove_node(Node_ptr root, Value value, Matcher matcher)
{
  Node_ptr *current = &root;

  while (*current && (*matcher)(value, (*current)->value) != 0)
  {
    current = (*matcher)(value, (*current)->value) < 0
                  ? &(*current)->left
                  : &(*current)->right;
  }

  if (*current == NULL)
  {
    return root;
  }

  Node_ptr node_to_free = *current;

  if ((*current)->left == NULL)
  {
    *current = (*current)->right;
    free(node_to_free);
    return root;
  }

  if ((*current)->right == NULL)
  {
    *current = (*current)->left;
    free(node_to_free);
    return root;
  }

  Node_ptr *min_val_node = &(*current)->right;

  while ((*min_val_node)->left != NULL)
  {
    min_val_node = &((*min_val_node)->left);
  }

  (*current)->value = (*min_val_node)->value;
  node_to_free = *min_val_node;
  *min_val_node = (*min_val_node)->right;

  free(node_to_free);

  return root;
}

Node_ptr rotate_left(Node_ptr root)
{
  if (!root || !root->right)
  {
    return root;
  }

  Node_ptr right_node = root->right;

  root->right = right_node->left;
  right_node->left = root;

  return right_node;
}

Node_ptr rotate_right(Node_ptr root)
{
  if (!root || !root->left)
  {
    return root;
  }

  Node_ptr left_node = root->left;

  root->left = left_node->right;
  left_node->right = root;

  return left_node;
}

Node_ptr rotate(Node_ptr root, Node_ptr pivot_node)
{
  if (!root)
  {
    return root;
  }

  if (root->right == pivot_node)
  {
    return rotate_left(root);
  }

  if (root->left == pivot_node)
  {
    return rotate_right(root);
  }

  return root;
}

Node_ptr rotate_by_value(Node_ptr root, Value value, Matcher matcher)
{
  Node_ptr *parent = NULL;
  Node_ptr *node = &root;

  while (*node && (*matcher)(value, (*node)->value) != 0)
  {
    parent = &(*node);
    node = (*matcher)(value, (*node)->value) < 0
               ? &(*node)->left
               : &(*node)->right;
  }

  if (*node == NULL)
  {
    return root;
  }

  if (*parent)
  {
    *parent = rotate(*parent, *node);
  }

  return root;
}

int compare_int(Value val_1, Value val_2)
{
  return *(int *)val_1 - *(int *)val_2;
}

Node_ptr build_tree(Node_ptr node, Value values[], int start, int end)
{
  if (start > end)
  {
    return node;
  }

  int mid = (start + end) / 2;
  Value value = values[mid];

  node = insert(node, value, compare_int);

  node = build_tree(node, values, start, mid - 1);
  node = build_tree(node, values, mid + 1, end);

  return node;
}

int store_values(Node_ptr node, Value values[], int i)
{
  if (!node)
  {
    return i;
  }

  i = store_values(node->left, values, i);
  values[i++] = node->value;
  i = store_values(node->right, values, i);

  return i;
}

int max_int(int int_1, int int_2)
{
  return int_1 > int_2 ? int_1 : int_2;
}

int find_depth(Node_ptr root)
{
  if (root == NULL)
  {
    return 0;
  }

  return 1 + max_int(find_depth(root->left), find_depth(root->right));
}

Node_ptr get_balanced_tree(Node_ptr root)
{
  int no_of_values = pow(2, find_depth(root) - 1);
  Value values[no_of_values];
  no_of_values = store_values(root, values, 0);

  return build_tree(NULL, values, 0, no_of_values - 1);
}
