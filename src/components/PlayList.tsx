import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TrackPlayer, {Track} from 'react-native-track-player';
import ListCard from './ListCard';

type PlayListPropsType = PropsWithChildren<{
  handleClose: () => void;
  currentTrack: Track | undefined;
}>;
const PlayList = ({handleClose}: PlayListPropsType) => {
  const [queue, setQueue] = useState<Track[]>([]);

  useEffect(() => {
    async function loadQueue() {
      let list = await TrackPlayer.getQueue();
      //   console.log(list, '\n\n\nList\n\n\n');
      setQueue(list);
    }
    loadQueue();
    console.log('Queues loaded', queue);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            borderBottomColor: 'white',
          }}>
          Play List
        </Text>
        <Pressable onPress={handleClose}>
          <Icon
            name="times-circle"
            style={{
              backgroundColor: '#1ED760',
              color: 'white',
              borderRadius: 50,
              fontSize: 20,
            }}
          />
        </Pressable>
      </View>
      <View style={styles.playlistBody}>
        <FlatList
          data={queue}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <ListCard
              key={index}
              title={item.title || ''}
              image={{uri: item.artwork}}
              artist={item.artist || ''}
              index={index}
              handleClose={handleClose}
            />
          )}
        />
      </View>
    </View>
  );
};

export default PlayList;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    borderColor: 'white',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    padding: 2,
  },
  playlistBody: {
    // borderWidth: 1,
    borderColor: 'white',
    // flex: 1,
    height: '96%',
    marginTop: 20,
    rowGap: 10,
  },
});
