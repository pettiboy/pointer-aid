export default (obj: StringNumberObject) => {
  // console.log("ds", Object.keys(obj).length);
  // if (Object.keys(obj).length < 1) return 0;
  return Object.keys(obj).reduce((sum, key) => sum + obj[key], 0) || 0;
};
