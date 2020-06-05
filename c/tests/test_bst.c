#include <stdlib.h>
#include "run-c-tests/test.h"
#include "run-c-tests/assertions.h"
#include "../bst.h"

typedef Node_ptr (*Operation)(Node_ptr, Value, Matcher);

int cmp_int(Value, Value);
Node_ptr reduce_ints_to_root(Operation, Node_ptr, Matcher, int *, int);

void test_search(TestReport_ptr);
Test_ptr should_search_if_value_is_not_in_the_bst(Test_ptr);
Test_ptr should_search_if_value_is_in_the_bst(Test_ptr);

void test_remove_node(TestReport_ptr);
Test_ptr should_remove_root(Test_ptr);
Test_ptr should_remove_depth_1_node(Test_ptr);
Test_ptr should_remove_depth_n_1_node(Test_ptr);
Test_ptr should_remove_leaf_node(Test_ptr);
Test_ptr should_remove_root_of_single_node_tree(Test_ptr);
Test_ptr should_remove_single_child_node(Test_ptr);

void test_rotate_left(TestReport_ptr);
Test_ptr should_rotate_left(Test_ptr);
Test_ptr should_rotate_left_if_root_has_leaf_node_as_right_child(Test_ptr);
Test_ptr should_not_rotate_left_if_root_not_have_right_child(Test_ptr);

void test_rotate_right(TestReport_ptr);
Test_ptr should_rotate_right(Test_ptr);
Test_ptr should_rotate_right_if_root_has_leaf_node_as_right_child(Test_ptr);
Test_ptr should_not_rotate_right_if_root_not_have_right_child(Test_ptr);

int cmp_int(Value val_1, Value val_2)
{
  return *(int *)val_1 - *(int *)val_2;
}

Node_ptr reduce_ints_to_root(Operation op, Node_ptr head, Matcher matcher, int *array, int length)
{
  for (int i = 0; i < length; i++)
  {
    Value value = malloc(sizeof(Value));
    *(int *)value = array[i];

    head = (*op)(head, value, matcher);
  }

  return head;
}

Test_ptr should_search_if_value_is_not_in_the_bst(Test_ptr test)
{
  test->name = "should return null if value is not in bst";

  int values[] = {10, 20, 5, 8, 1, 15, 25};
  Node_ptr head = reduce_ints_to_root(insert, NULL, cmp_int, values, 7);

  Value value = malloc(sizeof(Value));
  *(int *)value = -1;

  assert_value_null(search(head, value, cmp_int), test);

  return test;
}

Test_ptr should_search_if_value_is_in_the_bst(Test_ptr test)
{
  test->name = "should return node if value is in bst";

  int values[] = {10, 20, 5, 8, 1, 15, 25};
  Node_ptr head = reduce_ints_to_root(insert, NULL, cmp_int, values, 7);

  Value value = malloc(sizeof(Value));
  *(int *)value = 5;

  assert_value_equal(search(head, value, cmp_int)->value, value, cmp_int, test);

  return test;
}

void test_search(TestReport_ptr test_report)
{
  Test_Func tests[] = {should_search_if_value_is_not_in_the_bst, should_search_if_value_is_in_the_bst};
  run_tests("search()", tests, 2, test_report);
}

Test_ptr should_remove_root(Test_ptr test)
{
  test->name = "should remove root node";

  int values[] = {20, 10, 30, 5, 15, 25, 35, 2, 8, 12, 17, 22, 27, 32, 37};
  Node_ptr root = reduce_ints_to_root(insert, NULL, cmp_int, values, 15);

  Value value = malloc(sizeof(Value));
  *(int *)value = 20;

  int exp_values[] = {22, 10, 30, 5, 15, 25, 35, 2, 8, 12, 17, 27, 32, 37};
  Node_ptr exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values, 14);

  root = remove_node(root, value, cmp_int);
  assert_tree_equal(root, exp_root, cmp_int, test);

  return test;
}

