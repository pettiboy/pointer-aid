export default (semester: string) => {
  const [, sem] = semester.split(" ");
  const semInt = parseInt(sem);
  const currentYear = new Date().getFullYear();
  return Math.ceil(currentYear - semInt / 2);
};
