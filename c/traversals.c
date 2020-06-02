#include <stdlib.h>
#include "traversals.h"

void in_order_traversal(Node_ptr head, Displayer displayer)
{
  if (head == NULL)
  {
    return;
  }

  in_order_traversal(head->left, displayer);
  (*displayer)(head->value);
  in_order_traversal(head->right, displayer);
}

void pre_order_traversal(Node_ptr head, Displayer displayer)
{
  if (head == NULL)
  {
    return;
  }

  (*displayer)(head->value);
  pre_order_traversal(head->left, displayer);
  pre_order_traversal(head->right, displayer);
}

void post_order_traversal(Node_ptr head, Displayer displayer)
{
  if (head == NULL)
  {
    return;
  }

  post_order_traversal(head->left, displayer);
  post_order_traversal(head->right, displayer);
  (*displayer)(head->value);
}
