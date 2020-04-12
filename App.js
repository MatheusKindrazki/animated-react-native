/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Animated, StyleSheet} from 'react-native';

export default function AnimatedCourse() {
  const ballY = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(ballY, {
        toValue: 300,
        duration: 1000,
      }),
    ]).start();
  }, []);

  return (
    <View style={style.container}>
      <Animated.View
        style={[
          style.ball,
          {
            top: ballY,
            opacity: ballY.interpolate({
              inputRange: [0, 300],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          },
        ]}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    padding: 50,
  },

  ball: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
  },
});
