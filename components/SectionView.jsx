import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../constants/theme";
import { capitalize, hp } from "../helpers/common";

const SectionView = ({ title, content }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{content}</View>
    </View>
  );
};

export const CommonFilterRow = ({
  data,
  onApply,
  filters,
  onReset,
  filterName,
  setFilters,
}) => {
  const onSelect = (item) => {
    setFilters({ ...filters, [filterName]: item });
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item, index) => {
          let isActive = filters && filters[filterName] == item;
          let backgroundColor = isActive
            ? theme.colors.neutral(0.7)
            : theme.colors.white;
          let color = isActive ? theme.colors.white : theme.colors.neutral(0.7);

          return (
            <TouchableOpacity
              style={[styles.filterBtn, { backgroundColor }]}
              key={item}
              activeOpacity={0.7}
              onPress={() => onSelect(item)}
            >
              <Text style={[styles.btnText, { color }]}>
                {capitalize(item)}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};
export const ColorFilterRow = ({
  data,
  onApply,
  filters,
  onReset,
  filterName,
  setFilters,
}) => {
  const onSelect = (item) => {
    setFilters({ ...filters, [filterName]: item });
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item, index) => {
          let isActive = filters && filters[filterName] == item;
          let borderColor = isActive ? theme.colors.neutral(0.4) : "white";
          return (
            <TouchableOpacity
              key={item}
              activeOpacity={0.7}
              onPress={() => onSelect(item)}
            >
              <View style={[styles.colorWrapper, {borderColor}]}>
                <View style={[styles.color, { backgroundColor: item }]}></View>
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default SectionView;

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.neutral(0.8),
    marginVertical:5,
  },
  flexRowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterBtn: {
    flexWrap: "wrap",
    padding: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },
  btnText: {
    fontSize: hp(1.6),
    fontWeight: theme.fontWeights.medium,
  },
  color: {
    height: 40,
    width: 50,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },
  colorWrapper: {
    padding: 3,
    borderWidth: 2,
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
  },
});
