#include <stdlib.h>
#include <stdio.h>
#include <time.h>

int main() {
  long sum = 0;
  int size = 1ULL<<30;
  srand(time(NULL));
  int *arr = malloc(sizeof(int)*size);

  for (int i = 0; i < size; i++) {
    sum += arr[rand() % size];
  }
  return sum;
}

