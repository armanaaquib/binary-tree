#ifndef __BINARY_TREE_H_
#define __BINARY_TREE_H_

typedef void *Value;

typedef struct node
{
  Value value;
  struct node *left;
  struct node *right;
} Node;

typedef Node *Node_ptr;

typedef int (*Matcher)(Value, Value);

#endif
