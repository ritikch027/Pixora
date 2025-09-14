import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../constants/theme";
import { getImageSize, hp } from "../helpers/common";

const ImageCard = ({ item, index, router }) => {
  const getImageHeight = () => {
    const { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(height, width) };
  };

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "home/Image", params: { ...item } })
      }
      activeOpacity={0.9}
      style={[styles.container]}
    >
      <Image
        style={[styles.image, getImageHeight()]}
        source={{ uri: item.webformatURL }}
        transition={1000}
        contentFit="cover"
      />
    </TouchableOpacity>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(0.5),
    backgroundColor: "#ece9e9ff",
    borderRadius: theme.radius.sm,
    marginHorizontal: hp(0.5),
    overflow: "hidden",
    flex: 1,
  },
  image: {
    width: "100%",
  },
});
