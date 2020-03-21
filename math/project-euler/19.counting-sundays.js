/*
You are given the following information, but you may
prefer to do some research for yourself.

1 Jan 1900 was a Monday.
Thirty days has September,
April, June and November.
All the rest have thirty-one,
Saving February alone,
Which has twenty-eight, rain or shine.
And on leap years, twenty-nine.
A leap year occurs on any year evenly divisible by 4, 
but not on a century unless it is divisible by 400.

How many Sundays fell on the first of the month during 
the twentieth century (1 Jan 1901 to 31 Dec 2000)?

THOUGHTS
- I had never heard of that last rule, but it's legit.
  Doesn't impact this problem though given start and end dates.
- Create map of month: days in month, or just use array with 12 slots
- How represent dates? using native date object? parse milliseconds?
  pretty sure Date object doesn't handle leap years and am not
  going to use a library like dayjs or date-fns. Probably just do
  math 1 day at a time from 1/1/1900 as 1. So 1-7 is Monday - Sunday,
  then 8-14, etc.
- need way to parse dates from input into days from 1/1/1900. or to
  know when to stop if building up from start date.
- need to track months too to know that it's first sunday
- given so many things to track, could just loop and let computer do math
*/
function countSundays() {
  // null offset to match calendar months
  const daysInMonth = [null, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let date = 1; // represents Jan 1, Jan 2, etc.
  let month = 1;
  let year = 1900;
  let dayOfWeek = 2; // 1 is Sunday, 2 is Monday... 7 is Saturday
  let sundaysOnFirstOfMonth = 0;
  while (year < 2001) {
    if (dayOfWeek === 1 && date === 1 && year >= 1901) {
      sundaysOnFirstOfMonth++;
    }

    // Handle leap years. Inefficient but works.
    if (year % 4 === 0) {
      daysInMonth[2] = 29;
    } else {
      daysInMonth[2] = 28;
    }

    dayOfWeek++;
    date++;

    if (dayOfWeek > 7) {
      dayOfWeek = 1;
    }

    if (date > daysInMonth[month]) {
      date = 1;
      month++;
      if (month > 12) {
        month = 1;
        year++;
      }
    }
  }

  return sundaysOnFirstOfMonth;
}

console.log(countSundays());
