import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {PropsWithChildren} from 'react';
import TrackPlayer from 'react-native-track-player';

type CardPropsType = PropsWithChildren<{
  title: string;
  image: ImageSourcePropType;
  artist: string;
  index: number;
  handleClose: () => void;
}>;

const ListCard = ({
  title,
  image,
  artist,
  index,
  handleClose,
}: CardPropsType) => {
  const handlePress = () => {
    async function setNewSong() {
      await TrackPlayer.skip(index);
    }
    setNewSong();
    handleClose();
  };
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image
        source={image}
        style={{aspectRatio: 1 / 1, height: '90%', borderRadius: 10}}
      />
      <View>
        <Text style={{color: 'white'}}>{title}</Text>
        <Text style={{color: 'white'}}>{artist}</Text>
      </View>
    </Pressable>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    flexDirection: 'row',
    columnGap: 20,
    height: 70,
    marginTop: 10,
  },
});
