export default (semester: string) => {
  const [year, sem] = semester.split(" ");
  const semInt = parseInt(sem);
  const currentYear = new Date().getFullYear();
  console.log(Math.floor((currentYear - semInt) / 2) + 1);
  return Math.ceil(currentYear - semInt / 2);
};
