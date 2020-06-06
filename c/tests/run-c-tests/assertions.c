#include <stdio.h>
#include "assertions.h"

void assert_value_equal(Value actual, Value expected, Matcher matcher, Test_ptr test)
{
  if (test->status == False)
    return;

  if (!((*matcher)(actual, expected) == 0))
  {
    test->status = False;
    sprintf(test->error, "Values are not equal\n");
    printf("%d %d", *(Int_ptr)actual, *(Int_ptr)expected);
  }
}

void assert_value_null(Value el, Test_ptr test)
{
  if (test->status == False)
    return;

  if (el != NULL)
  {
    test->status = False;
    sprintf(test->error, "Value is not null\n");
  }
}

void assert_tree_equal(Node_ptr head_1, Node_ptr head_2, Matcher matcher, Test_ptr test)
{
  if (test->status == False || (!head_1 && !head_2))
    return;

  if ((!head_1 && head_2) || (head_1 && !head_2))
  {
    test->status = False;
    sprintf(test->error, "size is not equal\n");
  }

  if ((*matcher)(head_1->value, head_2->value) != 0)
  {
    test->status = False;
    sprintf(test->error, "value is not equal\n");
  }

  assert_tree_equal(head_1->left, head_2->left, matcher, test);
  assert_tree_equal(head_1->right, head_2->right, matcher, test);
}

void assert_int_equal(int actual, int expected, Test_ptr test)
{
  if (test->status == False)
    return;

  if (!(actual == expected))
  {
    test->status = False;
    sprintf(test->error, "Expected %d Actual %d\n", expected, actual);
  }
}
