export default (pointer: number, maxMarks: number) => {
  let marks: number;

  if (pointer === 10) marks = maxMarks * 0.8;
  else if (pointer === 9) marks = maxMarks * 0.7;
  else if (pointer === 8) marks = maxMarks * 0.6;
  else if (pointer === 7) marks = maxMarks * 0.55;
  else if (pointer === 6) marks = maxMarks * 0.5;
  else if (pointer === 5) marks = maxMarks * 0.45;
  else if (pointer === 4) marks = maxMarks * 0.4;
  else marks = 0;
  return marks;
};
