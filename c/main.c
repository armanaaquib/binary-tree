#include <stdio.h>
#include <stdlib.h>
#include "binary_tree.h"
#include "bst.h"
#include "traversals.h"

typedef Node_ptr (*Operation)(Node_ptr, Value, Matcher);

int cmp_int(Value, Value);
Node_ptr reduce_ints_to_head(Operation, Node_ptr, Matcher, int *, int);
void int_diplayer(Value);

int cmp_int(Value val_1, Value val_2)
{
  return *(int *)val_1 - *(int *)val_2;
}

Node_ptr reduce_ints_to_head(Operation op, Node_ptr head, Matcher matcher, int *array, int length)
{
  for (int i = 0; i < length; i++)
  {
    Value value = malloc(sizeof(Value));
    *(int *)value = array[i];

    head = (*op)(head, value, matcher);
  }

  return head;
}

void int_displayer(Value value)
{
  printf("%d ", *(int *)value);
}

int main(void)
{
  int values[] = {5, 3, 8, 1, 4, 7, 9};

  Node_ptr binary_search_tree = reduce_ints_to_head(insert_rec, NULL, cmp_int, values, 7);

  printf("In Order:\n");
  in_order_traversal(binary_search_tree, int_displayer);

  printf("\nPre Order:\n");
  pre_order_traversal(binary_search_tree, int_displayer);

  printf("\nPost Order:\n");
  post_order_traversal(binary_search_tree, int_displayer);
}