Test_ptr should_remove_depth_1_node(Test_ptr test)
{
  test->name = "should remove depth 1 node";

  int values[] = {20, 10, 30, 5, 15, 25, 35, 2, 8, 12, 17, 22, 27, 32, 37};
  Node_ptr root = reduce_ints_to_root(insert, NULL, cmp_int, values, 15);

  Value value = malloc(sizeof(Value));
  *(int *)value = 10;

  int exp_values[] = {20, 12, 30, 5, 15, 25, 35, 2, 8, 17, 22, 27, 32, 37};
  Node_ptr exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values, 14);

  root = remove_node(root, value, cmp_int);
  assert_tree_equal(root, exp_root, cmp_int, test);

  *(int *)value = 30;

  int exp_values_1[] = {20, 12, 32, 5, 15, 25, 35, 2, 8, 17, 22, 27, 37};
  exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values_1, 13);

  root = remove_node(root, value, cmp_int);
  assert_tree_equal(root, exp_root, cmp_int, test);

  return test;
}

Test_ptr should_remove_depth_n_1_node(Test_ptr test)
{
  test->name = "should remove depth n - 1 node";

  int values[] = {20, 10, 30, 5, 15, 25, 35, 2, 8, 12, 17, 22, 27, 32, 37};
  Node_ptr root = reduce_ints_to_root(insert, NULL, cmp_int, values, 15);

  Value value = malloc(sizeof(Value));
  *(int *)value = 25;

  int exp_values[] = {20, 10, 30, 5, 15, 27, 35, 2, 8, 12, 17, 22, 32, 37};
  Node_ptr exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values, 14);

  root = remove_node(root, value, cmp_int);
  assert_tree_equal(root, exp_root, cmp_int, test);

  *(int *)value = 15;

  int exp_values_1[] = {20, 10, 30, 5, 17, 27, 35, 2, 8, 12, 22, 32, 37};
  exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values_1, 13);

  root = remove_node(root, value, cmp_int);
  assert_tree_equal(root, exp_root, cmp_int, test);

  return test;
}

Test_ptr should_remove_leaf_node(Test_ptr test)
{
  test->name = "should remove leaf node";

  int values[] = {20, 10, 30, 5, 15, 25, 35, 2, 8, 12, 17, 22, 27, 32, 37};
  Node_ptr root = reduce_ints_to_root(insert, NULL, cmp_int, values, 15);

  Value value = malloc(sizeof(Value));
  *(int *)value = 12;

  int exp_values[] = {20, 10, 30, 5, 15, 25, 35, 2, 8, 17, 22, 27, 32, 37};
  Node_ptr exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values, 14);

  root = remove_node(root, value, cmp_int);
  assert_tree_equal(root, exp_root, cmp_int, test);

  *(int *)value = 27;

  int exp_values_1[] = {20, 10, 30, 5, 15, 25, 35, 2, 8, 17, 22, 32, 37};
  exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values_1, 13);

  root = remove_node(root, value, cmp_int);
  assert_tree_equal(root, exp_root, cmp_int, test);

  return test;
}

Test_ptr should_remove_root_of_single_node_tree(Test_ptr test)
{
  test->name = "should remove root node of single node tree";

  int values[] = {20};
  Node_ptr root = reduce_ints_to_root(insert, NULL, cmp_int, values, 1);

  Value value = malloc(sizeof(Value));
  *(int *)value = 20;

  int exp_values[] = {};
  Node_ptr exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values, 0);

  root = remove_node(root, value, cmp_int);
  assert_tree_equal(root, exp_root, cmp_int, test);

  return test;
}

Test_ptr should_remove_single_child_node(Test_ptr test)
{
  test->name = "should remove single child node";

  int values[] = {10, 5, 15, 2, 20, 1, 25};
  Node_ptr root = reduce_ints_to_root(insert, NULL, cmp_int, values, 7);

  Value value = malloc(sizeof(Value));
  *(int *)value = 5;

  int exp_values[] = {10, 2, 15, 20, 1, 25};
  Node_ptr exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values, 6);

  root = remove_node(root, value, cmp_int);
  assert_tree_equal(root, exp_root, cmp_int, test);

  *(int *)value = 15;

  int exp_values_1[] = {10, 2, 20, 1, 25};
  exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values_1, 5);

  root = remove_node(root, value, cmp_int);
  assert_tree_equal(root, exp_root, cmp_int, test);

  return test;
}

