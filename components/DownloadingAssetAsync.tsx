import React, { useState, useEffect } from "react";
import { AVPlaybackStatus, Video } from "expo-av";
import { Button, StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";

export default function DownloadingAssetAsync() {
  const videoUri =
    "https://stream.mux.com/KfaKKN1rwKfW5SHYjlBLd5Qgvl102qf2YW9haG9MhAco.m3u8";
  const [readyForDisplay, setReadyForDisplay] = useState(false);
  const [asset, setAsset]: Asset = useState();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef: React.MutableRefObject<Video | null> = React.useRef(null);
  const source = { uri: videoUri };
  const vv = new Video({});
  vv.loadAsync(source);

  useEffect(() => {
    console.log("loading...");
    Asset.fromURI(
      "https://stream.mux.com/KfaKKN1rwKfW5SHYjlBLd5Qgvl102qf2YW9haG9MhAco.m3u8"
    )
      .downloadAsync()
      .then((receivedAsset) => {
        setVideoLoaded(true);
        console.log("loaded", receivedAsset);
        setAsset(receivedAsset);
      })
      .catch((error) => console.error(error));
  }, []);

  // const loadVideo = async () => {
  //   // const { sound } = await Video.loadAsync({ uri: videoUri }, {}, false);
  //   const avPlaybackStatus = await videoRef.current?.loadAsync(
  //     source,
  //     {},
  //     true
  //   );

  //   console.log("avPlaybackStatus ===>", avPlaybackStatus);
  // };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={asset}
        onLoad={(data) => {
          console.log("🚀 onLoad", data);
          // videoRef.current?.playAsync();
        }}
        onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
          console.log("onPlaybackStatusUpdate", status);
        }}
        onReadyForDisplay={(data) => {
          console.log("🚀 onReadyForDisplay", data);
          setReadyForDisplay(true);
          // videoRef.current?.playAsync();
        }}
        posterSource={{
          uri: "https://image.mux.com/KfaKKN1rwKfW5SHYjlBLd5Qgvl102qf2YW9haG9MhAco/thumbnail.png?time=5",
        }}
      />
      <View style={styles.buttons}>
        {/* {!readyForDisplay && <Button onPress={loadVideo} title="Load video" />} */}
        {readyForDisplay && (
          <Button onPress={() => videoRef.current?.playAsync()} title="Play" />
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
