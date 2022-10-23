#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <stdio.h>
#include "net.h"

int main() {
   int sock_fd;
   socklen_t addrlen;
   struct sockaddr_in src_addr, server;
   char buf[32];

   if ((sock_fd = socket(AF_INET, SOCK_DGRAM, 0)) < 0) {
       perror("socket()");
       return 1;
   }

   server.sin_family      = AF_INET;
   server.sin_port        = htons(PORT);
   server.sin_addr.s_addr = INADDR_ANY;

   if (bind(sock_fd, (struct sockaddr *)&server, sizeof(server)) < 0) {
       perror("bind()");
       return 1;
   }

   addrlen = sizeof(src_addr);
   if(recvfrom(sock_fd, buf, sizeof(buf), 0, (struct sockaddr *) &src_addr, &addrlen) < 0) {
       perror("recvfrom");
       return 1;
   }
   printf("(address: %s) %s\n", inet_ntoa(src_addr.sin_addr), buf);
   printf("The value of addrlen: %d\n", addrlen);

   close(sock_fd);
   return 0;
}
