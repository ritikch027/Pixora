import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { useCallback, useMemo } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { data } from "../constants/data";
import { theme } from "../constants/theme";
import { capitalize, hp } from "../helpers/common";
import SectionView, { ColorFilterRow, CommonFilterRow } from "./SectionView";

const FilterModal = ({
  modalRef,
  onClose,
  onApply,
  onReset,
  filters,
  setFilters,
}) => {
  const snapPoints = useMemo(() => ["75%"], []);
  const renderBackdrop = useCallback(
    (props) => <CustomBackdrop {...props} />,
    []
  );
  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      index={1}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterTxt}>Filters</Text>
          {Object.keys(sections).map((SectionName, index) => {
            let sectionView = sections[SectionName];
            let sectionData = data.filters[SectionName];
            let title = capitalize(SectionName);
            return (
              <Animated.View
                entering={FadeInDown.delay(index * 100 + 100)
                  .springify()
                  .damping(11)}
                key={SectionName}
              >
                <SectionView
                  title={title}
                  content={sectionView({
                    data: sectionData,
                    filters,
                    onApply,
                    onReset,
                    filterName: SectionName,
                    setFilters,
                  })}
                ></SectionView>
              </Animated.View>
            );
          })}
          {/* action container */}
          <Animated.View
            entering={FadeInDown.delay(500)
              .springify()
              .damping(11)}
            style={styles.buttons}
          >
            <TouchableOpacity style={styles.resetButton} onPress={onReset}>
              <Text
                style={[styles.btnText, { color: theme.colors.neutral(0.9) }]}
              >
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => onApply(filters)}
            >
              <Text style={[styles.btnText, { color: theme.colors.white }]}>
                Apply
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
const sections = {
  order: (props) => <CommonFilterRow {...props} />,
  orientation: (props) => <CommonFilterRow {...props} />,
  type: (props) => <CommonFilterRow {...props} />,
  colors: (props) => <ColorFilterRow {...props} />,
};

const CustomBackdrop = ({ style, animatedIndex }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];

  return (
    <Animated.View style={containerStyle}>
      {Platform.OS === "ios" ? (
        <BlurView style={StyleSheet.absoluteFill} intensity={100} tint="dark" />
      ) : (
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.androidBackdrop]}
        />
      )}
    </Animated.View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor:
      Platform.OS === "ios" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.4)",
  },
  androidBackdrop: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  content: {
    flex: 1,
    gap: 15,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
  filterTxt: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
    gap: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: hp(3),
  },
  applyButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.8),
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
  },
  resetButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.02),
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
    borderWidth: 2,
    borderColor: theme.colors.grayBG,
  },
  btnText: {
    fontSize: hp(2),
  },
});
