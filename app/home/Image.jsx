import { Entypo, Octicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { useState } from "react";

import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";

const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [status, setStatus] = useState("loading");
  const fileName = `image_${Date.now()}.jpg`;
  const uri = item?.webformatURL;
  const imageURL = uri;

  const onLoad = () => {
    setStatus("");
  };
  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;
    const isWeb = Platform.OS == "web";
    const maxWidth = isWeb ? wp(20) : wp(92);
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;
    if (aspectRatio < 1) {
      //potrait
      calculatedWidth = calculatedHeight * aspectRatio;
    }
    return {
      height: calculatedHeight,
      width: calculatedWidth,
    };
  };
  const handleDownloadImage = async () => {
    if (Platform.OS == "web") {
      const anchor = document.createElement("a");
      anchor.href = imageURL;
      anchor.target = "_blank";
      anchor.download = fileName || "download";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      setStatus("downloading");
      const uri = await downloadImage();
      if (uri) {
        await MediaLibrary.saveToLibraryAsync(uri);
        showToast("Image Downloaded");
        await FileSystem.deleteAsync(uri);
      }
    }
  };
  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
  };
  const toastConfig = {
    success: ({ text1, props, ...rest }) => (
      <View style={styles.toast}>
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    ),
  };

  const handleShareImage = async () => {
    if (Platform.OS == "web") {
      await Clipboard.setStringAsync(String(imageURL ?? ""));
      showToast("Link Copied!..");
    } else {
      setStatus("sharing");
      let uri = await downloadImage();
      if (uri) {
        await Sharing.shareAsync(uri, {
          mimeType: "image/jpeg",
          dialogTitle: "Share this image",
        });
        await FileSystem.deleteAsync(uri);
      }
    }
  };

  const downloadImage = async () => {
    try {
      const imagesDir = FileSystem.documentDirectory + "images/";
      const dirInfo = await FileSystem.getInfoAsync(imagesDir);

      if (!dirInfo.exists) {
        console.log("📂 Creating images directory...");
        await FileSystem.makeDirectoryAsync(imagesDir, { intermediates: true });
      }

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return;
      }
      const destination = imagesDir + fileName;

      const { uri } = await FileSystem.downloadAsync(imageURL, destination);
      setStatus("");
      return uri;
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <BlurView style={styles.container} tint="dark" intensity={100}>
      <View style={[getSize()]}>
        <View style={styles.loading}>
          {status == "loading" && (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>
        <Image
          transition={100}
          source={uri}
          style={[styles.image, getSize()]}
          onLoad={onLoad}
        ></Image>
      </View>
      <View style={styles.buttons}>
        <Animated.View style={styles.button} entering={FadeInDown.springify()}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
            <Octicons
              name="x"
              style={styles.icon}
              size={24}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={styles.button}
          entering={FadeInDown.springify().delay(100)}
        >
          {status == "downloading" ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <TouchableOpacity activeOpacity={0.7} onPress={handleDownloadImage}>
              <Octicons
                style={styles.icon}
                name="download"
                size={24}
                color={theme.colors.white}
              />
            </TouchableOpacity>
          )}
        </Animated.View>
        <Animated.View
          style={styles.button}
          entering={FadeInDown.springify().delay(200)}
        >
          {status == "sharing" ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <TouchableOpacity activeOpacity={0.7} onPress={handleShareImage}>
              <Entypo
                style={styles.icon}
                name="share"
                size={20}
                color={theme.colors.white}
              />
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
      <Toast visibilityTime={2000} config={toastConfig} />
    </BlurView>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  loading: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  buttons: {
    flexDirection: "row",
    marginTop: 40,
    alignItems: "center",
    gap: 50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: hp(6),
    width: hp(6),
    borderRadius: theme.radius.lg,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderCurve: "continuous",
  },
  toast: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: theme.radius.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  toastText: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.white,
  },
  icon: {
    padding: 10,
  },
});
