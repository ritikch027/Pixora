import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router=useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        resizeMode="cover"
        source={require("../assets/images/bg_img.png")}
        style={styles.BgImg}
      />
      <Animated.View entering={FadeInDown.duration(600).springify()} style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.4)",
            "rgba(255,255,255,0.9)",
            "white",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>PIXORA</Text>
          <Text style={styles.subtitle}>Every Pixel Tells a Story....</Text>
          <TouchableOpacity onPress={()=>router.push('home')} activeOpacity={0.7} style={styles.startButton}>
            <Text style={styles.startText}>Start Exploring</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcdbdbff",
  },
  BgImg: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  gradient: {
    height: hp(65),
    width: wp(100),
    position: "absolute",
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: hp(2),
  },
  title: {
    fontSize: hp(7),
    color: theme.colors.neutral(0.9),
    fontWeight: theme.fontWeights.bold,
  },
  subtitle: {
    fontSize: hp(2.2),
    color: theme.colors.neutral(0.7),
    fontWeight: theme.fontWeights.medium,
  },
  startButton: {
    backgroundColor: theme.colors.black,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(10),
    borderRadius: wp(10),
    marginBottom: hp(8),
  },
  startText: {
    color: theme.colors.white,
    fontSize: hp(2),
    fontWeight: theme.fontWeights.medium,
  },
});
