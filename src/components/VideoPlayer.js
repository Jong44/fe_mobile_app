import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({
    videoUri
}) => {

  if (!videoUri) {
    return <View style={styles.container}>
        <Text
            style={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 80,
                fontSize: 16,
                fontWeight: 'bold',
            }}
        >Video not found</Text>
    </View>
  }
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUri }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
        onError={(e) => console.error('Video error:', e)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
    borderRadius: 10,

  },
  video: {
    width: '100%',
    height: 200,
  },
});


export default VideoPlayer