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
  Node_ptr *p_walk = &root;

  while (*p_walk != NULL)
  {
    if ((*matcher)(value, (*p_walk)->value) < 0)
    {
      p_walk = &((*p_walk)->left);
    }
    else
    {
      p_walk = &((*p_walk)->right);
    }
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

  if ((*current)->left == NULL)
  {
    Node_ptr node_to_free = *current;
    *current = (*current)->right;
    free(node_to_free);
    return root;
  }

  if ((*current)->right == NULL)
  {
    Node_ptr node_to_free = *current;
    *current = (*current)->left;
    free(node_to_free);
    return root;
  }

  Node_ptr *min_val_node = &(*current)->right;

  while ((*min_val_node)->left != NULL)
  {
    min_val_node = &((*min_val_node)->left);
  }

  Node_ptr rn_min_val_node = (*min_val_node)->right;
  (*min_val_node)->left = (*current)->left;
  (*min_val_node)->right = (*current)->right != *min_val_node ? (*current)->right : NULL;
  Node_ptr node_to_remove = *current;
  *current = *min_val_node;
  *min_val_node = rn_min_val_node;
  free(node_to_remove);

  return root;
};
