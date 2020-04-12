/* eslint-disable no-sparse-arrays */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Animated, StyleSheet, PanResponder} from 'react-native';

export default function AnimatedCourse() {
  let ball = new Animated.ValueXY({x: 0, y: 0});

  const panResp = PanResponder.create({
    onMoveShouldSetPanResponder: (e, gestureState) => true,

    onPanResponderGrant: (e, gestureState) => {
      ball.setOffset({
        x: ball.x._value,
        y: ball.y._value,
      });

      ball.setValue({x: 0, y: 0});
    },

    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: ball.x,
          dy: ball.y,
        },
      ],
      {
        listener: (e, gestureState) => {
          console.log(gestureState);
        },
      },
    ),

    // Reseta o offset da bola
    onPanResponderRelease: () => {
      ball.flattenOffset();
    },
  });

  return (
    <View style={style.container}>
      {/* panHandlers é utilizado para passar as propriedades de gestos para o Animated View */}
      <Animated.View
        {...panResp.panHandlers}
        style={[
          style.ball,
          {
            transform: [{translateX: ball.x}, {translateY: ball.y}],
          },
          ,
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
