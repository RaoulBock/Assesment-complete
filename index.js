import fetch from 'node-fetch';
// Recommend using node-fetch for those familiar with JS fetch
/**
  * Author: Robbins J. Kariseb, ALB Harvard.
  * Senior Software Engineer
  * Deepcatch Namibia Holdings
  * Assessment Due Date: 2021-09-16
*/

const ENDPOINT = 'https://nt-cdn.s3.amazonaws.com/colors.json';


/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */

 const fetchColors = async ({ name, hex, compName, compHex }) => { 
  const res = fetch(ENDPOINT);
  const data = await getColors();
 let res= [];

 name = prep(name);
 hex = prep(hex);
 compName = prep(compName);
 compHex = prep(compHex);

 //Filter by top-level keys
 const top = searchColors({data:data,name:name,hex:hex});
 if (top.length > 0) {
  Object.keys(top).forEach(n=>{res.push(top[n]);
  });
 }

// Deep filter by complementary colors
Object.keys(data).forEach(e=> {
  const {comp} = data[e];
  const comps = searchColors({data:comp,name:compName,hex:compHex});
  if (comps.length > 0){
    Object.keys(comps).forEach(x=> {
      res.push(data[e]);
    });
  }
});
  /*
   * Your code for filtering against datasets comes here.
   * Please return a filtered array, or promise from fetch function.
   * Run "npm test" to test your results before making your commit.
   */

  return res;
};


const searchColors = ({data,name,hex}) => {
  return data.filter(k => k.name.toLowerCase().includes(name) || k.hex.toLowerCase().includes(hex));
}
const getColors = async () => {
  const response = await fetch(ENDPOINT);
  return await response.json();
}

const prep = (str) => {
  return (str == undefined) ? undefined:str.toLowerCase();
}

// Leave this here
export default fetchColors;
