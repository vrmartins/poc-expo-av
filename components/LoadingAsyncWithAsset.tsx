import React, { useState, useEffect } from "react";
import { AVPlaybackSource, AVPlaybackStatus, Video } from "expo-av";
import { Button, StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";

export default function LoadingAsyncWithAsset() {
  const videoUri =
    "https://stream.mux.com/KfaKKN1rwKfW5SHYjlBLd5Qgvl102qf2YW9haG9MhAco.m3u8";
  // const videoUri =
  //   "https://videos.ctfassets.net/1sa3dimwvx6n/70qMNJlQVgEF7DhnZlVWG4/9de138d1cc16fb6be841357533e38bc5/cv-hip-flexor-stretch-sideways-right-preview-video.mp4";
  const [readyForDisplay, setReadyForDisplay] = useState(false);
  const video = new Video({});
  const videoRef: React.MutableRefObject<Video> = React.useRef(video);
  const source: AVPlaybackSource = { uri: videoUri };

  // useEffect(() => {
  //   loadVideo();
  // }, []);

  const loadVideo = async () => {
    // const { sound } = await Video.loadAsync({ uri: videoUri }, {}, false);
    // const avPlaybackStatus = await videoRef.current.loadAsync(source, {}, true);
    // console.log("avPlaybackStatus ===>", avPlaybackStatus);

    const asset = await Asset.loadAsync(source.uri);
    console.log("local", asset[0].localUri);
    // const newSource = { uri: asset[0].localUri || "" };
    const newSource = asset[0];

    // It works fine when we have a mp4 in the source. If it is a m3u8, it doesn't load the video.
    await videoRef.current.loadAsync(newSource, {}, false);
    // console.log(result);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        onLoad={(data) => {
          console.log("🚀 onLoad", data);
          // videoRef.current.playAsync();
        }}
        onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
          console.log("onPlaybackStatusUpdate", status);
        }}
        onReadyForDisplay={(data) => {
          console.log("🚀 onReadyForDisplay", data);
          setReadyForDisplay(true);
          // videoRef.current.playAsync();
        }}
        posterSource={{
          uri: "https://image.mux.com/KfaKKN1rwKfW5SHYjlBLd5Qgvl102qf2YW9haG9MhAco/thumbnail.png?time=5",
        }}
      />
      <View style={styles.buttons}>
        {!readyForDisplay && <Button onPress={loadVideo} title="Load video" />}
        {readyForDisplay && (
          <Button onPress={() => videoRef.current.playAsync()} title="Play" />
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
