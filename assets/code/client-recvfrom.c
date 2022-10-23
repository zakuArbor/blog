#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stdio.h>
#include <arpa/inet.h>
#include "net.h"

int main() {
   int sock_fd;
   struct sockaddr_in server;
   char buf[32];

   if ((sock_fd = socket(AF_INET, SOCK_DGRAM, 0)) < 0) {
       perror("socket()");
       return 1;
   }

   server.sin_family      = AF_INET; 
   server.sin_port        = htons(PORT); 
   server.sin_addr.s_addr = inet_addr(SERVER_IP); /* Server's Address   */

   strcpy(buf, "Hello World");

   if (sendto(sock_fd, buf, (strlen(buf)+1), 0, (struct sockaddr *)&server, sizeof(server)) < 0) {
       perror("sendto()");
       return 1;
   }

   close(sock_fd);
}
