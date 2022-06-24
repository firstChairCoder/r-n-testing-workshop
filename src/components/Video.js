import React, { useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Video } from "expo-av";

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    alignItems: "center",
    flex: 1,
  },
  sectionContainer: {
    padding: 24,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  button: {
    borderRadius: 12,
    padding: 6,
    margin: 6,
    backgroundColor: "#9e9ef8",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: 100,
    height: 100,
  },
  videoFullScreen: {
    width: "100%",
    height: 300,
    zIndex: 5,
  },
  fullScreenBG: {
    backgroundColor: Colors.black,
    ...StyleSheet.absoluteFillObject,
  },
});

const callbackDefault = "...";

const VideoScreen = () => {
  const video = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [status, setStatus] = useState({});
  const [callback, setCallback] = useState(callbackDefault);

  // let timeoutCallback;

  // const handleCallback = msg => {
  //   setCallback(msg);

  //   clearTimeout(timeoutCallback);
  //   timeoutCallback = setTimeout(() => {
  //     setCallback(callbackDefault);
  //   }, 2000);
  // };

  // const handleFullscreenUpdate = data => {
  //   const { fullscreenUpdate, status } = data;

  //   // FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS
  //   if (fullscreenUpdate === 2) {
  //     handleCallback("fullscreen WILL close");
  //   }

  //   // FULLSCREEN_UPDATE_PLAYER_DID_DISMISS
  //   if (fullscreenUpdate === 3) {
  //     handleCallback("fullscreen DID close");
  //   }
  // };

  return (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          testID="full-screen"
          style={styles.button}
          disabled={isFullScreen}
          onPress={() => setIsFullScreen(!isFullScreen)}
        >
          <Text>Full screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="pause"
          style={styles.button}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        >
          <Text>Pause/Start</Text>
        </TouchableOpacity>
      </View>
      <>
        <Video
          ref={video}
          accessibilityLabel={"video component"}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          style={isFullScreen ? styles.videoFullScreen : styles.video}
          resizeMode="cover"
          useNativeControls={true}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
          // onFullScreenUpdate={data => handleFullscreenUpdate(data)}
        />
      </>

      {isFullScreen && (
        <View style={styles.fullScreenBG}>
          <StatusBar hidden={true} />
          <TouchableOpacity
            testID="enter-full-screen"
            style={styles.button}
            onPress={() => setIsFullScreen(false)}
          >
            <Text>Exit full screen</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default VideoScreen;
