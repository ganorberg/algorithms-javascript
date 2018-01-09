/*
 * Design an algorithm to find the kth number such that the only prime factors 
 * are 3, 5 and 7. Note that 3, 5 and 7 do not have to be factors, but it should 
 * not have any other prime factors. For example, the first several multiples 
 * would be (in order) 1, 3, 5, 7, 9, 15, 21.
 * 
 * ASSUMPTIONS
 * - only makes sense for positive k
 * 
 * STRATEGY: O(k) time if replace native array with proper Queue data structure
 * All multiples will be of the form 3^a * 5^b * 7^c, where a, b and c are 
 * nonnegative integers. We can generate each permutation once with the use of
 * 3 queues: 3Q, 5Q, and 7Q. The queues will hold each number multiplied by 3, 5
 * and 7, respectively. We pick the minimum by comparing the front of each 
 * queue, then fill the queues with its multiples. If we picked the minimum from
 * 3Q, multiply the value by 3 and add to 3Q, 5 and add to 5Q, and 7 and add to
 * 7Q. However, if we pick from 5Q, we don't want to duplicate the multiple of 
 * 3, so we only add the multiple of 5 to 5Q and 7 to 7Q. Same idea if picking
 * from 7Q, we only add the multiple of 7 to 7Q. Return the kth minimum given
 * the first minimum is 1.
 */
function kthMultiple(k) {
  if (!Number.isSafeInteger(k) || k < 0) {
    throw new Error("Please insert a safe positive integer, my friend.");
  }

  let multiple = 1;
  const Q3 = [3];
  const Q5 = [5];
  const Q7 = [7];

  const SEQUENCE_START = 2;
  for (let i = SEQUENCE_START; i <= k; i++) {
    const min3 = Q3[0];
    const min5 = Q5[0];
    const min7 = Q7[0];

    multiple = Math.min(min3, min5, min7);

    // Magic numbers come from pattern where current number produces next numbers
    switch (multiple) {
      case min3:
        Q3.shift();
        Q3.push(min3 * 3);
        Q5.push(min3 * 5);
        Q7.push(min3 * 7);
        break;
      case min5:
        Q5.shift();
        Q5.push(min5 * 5);
        Q7.push(min5 * 7);
        break;
      case min7:
        Q7.shift();
        Q7.push(min7 * 7);
        break;
      default:
        throw new Error("Should not reach here");
    }
  }

  return multiple;
}

console.log(1, kthMultiple(1));
console.log(3, kthMultiple(2));
console.log(5, kthMultiple(3));
console.log(7, kthMultiple(4));
console.log(9, kthMultiple(5));
console.log(15, kthMultiple(6));
console.log(21, kthMultiple(7));
console.log(25, kthMultiple(8));
console.log(27, kthMultiple(9));