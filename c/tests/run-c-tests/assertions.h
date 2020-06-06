#include "test.h"
#include "../../binary_tree.h"

#ifndef __ASSERTIONS_H_
#define __ASSERTIONS_H_

typedef int *Int_ptr;

void assert_value_equal(Value, Value, Matcher, Test_ptr);
void assert_value_null(Value, Test_ptr);
void assert_tree_equal(Node_ptr, Node_ptr, Matcher, Test_ptr);
void assert_int_equal(int, int, Test_ptr);

#endif
