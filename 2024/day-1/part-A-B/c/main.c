#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {

  FILE *f = fopen("../input.txt", "r");

  if (f == NULL) {
    puts("No file pointer returned\n");
  }

  char c;
  int line_count = 0;
  // get number of lines
  while((c = fgetc(f)) != EOF) {
    if (c == '\n') {
      line_count += 1;
    }
  }

  // put file counter back to 0 so that fgets starts from the beggining
  rewind(f);

  int *left = malloc(line_count * sizeof(int));
  int *right = malloc(line_count * sizeof(int));

  char line[256];
  int line_number = -1;

  while(
    // read 256 bytes from f into line
    fgets(line, sizeof(line), f)
  ) {
    line_number++;
    // assume this will be shorter than 256!
    size_t len = strlen(line);
    // printf("length of line: %lu\n", len);
    if (len > 0 && line[len-1] == '\n') {
      // Turn '1234    5678\n\0' into '1234    5678\0\0'
      // essenitally shortening string by one byte
      line[len-1] = '\0';
    }

    // left is a pointer so it is an address if we add to it we are saying go int size
    // units of memory from the pointer
    // so left + 0 = first number
    // left + 1 = second number
    int scan_res = sscanf(line, "%d %d", left + line_number, right + line_number);
    if (scan_res != 2) {
      puts("no luck parsing line");
    }
  }

  fclose(f);

  // sort left
  for (int j = 1; (j - line_count) <= 0; j++) {
    for (int i = 0; i < (line_count - j); i++) {
      int tmp_a = *(left + i);
      int tmp_b = *(left + i + 1);
      if (tmp_a > tmp_b) {
        *(left + i + 1) = tmp_a;
        *(left + i) = tmp_b;
      }
    }
  }

  // sort right
  for (int j = 1; (j - line_count) <= 0; j++) {
    for (int i = 0; i < (line_count - j); i++) {
      int tmp_a = *(right + i);
      int tmp_b = *(right + i + 1);
      if (tmp_a > tmp_b) {
        *(right + i + 1) = tmp_a;
        *(right + i) = tmp_b;
      }
    }
  }

  /*
  // print left
  puts("left sorted");
  for (int i = 0; i < line_count; i++) {
    if (i == (line_count - 1)) {
      printf("%d\n", *(left + i));
    } else {
      printf("%d, ", *(left + i));
    }
  }

  // print left
  puts("right sorted");
  for (int i = 0; i < line_count; i++) {
    if (i == (line_count - 1)) {
      printf("%d\n", *(right + i));
    } else {
      printf("%d, ", *(right + i));
    }
  }
  */

  int running = 0;
  for (int i = 0; i < line_count; i++) {
    if (*(left + i) > *(right + i)) {
      running += (*(left + i) - *(right + i));
    }
    if (*(left + i) < *(right + i)) {
      running += (*(right + i) - *(left + i));
    }
  }

  printf("running = %d\n", running);

  return 0;

}
