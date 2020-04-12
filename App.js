/* eslint-disable no-sparse-arrays */
import React, {useState} from 'react';

import {
  View,
  Image,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';

import User from './components/User';

import {users} from './user';

const {width} = Dimensions.get('window');

export default function AnimatedUser() {
  const [userSelected, setUserSelected] = useState(null);
  const [userInfoVisible, setUserInfoVisible] = useState(false);

  const scrollOffset = new Animated.Value(0);
  const listProgress = new Animated.Value(0);

  const selectUser = (user) => {
    Animated.timing(listProgress, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setUserInfoVisible(true));

    setUserSelected(user);
  };

  function renderDetail() {
    return (
      <View>
        <User user={userSelected} onPress={() => {}} />
      </View>
    );
  }

  function renderList() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateX: listProgress.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, width],
                }),
              },
            ],
          },
          ,
        ]}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: scrollOffset},
              },
            },
          ])}>
          {users.map((user) => (
            <User key={user.id} user={user} onPress={() => selectUser(user)} />
          ))}
        </ScrollView>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View
        style={[
          styles.header,
          {
            height: scrollOffset.interpolate({
              inputRange: [0, 150],
              outputRange: [200, 50],
              extrapolate: 'clamp',
            }),
          },
        ]}>
        <Image
          style={styles.headerImage}
          source={userSelected ? {uri: userSelected.thumbnail} : null}
        />

        <Animated.Text
          style={[
            styles.headerText,
            {
              fontSize: scrollOffset.interpolate({
                inputRange: [120, 140],
                outputRange: [20, 16],
              }),
            },
          ]}>
          {userSelected ? userSelected.name : 'GoNative'}
        </Animated.Text>
      </Animated.View>
      {userInfoVisible ? renderDetail() : renderList()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingHorizontal: 15,
    backgroundColor: '#2E93E5',
  },

  headerImage: {
    ...StyleSheet.absoluteFillObject,
  },

  headerText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFF',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    bottom: 20,
  },
});
