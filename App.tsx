import * as React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import LoadingAsyncWithAsset from "./components/LoadingAsyncWithAsset";
import LoadingAsync from "./components/LoadingAsync";

/**
 * Is it possible to manipulate the URI to select the audio and text tracks?
 *
 * How can I enable/change text track?
 * How can I change the audioTrack?
 * How can I preload?
 */

export default function App() {
  const video: React.MutableRefObject<Video | null> = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>
      <LoadingAsync />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
});
