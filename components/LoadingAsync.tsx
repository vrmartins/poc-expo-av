import React, { useState, useEffect } from "react";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { Button, StyleSheet, Text, View } from "react-native";

export default function LoadingAsync() {
  const videoUri =
    "https://stream.mux.com/KfaKKN1rwKfW5SHYjlBLd5Qgvl102qf2YW9haG9MhAco.m3u8";
  const [status, setStatus] = React.useState<AVPlaybackStatus>({
    isPlaying: false,
  } as AVPlaybackStatus);
  const [readyForDisplay, setReadyForDisplay] = useState(false);

  const video = new Video({});
  const videoRef: React.MutableRefObject<Video> = React.useRef(video);
  const source = { uri: videoUri };

  // useEffect(() => {
  //   loadVideo();
  // }, []);

  const loadVideo = async () => {
    // const { sound } = await Video.loadAsync({ uri: videoUri }, {}, false);

    // It was possible to notice that the Video component should always be loaded to use video.loadAsync
    // This prevents us to loadAsync without rendering the Video component
    const avPlaybackStatus = await videoRef.current.loadAsync(source, {}, true);

    console.log("avPlaybackStatus ===>", avPlaybackStatus);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        usePoster
        onError={(error) => console.error("🔥 onError", error)}
        onLoad={(data) => {
          console.log("🚀 onLoad", data);
          videoRef.current.playAsync();
        }}
        onLoadStart={() => console.log("🚀 onLoadStart")}
        onReadyForDisplay={() => {
          console.log("🚀 onReadyForDisplay");
          // videoRef.current.playAsync();
          setReadyForDisplay(true);
        }}
        // useNativeControls
        // resizeMode={ResizeMode.CONTAIN}
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
        {!readyForDisplay && <Button onPress={loadVideo} title="Load video" />}
        {readyForDisplay && status.isLoaded && (
          <Button
            title={status.isPlaying ? "Pause" : "Play"}
            onPress={() =>
              status.isPlaying
                ? videoRef.current.pauseAsync()
                : videoRef.current.playAsync()
            }
          />
        )}
      </View>
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
    marginBottom: 80,
  },
});
