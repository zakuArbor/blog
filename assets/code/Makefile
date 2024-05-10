all: spatial

spatial:
	gcc -g -O0 seq_sum.c -o seq_sum
	gcc -g -O0 seq_sum2.c -o seq_sum2
	gcc -g -O0 rand_sum.c -o rand_sum

spatial_perf:
	perf stat -e cache-misses,dTLB-load-misses,iTLB-load-misses -d ./seq_sum
	perf stat -e cache-misses,dTLB-load-misses,iTLB-load-misses -d ./seq_sum2
	perf stat -e cache-misses,dTLB-load-misses,iTLB-load-misses -d ./rand_sum
	perf stat -e cache-misses,dTLB-load-misses,iTLB-load-misses -d ./rand_sum

clean:
	rm seq_sum seq_sum2 rand_sum
