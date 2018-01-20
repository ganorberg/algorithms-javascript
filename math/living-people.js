/*
 * Given a list of people with their birth and death years, implement a method 
 * to compute the year with the most number of people alive. You may assume that
 * all people were born between 1900 and 2000 (inclusive). If a person was alive
 * during any portion of that year, they should be included in that year's 
 * count. For exmaple, Person (birth = 1908, death = 1909) is included in the 
 * counts for both 1908 and 1909.
 * 
 * STRATEGY: O(Y + P) time and O(Y) space, where Y is year range and P is number
 * of people.
 * Birth means 1 new person. Death means 1 less person. Create array that tracks
 * population growth and loss each year by adding 1 for every birth that year
 * and subtracting 1 the year after every death. Compute cumulative sum and 
 * return max.
 */
