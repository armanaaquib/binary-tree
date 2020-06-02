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
  Node_ptr *ptr_to_p_walk = &head;

  while (*ptr_to_p_walk != NULL)
  {
    if ((*matcher)(value, (*ptr_to_p_walk)->value) < 0)
    {
      ptr_to_p_walk = &((*ptr_to_p_walk)->left);
    }
    else
    {
      ptr_to_p_walk = &((*ptr_to_p_walk)->right);
    }
  }

  *ptr_to_p_walk = create_node(value);

  return head;
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

    if ((*matcher)(searchValue, p_walk->value) < 0)
    {
      p_walk = p_walk->left;
    }
    else
    {
      p_walk = p_walk->right;
    }
  }

  return p_walk;
}
