#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Person {
  int age;
  char name[16];
};

int main() {
  printf("size of struct Person: %ld\n", sizeof(struct Person));
  printf("size of int: %ld\n", sizeof(int));
  printf("size of char[16]: %ld\n", sizeof(char)*16); 
  struct Person human = { 21, "John Smith" };
  int age = 0;
  memcpy(&age, &human, sizeof(int));
  printf("the person age is: %d\n", age);
}
