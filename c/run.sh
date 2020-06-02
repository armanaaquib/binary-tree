gcc -o main *.c

if [ $? == 0 ]; then
  ./main
  rm main
fi
