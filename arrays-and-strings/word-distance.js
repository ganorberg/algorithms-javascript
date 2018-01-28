/*
 * You have a large text file containing words. Given any two words, find the
 * shortest distance (in terms of number of words) between them in the file. If
 * the operation will be repeated many times for the same file (but different
 * pairs of words), can you optimize your solution?
 * 
 * ASSUMPTIONS
 * - text file is received as string and can fit on my laptop. Otherwise, need
 *   to break up work across machines and do something like MapReduce on hash 
 *   table values.
 * 
 * STRATEGY: O(A + B) time and O(N) space, where A and B are number of times
 * each word appears and N is number of words in document.
 * 
 * Cache each word in hash table where key is word and value is all indices 
 * where each word appears. When comparing word distances, problem simplifies to
 * finding smallest difference between two sorted arrays of positive integers.
 * 
 * ex. [40, 72, 110, 2000] and [1, 10, 50, 89, 1000] has shortest distance
 * 50 - 40 = 10.
 * 
 * Use one pointer for each array and get difference between values at those 
 * pointers. Move pointer with smaller value and compare again. Return minimum 
 * difference found.
 * 
 * MULTIPLE MACHINE STRATEGY
 * If file is so large that one machine cannot store all words in a hash table
 * in memory, can break this up across machines. Can calculate size of each word
 * based on encoding and then distribute amongst machines accordingly (machines
 * could have different memory sizes and that is okay with this approach if we
 * know the machine sizes up front). After each machine creates its table, 
 * which should be smaller than the text file fragment given typical text with
 * repeated words, perform MapReduce to collect all onto one machine. If doesn't 
 * fit on one machine, can store on multiple machines in alphabetical order and
 * can communicate between machines for lookups when needed.
 */
