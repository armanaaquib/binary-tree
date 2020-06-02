#include <stdlib.h>
#include "bst.h"

Node_ptr create_node(Value value);

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

Node_ptr insert(Node_ptr head, Value value, Matcher matcher)
{
  Node_ptr *leaf_node_ptr = &head;

  while (*leaf_node_ptr != NULL)
  {
    if ((*matcher)(value, (*leaf_node_ptr)->value) < 0)
    {
      leaf_node_ptr = &((*leaf_node_ptr)->left);
    }
    else
    {
      leaf_node_ptr = &((*leaf_node_ptr)->right);
    }
  }

  *leaf_node_ptr = create_node(value);

  return head;
}
