import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';
import image from '../../assets/image.jpeg';

export async function setupPlayer() {
  let setUp = false;

  try {
    await TrackPlayer.getActiveTrack();
    setUp = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
        Capability.Skip,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
      progressUpdateEventInterval: 1,
    });
    setUp = true;
  } finally {
    return setUp;
  }
}

export async function addTrack() {
  await TrackPlayer.add([
    {
      id: '1',
      url: 'https://sample-music.netlify.app/death%20bed.mp3',
      artwork: image,
      title: 'Make a cup of coffe',
      artist: 'Powfu',
      duration: 40,
    },
    {
      id: '1',
      url: 'https://sample-music.netlify.app/death%20bed.mp3',
      artwork: image,
      title: 'Make a cup of coffe',
      artist: 'Powfu',
      duration: 40,
    },
  ]);
}
