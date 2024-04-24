export const getPrevDays = (selectedDate: Date): number[] => {
  const prevDate = new Date();
  prevDate.setMonth(selectedDate.getMonth() - 1);
  const monthDays = getDays(prevDate);

  selectedDate.setDate(1);
  const firstDayOfTheWeek = selectedDate.getDay();

  let prevDays = [];

  for (
    let i = monthDays.length - firstDayOfTheWeek + 1;
    i <= monthDays.length;
    i++
  ) {
    prevDays.push(i);
  }
  return prevDays;
};

export const getNextDays = (selectedDate: Date): number[] => {
  const nextDate = new Date();
  nextDate.setMonth(selectedDate.getMonth() + 1);
  const nextDays = getDays(nextDate);

  const lastDayOfTheMonth = getDays(selectedDate).pop();
  if (!lastDayOfTheMonth) return [];
  const newDate = new Date(selectedDate);
  newDate.setDate(lastDayOfTheMonth);
  const weekDayOfLastDayOfTheMonth = newDate.getDay();

  let daysArray = [];

  // if is saturday, return a whole line of days
  if (weekDayOfLastDayOfTheMonth === 6)
    return nextDays.filter((day) => day <= 7);

  for (let i = 0; i < 6 - weekDayOfLastDayOfTheMonth ;i++) {
    daysArray.push(nextDays[i]);
  }
  return daysArray;
};

export const getDays = (selectedDate: Date): number[] => {
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const month = selectedDate.getMonth();
  const _31DAYSMONTH =
    month === 0 ||
    month === 2 ||
    month === 4 ||
    month === 6 ||
    month === 7 ||
    month === 9 ||
    month === 11;
  const _30DAYSMONTH =
    month === 3 || month === 5 || month === 8 || month === 10;

  if (_31DAYSMONTH) return days;
  days.pop();
  if (_30DAYSMONTH) return days;

  if (isLeapYear(selectedDate.getFullYear())) {
    return days.filter((day) => day <= 29);
  }

  return days.filter((day) => day <= 28);
};

const isLeapYear = (year: number) => {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
};
