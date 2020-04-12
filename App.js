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
} from 'react-native';

import User from './components/User';

import {users} from './user';

const {width} = Dimensions.get('window');

export default function AnimatedUser() {
  const [userSelected, setUserSelected] = useState(null);
  const [userInfoVisible, setUserInfoVisible] = useState(false);

  function selectUser(user) {
    setUserSelected(user);
    setUserInfoVisible(true);
  }

  function renderDetail() {
    return (
      <View>
        <User user={userSelected} onPress={() => {}} />
      </View>
    );
  }

  function renderList() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {users.map((user) => (
            <User key={user.id} user={user} onPress={() => selectUser(user)} />
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={userSelected ? {uri: userSelected.thumbnail} : null}
        />

        <Text style={styles.headerText}>
          {userSelected ? userSelected.name : 'GoNative'}
        </Text>
      </View>
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
    height: 200,
  },

  headerImage: {
    ...StyleSheet.absoluteFillObject,
  },

  headerText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    bottom: 20,
  },
});
