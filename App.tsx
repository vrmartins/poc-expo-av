import * as React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import LoadingAsync from "./components/LoadingAsync";

/**
 * Is it possible to manipulate the URI to select the audio and text tracks?
 *
 * How can I set the poster?
 * How can I enable/change text track?
 * How can I change the audioTrack?
 * How can I preload?
 */

export default function App() {
  const video: React.MutableRefObject<Video | null> = React.useRef(null);
  // video.current?.loadAsync()
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>
      <LoadingAsync />
      {/* <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://stream.mux.com/KfaKKN1rwKfW5SHYjlBLd5Qgvl102qf2YW9haG9MhAco.m3u8",
        }}
        usePoster
        onError={(error) => console.error("🔥 onError", error)}
        onLoad={(data) => {
          console.log("🚀 onLoad", data);
          video.current?.playAsync();
        }}
        onLoadStart={() => console.log("🚀 onLoadStart")}
        onReadyForDisplay={() => {
          console.log("🚀 onReadyForDisplay");
          video.current?.playAsync();
        }}
        // useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status: AVPlaybackStatus) =>
          setStatus(() => status)
        }
        isMuted={false}
        posterSource={{
          uri: "https://image.mux.com/KfaKKN1rwKfW5SHYjlBLd5Qgvl102qf2YW9haG9MhAco/thumbnail.png?time=5",
        }}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    // alignSelf: "center",
    // width: 320,
    // height: 200,
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
