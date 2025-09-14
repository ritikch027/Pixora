import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FadeInRight } from "react-native-reanimated";
import { data } from "../constants/data";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";
import Animated from "react-native-reanimated";

const Categories = ({ activeCategory, onChangeCategory }) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={data.categories}
      contentContainerStyle={styles.categoryContainer}
      renderItem={({ item, index }) => (
        <CategoryItem
          isActive={activeCategory == item}
          onChangeCategory={onChangeCategory}
          title={item}
          index={index}
        />
      )}
      keyExtractor={(item) => item}
    />
  );
};
const CategoryItem = ({ title, index, isActive, onChangeCategory }) => {
  let color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
  let backgroundColor = isActive
    ? theme.colors.neutral(0.8)
    : theme.colors.white;
  return (
    <Animated.View entering={FadeInRight.delay(index * 100).duration(500).springify().damping(14)}>
      <TouchableOpacity
        onPress={() => onChangeCategory(isActive ? null : title)}
        activeOpacity={0.6}
        style={[styles.category, { backgroundColor }]}
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
export default Categories;
const styles = StyleSheet.create({
  categoryContainer: {
    gap: 8,
    paddingHorizontal: wp(4),
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium,
  },
});
