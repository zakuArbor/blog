#include <stdlib.h>
#include <stdio.h>

int main() {
  long sum = 0;
  int size = 1ULL<<30;
  int *arr = malloc(sizeof(int)*size);

  for (int i = 0; i < size; i++) {
    sum += arr[i];
  }
  return sum;
}

