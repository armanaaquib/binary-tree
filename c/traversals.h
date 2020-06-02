#include "binary_tree.h"

#ifndef __TRAVERSALS_H_
#define __TRAVERSALS_H_

typedef void (*Displayer)(Value);

void in_order_traversal(Node_ptr head, Displayer);
void pre_order_traversal(Node_ptr head, Displayer);
void post_order_traversal(Node_ptr head, Displayer);

#endif
