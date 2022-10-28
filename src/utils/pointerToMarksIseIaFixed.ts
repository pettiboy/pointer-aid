import calculateMarksGivenPointer from "./calculateMarksGivenPointer";

export default (pointer: number, ise: number, ia: number) => {
  let totalReq = calculateMarksGivenPointer(pointer, 100) - ise - ia;
  let eseMarksLimit = calculateMarksGivenPointer(pointer, 50);

  let updateEse = 0;

  let count = 0;

  while (totalReq > 0 && count < 2) {
    if (totalReq > eseMarksLimit) {
      // set updateEse to existing limit
      updateEse += eseMarksLimit * 2;

      // pass on req to next iteration with higher limits
      totalReq = totalReq - eseMarksLimit;

      // maximise limits
      eseMarksLimit = Math.abs(50 - updateEse / 2);
    } else {
      updateEse += totalReq * 2;

      break;
    }

    count++;
  }

  return { ese: updateEse };
};
