import calculateMarksGivenPointer from "./calculateMarksGivenPointer";

export default (pointer: number) => {
  let totalReq = calculateMarksGivenPointer(pointer, 100);

  let eseMarksLimit = calculateMarksGivenPointer(pointer, 50);
  let iaMarksLimit = calculateMarksGivenPointer(pointer, 20);
  let iseMarksLimit = calculateMarksGivenPointer(pointer, 30);

  let updateEse = 0;
  let updateIa = 0;
  let updateIse = 0;

  if (totalReq > eseMarksLimit) {
    // set ese to max limit
    updateEse += eseMarksLimit * 2;

    // pass on req to lower exams
    totalReq = totalReq - eseMarksLimit;

    if (totalReq > iaMarksLimit) {
      // set ia to max limit
      updateIa += iaMarksLimit;
      // pass on req to lower exams
      totalReq = totalReq - iaMarksLimit;

      if (totalReq > iseMarksLimit) {
        updateIse += iseMarksLimit;
      } else {
        updateIse += totalReq;
      }
    } else {
      updateIa += totalReq;
      updateIse += 0;
    }
  } else {
    updateEse += totalReq * 2;
    updateIa += 0;
    updateIse += 0;
  }

  return { ese: updateEse, ia: updateIa, ise: updateIse };
};
