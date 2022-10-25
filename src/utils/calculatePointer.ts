export default (marks: number, total: number) => {
  const cal = (marks / total) * 100;
  let pointer: number;

  if (cal >= 80) pointer = 10;
  else if (cal >= 70) pointer = 9;
  else if (cal >= 60) pointer = 8;
  else if (cal >= 55) pointer = 7;
  else if (cal >= 50) pointer = 6;
  else if (cal >= 45) pointer = 5;
  else if (cal >= 40) pointer = 4;
  else pointer = 0;

  return pointer;
};
