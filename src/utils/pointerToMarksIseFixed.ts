import calculateMarksGivenPointer from "./calculateMarksGivenPointer";

export default (pointer: number, ise: number) => {
  let totalReq = calculateMarksGivenPointer(pointer, 100) - ise;
  let eseMarksLimit = calculateMarksGivenPointer(pointer, 50);
  let iaMarksLimit = calculateMarksGivenPointer(pointer, 20);

  let updateEse = 0;
  let updateIa = 0;

  let count = 0;

  while (totalReq > 0 && count < 5) {
    if (totalReq > eseMarksLimit) {
      // set updateEse to max limit
      updateEse += eseMarksLimit * 2;

      // pass on req to lower exams
      totalReq = totalReq - eseMarksLimit;

      if (totalReq > iaMarksLimit) {
        // set ia to existing limit
        updateIa += iaMarksLimit;

        // pass on req to next iteration with higher limits
        totalReq = totalReq - iaMarksLimit;

        // maximise limits
        eseMarksLimit = Math.abs(50 - updateEse / 2);
        iaMarksLimit = Math.abs(20 - updateIa);
      } else {
        updateIa += totalReq;

        break;
      }
    } else {
      updateEse += totalReq * 2;
      updateIa += 0;

      break;
    }

    count++;
  }

  return { ese: updateEse, ia: updateIa };
};
