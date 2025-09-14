import { Dimensions } from "react-native";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
export const wp = (percentage) => {
  const value = (percentage * deviceWidth) / 100;
  return Math.round(value);
};
export const hp = (percentage) => {
  const value = (percentage * deviceHeight) / 100;
  return Math.round(value);
};

export const getColumnCount = () => {
  if (deviceWidth >= 1024) {
    //pc
    return 4;
  } else if (deviceWidth >= 768) {
    //tab
    return 3;
  } else {
    //phone
    return 2;
  }
};
export const getImageSize = (height, width, deviceWidth) => {
  if (!height || !width || !deviceWidth) {
    if (width > height) return 130; // landscape
    if (width < height) return 250; // portrait
    return 200; // square
  }

  const aspectRatio = height / width;
  const calculatedHeight = displayWidth * aspectRatio;
  return Math.max(100, Math.min(calculatedHeight, 400));
};

export const capitalize = (string) => {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
};
