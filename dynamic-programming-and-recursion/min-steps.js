/* On a positive integer, you can perform any one of the following 3 steps:
 * 1.) Subtract 1 from it. ( n = n - 1 )
 * 2.) If its divisible by 2, divide by 2. ( if n % 2 == 0 , then n = n / 2  )
 * 3.) If its divisible by 3, divide by 3. ( if n % 3 == 0 , then n = n / 3  ).
 *
 * Now the question is, given a positive integer n, find the minimum number of
 * steps that takes n to 1.
 * eg:
 * 1.) For n = 1 , output: 0
 * 2.) For n = 4 , output: 2  (4 / 2 = 2 / 2 = 1 )
 * 3.) For n = 7 , output: 3  (7 - 1 = 6 / 3 = 2 / 2 = 1)
 *
 * Time complexity: O(N)
 * Space complexity: O(N)
 */
function minStepsDP(n) {
  // Base cases: minimum steps for n = 1, 2 and 3
  DP = [null, 0, 1, 1];

  const STEP = 1;

  for (let i = 4; i <= n; i++) {
    const subtract = i - 1;
    let even;
    let divisibleBy3;

    if (i % 2 === 0) { even = i / 2; }
    if (i % 3 === 0) { divisibleBy3 = i / 3; }

    const integers = [even, divisibleBy3].filter(val => Number.isSafeInteger(val));
    const subSteps = [subtract, ...integers].map(num => DP[num]);
    DP[i] = Math.min(...subSteps) + STEP;
  }

  console.log(DP);
  return DP[n];
}

console.log(0, minStepsDP(1));
console.log(2, minStepsDP(4));
console.log(3, minStepsDP(7));
console.log(4, minStepsDP(11)); // would be 5 with greedy algorithm
console.log(3, minStepsDP(12));



// NON-DP SOLUTION
// function minSteps(n, steps = 0) {
//   // Success case
//   if (n === 1) { return steps; }

//   // Failure case with Infinity so min check will never return this answer
//   if (!Number.isSafeInteger(n) || n < 1) { return Infinity; }

//   const NEW_STEPS = steps + 1;

//   const subtract = n - 1;
//   let even;
//   let divisibleBy3;

//   if (n % 2 === 0) { even = n / 2; }
//   if (n % 3 === 0) { divisibleBy3 = n / 3; }

//   return Math.min(
//     minSteps(subtract, NEW_STEPS),
//     minSteps(even, NEW_STEPS),
//     minSteps(divisibleBy3, NEW_STEPS)
//   );
// }