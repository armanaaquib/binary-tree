#include "binary_tree.h"

#ifndef __BST_H_
#define __BST_H_

Node_ptr insert_rec(Node_ptr, Value, Matcher);
Node_ptr insert(Node_ptr, Value, Matcher);
Node_ptr search(Node_ptr, Value, Matcher);

#endif
