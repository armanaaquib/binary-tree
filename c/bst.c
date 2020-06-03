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

Node_ptr insert(Node_ptr root, Value value, Matcher matcher)
{
  Node_ptr *ptr_to_p_walk = &root;

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

Node_ptr remove_node(Node_ptr root, Value value, Matcher matcher)
{
  Node_ptr *current = &root;

  while ((*matcher)(value, (*current)->value) != 0)
  {
    if ((*matcher)(value, (*current)->value) < 0)
    {
      current = &((*current)->left);
    }
    else
    {
      current = &((*current)->right);
    }
  }

  Node_ptr *right_min = &(*current)->right;

  if (*right_min)
  {
    while ((*right_min)->left != NULL)
    {
      right_min = &((*right_min)->left);
    }

    (*right_min)->left = (*current)->left;
    (*right_min)->right = (*current)->right != *right_min ? (*current)->right : NULL;
  }

  *current = *right_min;
  *right_min = NULL;

  free(*current);

  return root;
};
