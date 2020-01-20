let last = Date.now();

export function lastDate() {
  const newDate = Date.now();
  const diff = newDate - last;
  last = newDate;
  return diff;
}
