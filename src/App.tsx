/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Dimensions,
  DrawerLayoutAndroid,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import image from '../assets/image.jpeg';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {addTrack, setupPlayer} from './controlls/music_controll';
import TrackPlayer, {
  Event,
  State,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProgressBar from './components/ProgressBar';
import PlayList from './components/PlayList';

function App(): React.JSX.Element {
  const [play, setPlay] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track>();
  // const [queue, setQueue] = useState<Track[]>([]);
  const [pause, setPause] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handlePress = () => {
    console.log('clicked');
    if (!pause) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
    setPause(!pause);
  };

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    console.log('changed  the track!');
    const currentSong = await TrackPlayer.getActiveTrack();
    setCurrentTrack(currentSong);
    TrackPlayer.pause();
    setPause(false);
  });

  const handleSuffle = async () => {
    const queue = await TrackPlayer.getQueue();
    console.log(queue.length, 'Length of the queue');
    const randomIndex = Math.floor(Math.random() * queue.length);
    await TrackPlayer.skip(randomIndex);
  };

  useEffect(() => {
    async function setUp() {
      const isSetUp = await setupPlayer();
      await addTrack();
      const track = await TrackPlayer.getActiveTrack();
      setCurrentTrack(track);
      setPlay(isSetUp);
    }
    setUp();
  }, []);

  if (!play) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerBackgroundColor={'#0A0C28'}
      drawerPosition="left"
      renderNavigationView={() => (
        <PlayList
          handleClose={() => drawer.current?.closeDrawer()}
          currentTrack={currentTrack}
        />
      )}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={'#0A0C28'}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View style={styles.container}>
            <View
              style={{
                height: 280,
                aspectRatio: 1 / 1,
                borderRadius: 10,
                marginTop: 100,
              }}>
              <Image
                source={{uri: currentTrack?.artwork || image}}
                style={styles.artWork}
              />
            </View>
            <View style={{paddingLeft: 10, alignItems: 'center'}}>
              <Text style={styles.text}>{currentTrack?.title}</Text>
              <Text style={[styles.text, {fontWeight: 'normal', fontSize: 16}]}>
                {currentTrack?.artist}
              </Text>
            </View>

            <View style={{paddingLeft: 10, alignItems: 'center'}}>
              <ProgressBar />
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, {borderWidth: 0}]}
                onPress={() => TrackPlayer.seekBy(-5)}>
                <Icon
                  name="undo"
                  style={{fontSize: 10, color: 'white', fontWeight: 'bold'}}
                />
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => {
                  console.log('Play Previous song!');
                  TrackPlayer.skipToPrevious();
                }}>
                <Icon
                  name="step-backward"
                  style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}
                />
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  {
                    width: 65,
                    height: 65,
                    backgroundColor: '#1ED760',
                    borderWidth: 0,
                  },
                ]}
                onPress={handlePress}>
                <Icon
                  name={!pause ? 'play' : 'pause'}
                  style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}
                />
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => TrackPlayer.skipToNext()}>
                <Icon
                  name="step-forward"
                  style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}
                />
              </Pressable>
              <Pressable
                style={[styles.button, {borderWidth: 0, borderColor: 'none'}]}
                onPress={() => TrackPlayer.seekBy(5)}>
                <Icon
                  name="redo"
                  style={{fontSize: 10, color: 'white', fontWeight: 'bold'}}
                />
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                // borderWidth: 1,
                borderColor: 'white',
                justifyContent: 'space-between',
              }}>
              <Pressable onPress={handleSuffle}>
                <Icon name="random" style={{fontSize: 20, color: 'white'}} />
              </Pressable>
              <Pressable onPress={() => drawer.current?.openDrawer()}>
                <Icon name="list" style={{fontSize: 20, color: 'white'}} />
              </Pressable>
            </View>
          </View>
          {/* </DrawerLayoutAndroid> */}
        </ScrollView>
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: 'white',
    padding: 5,
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    padding: 20,
    alignItems: 'center',
    // justifyContent: 'center',
    rowGap: 30,
    backgroundColor: '#0A0C28',
    // borderWidth: 1,
  },
  artWork: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonContainer: {
    // borderWidth: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default App;
