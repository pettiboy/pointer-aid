export default (ptr: number, total: number) => {
  let marks:number

  if(ptr===10) marks=total*0.8;
  else if(ptr===9) marks=total*0.7;
  else if(ptr===8) marks=total*0.6;
  else if(ptr===7) marks=total*0.55;
  else if(ptr===6) marks=total*0.5;
  else if(ptr===5) marks=total*0.45;
  else if(ptr===4) marks=total*0.4
  else marks=0
  return marks
};
