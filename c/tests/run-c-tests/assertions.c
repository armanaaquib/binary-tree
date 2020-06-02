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
