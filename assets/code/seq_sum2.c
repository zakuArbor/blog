#include <stdlib.h>
#include <stdio.h>
#include <time.h>

int main() {
  long sum = 0;
  int size = 1ULL<<20;
  int *arr = malloc(sizeof(int)*size);
  srand(time(NULL));

  for (int i = 0; i < size; i++) {
    sum += arr[i] + rand() % size;
  }
  return sum;
}

