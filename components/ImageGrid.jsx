import { FlashList } from "@shopify/flash-list";
import { StyleSheet, View } from "react-native";
import { getColumnCount, wp } from "../helpers/common";
import ImageCard from "./imageCard";

const ImageGrid = ({ images,router }) => {
  const numColumns = getColumnCount();

  return (
    <View style={styles.container}>
      <FlashList
        data={images}
        masonry
        numColumns={numColumns}
        contentContainerStyle={styles.listContainerStyle}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ImageCard router={router} item={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(100),
    paddingBottom: 10,
  },
  listContainerStyle: {
    paddingHorizontal: wp(4),
  },
});
