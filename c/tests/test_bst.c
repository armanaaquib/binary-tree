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

  return test;
}

void test_remove_node(TestReport_ptr test_report)
{
  Test_Func tests[] = {should_remove_root,
                       should_remove_depth_1_node,
                       should_remove_depth_n_1_node,
                       should_remove_leaf_node};

  run_tests("remove_node()", tests, 4, test_report);
}

int main(void)
{
  TestSuite_Func test_suites[] = {test_search, test_remove_node};
  TestReport_ptr test_report = runt_test_suites(test_suites, 2);
  display_report(test_report);
}
