file=$1

rm -f *.o test.out

gcc -o test.out ../$file.c test_$file.c run-c-tests/*.c

if [ $? == 0 ]; then
  ./test.out
else
  echo "compilation or linking failed"
fi

rm -f *.o test.out
