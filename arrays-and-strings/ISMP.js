// Interval Scheduling Maximization Problem

// Greedy polynomial solution
function schedule(times) {
  const output = [];
  const set = new Set(times);

  while (set.size > 0) {
    // Find time that finishes first
    let earliestFinish = [null, Infinity];

    set.forEach(time => {
      if (time[1] < earliestFinish[1]) { earliestFinish = time; }
    });

    // We found the optimal time slot!
    output.push(earliestFinish);

    // Remove optimal time slot and all intersecting slots from set
    set.forEach(time => {
      const start = time[0];
      const end = time[1];
      const selectedStart = earliestFinish[0];
      const selectedEnd = earliestFinish[1];

      // overlap if starts between start and finish...
      if ((start >= selectedStart && start < selectedEnd)
        // or ends between start and finish...
        || (end > selectedStart && end <= selectedEnd)
        // or starts before and ends after
        || (start <= selectedStart && end >= selectedEnd)) {
        set.delete(time);
      }
    });
  }
  
  return output;
}

const arr = [[7, 8], [10, 11], [13, 18], [0, 1], [1, 3], [0, 2], [3, 6], [14, 15]];
const arr2 = [[0, 6], [4, 7], [6, 8], [9, 20], [10, 11], [12, 15]];
console.log(schedule(arr));
console.log(schedule(arr2));