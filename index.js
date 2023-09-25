const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");
const sliderText = document.getElementById("sliderText");
const slider = document.getElementById("slider");
hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;
  if (!isValidHex(hex)) return;

  const strippedHex = hex.replace("#", "");
  inputColor.style.backgroundColor = "#" + strippedHex;

  //   inputColor.style.backgroundColor = hex;
});
const isValidHex = (hex) => {
  if (!hex) return false;

  const strippedHex = hex.replace("#", "");
  return strippedHex.length === 3 || strippedHex.length === 6;
};

//Create a HEX vale into RGB
// Create a function  to convert Hex to RGB
const convertHexToRGB = (hex) => {
  if (!isValidHex(hex)) return null;
  let strippedHex = hex.replace("#", "");
  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] +
      strippedHex[0] +
      strippedHex +
      strippedHex[1] +
      strippedHex[1] +
      strippedHex +
      strippedHex[2] +
      strippedHex[2];
  }
  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(6, 8), 16);

  return { r, g, b };
};
//create a function returning RGB to HEX
// take in 3 parameters  -r,g and b
//for each (r,g,b)-create a hex pair that is two characters log
//return hex value to starting with hash tag
// example- r to. string(16)

convertRGBToHex = (r, g, b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);
  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
};
//create the alteredColor function which accepts hex value and percentage
//convert the hex value to rgb
//increase each r, g,b value by appropriate amount (percentage of 255)
//use new R, G,B Values to convert to a hex value
//return hex value
const alterColor = (hex, percentage) => {
  const { r, g, b } = convertHexToRGB(hex);
  const amount = Math.floor((percentage / 100) * 255);
  const newR = increaseWithin0To255(r, amount);
  const newG = increaseWithin0To255(g, amount);
  const newB = increaseWithin0To255(b, amount);
  // console.log({ newR, newG, newB });
  return convertRGBToHex(newR, newG, newB);
};
const increaseWithin0To255 = (hex, amount) => {
  // const newHex = hex + amount;
  // if (newHex > 255) return 255;
  // if (newHex < 0) return 0;
  // return newHex;
  return Math.min(255, Math.max(0, hex + amount));
};
alterColor("fff", 10);

// console.log(convertRgbToHex(255, 255, 255));
//get a reference to the slider and slider Text Dom elements
//create an input eventLIstener for slider element
//display the value of the slider

slider.addEventListener("input", () => {
  //check the Hex is Valid
  if (!isValidHex(hexInput.value)) return;
  sliderText.textContent = ` ${slider.value}%`;
  //get the altered hex value
  const alteredHex = alterColor(hexInput.value, slider.value);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`;
  //update the altered color
});