void test_remove_node(TestReport_ptr test_report)
{
  Test_Func tests[] = {should_remove_root,
                       should_remove_depth_1_node,
                       should_remove_depth_n_1_node,
                       should_remove_leaf_node,
                       should_remove_root_of_single_node_tree,
                       should_remove_single_child_node};

  run_tests("remove_node()", tests, 6, test_report);
}

Test_ptr should_rotate_left(Test_ptr test)
{
  test->name = "should rotate left";

  int values[] = {10, 20, 5, 15, 25};
  Node_ptr root = reduce_ints_to_root(insert, NULL, cmp_int, values, 5);

  int exp_values[] = {20, 10, 25, 5, 15};
  Node_ptr exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values, 5);

  root = rotate_left(root);
  assert_tree_equal(root, exp_root, cmp_int, test);

  return test;
}

Test_ptr should_rotate_left_if_root_has_leaf_node_as_right_child(Test_ptr test)
{
  test->name = "should rotate left if root has leaf node as right child node";

  int values[] = {10, 5, 20};
  Node_ptr root = reduce_ints_to_root(insert, NULL, cmp_int, values, 3);

  int exp_values[] = {20, 10, 5};
  Node_ptr exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values, 3);

  root = rotate_left(root);
  assert_tree_equal(root, exp_root, cmp_int, test);

  return test;
}

Test_ptr should_not_rotate_left_if_root_not_have_right_child(Test_ptr test)
{
  test->name = "should not rotate left if root does not have any right child node";

  int values[] = {10, 5};
  Node_ptr root = reduce_ints_to_root(insert, NULL, cmp_int, values, 2);

  int exp_values[] = {10, 5};
  Node_ptr exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values, 2);

  root = rotate_left(root);
  assert_tree_equal(root, exp_root, cmp_int, test);

  return test;
}

void test_rotate_left(TestReport_ptr test_report)
{
  Test_Func tests[] = {should_rotate_left,
                       should_rotate_left_if_root_has_leaf_node_as_right_child,
                       should_not_rotate_left_if_root_not_have_right_child};

  run_tests("rotate_left()", tests, 3, test_report);
}

Test_ptr should_rotate_right(Test_ptr test)
{
  test->name = "should rotate right";

  int values[] = {10, 20, 5, 1, 8};
  Node_ptr root = reduce_ints_to_root(insert, NULL, cmp_int, values, 5);

  int exp_values[] = {5, 1, 10, 8, 20};
  Node_ptr exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values, 5);

  root = rotate_right(root);
  assert_tree_equal(root, exp_root, cmp_int, test);

  return test;
}

Test_ptr should_rotate_right_if_root_has_leaf_node_as_right_child(Test_ptr test)
{
  test->name = "should rotate right if root has leaf node as right child node";

  int values[] = {10, 5, 20};
  Node_ptr root = reduce_ints_to_root(insert, NULL, cmp_int, values, 3);

  int exp_values[] = {5, 10, 20};
  Node_ptr exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values, 3);

  root = rotate_right(root);
  assert_tree_equal(root, exp_root, cmp_int, test);

  return test;
}

Test_ptr should_not_rotate_right_if_root_not_have_right_child(Test_ptr test)
{
  test->name = "should not rotate right if root does not have any right child node";

  int values[] = {10, 20};
  Node_ptr root = reduce_ints_to_root(insert, NULL, cmp_int, values, 2);

  int exp_values[] = {10, 20};
  Node_ptr exp_root = reduce_ints_to_root(insert, NULL, cmp_int, exp_values, 2);

  root = rotate_right(root);
  assert_tree_equal(root, exp_root, cmp_int, test);

  return test;
}

void test_rotate_right(TestReport_ptr test_report)
{
  Test_Func tests[] = {should_rotate_right,
                       should_rotate_right_if_root_has_leaf_node_as_right_child,
                       should_not_rotate_right_if_root_not_have_right_child};

  run_tests("rotate_right()", tests, 3, test_report);
}

int main(void)
{
  TestSuite_Func test_suites[] = {test_search, test_remove_node, test_rotate_left, test_rotate_right};
  TestReport_ptr test_report = runt_test_suites(test_suites, 4);
  display_report(test_report);
}
