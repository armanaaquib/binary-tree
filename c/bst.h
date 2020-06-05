#include "binary_tree.h"

#ifndef __BST_H_
#define __BST_H_

Node_ptr insert_rec(Node_ptr, Value, Matcher);
Node_ptr insert(Node_ptr, Value, Matcher);
Node_ptr search(Node_ptr, Value, Matcher);
Node_ptr remove_node(Node_ptr, Value, Matcher);
Node_ptr rotate_left(Node_ptr);
Node_ptr rotate_right(Node_ptr);
Node_ptr rotate(Node_ptr, Node_ptr);
Node_ptr get_balanced_tree(Node_ptr);

#endif
