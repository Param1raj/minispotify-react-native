import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';
import {useProgress} from 'react-native-track-player';
const ProgressBar = () => {
  const progress = useProgress();
  const [percentage, setPercentage] = useState(0.01);
  useEffect(() => {
    const newPercentage = (progress.position / progress.duration).toFixed(2);

    if (!isNaN(parseFloat(newPercentage))) {
      console.log(newPercentage, 'new percentage');
      setPercentage(parseFloat(newPercentage));
    }
    console.log(percentage.toFixed(2), 'precentage');
  }, [progress]);
  return <Progress.Bar progress={percentage} width={200} color="white" />;
};

export default ProgressBar;

const styles = StyleSheet.create({});
