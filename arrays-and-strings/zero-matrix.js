/* Write an algorithm such that if an element in an MxN matrix is 0, its entire
 * row and column are set to 0.
 * 
 * ASSUMPTIONS
 * - valid matrix input as array of subarrays of same length
 * 
 * STRATEGY WITH O(N) AUXILIARY SPACE
 * Create two sets: one for rows and one for columns. Loop through matrix and 
 * store any row or column with 0. Then loop through matrix again and zero out
 * rows and columns with 0.
 * 
 * STRATEGY WITHOUT AUXILIARY SPACE
 * Use first row and column as storage for zeros. Do first pass on both to 
 * determine if they have any zeros so we can zero them out completely in the 
 * end if we need to. Loop through rest of matrix. For each row with 0, change
 * first column at that row to 0. For each column with 0, change first row at 
 * that column to 0. Build helper functions that zero out rows and columns
 * at specific indexes. Then loop through first row and column zeroing out 
 * any row or column with 0. Finally, zero out first row and/or column if 
 * earlier a 0 was found.
 */
