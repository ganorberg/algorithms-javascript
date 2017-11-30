/* An animal shelter, which holds only dogs and cats, operates on a strictly
 * "first in, first out" basis. People must adopt either the "oldest" (based on 
 * arrival time) of all animals at the shelter, or they can select whether they 
 * would prefer a dog or a cat (and will receive the oldest animal of that 
 * type). They cannot select which specific animal they would like. Create the 
 * data structures to maintain this system and implement operations such as 
 * enqueue, dequeueAny, dequeueDog, and dequeueCat. You may use the built-in 
 * LinkedList data structure.
 * 
 * QUEUE WITH DOUBLE LIST STRATEGY: O(1) TIME COMPLEXITY FOR ALL OPERATIONS
 * Maintain a queue with separate linked lists for dogs and cats. To enqueue, 
 * check if dog or cat then append to correct list. For dequeueDog/Cat, dequeue 
 * from that list. For dequeueAny, look at head of both lists and dequeue older 
 * animal.
 */