import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';

export default function AppAki() {
  const navigation = useNavigation();
  function handlePress() {
    navigation.navigate('HamburgerAki');
  }
  return (
    <View style={styles.appBar}>

      <Text style={styles.jikanwa}>秋</Text>

      <Text style={styles.jikanwari}>時間割</Text>

      <TouchableOpacity style={styles.hambur}>
        <Octicons
          style={styles.hamburger}
          size={50}
          name="three-bars"
          color="#000"
          onPress={handlePress}
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  hambur: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '31%',
  },
  jikanwari: {
    color: '#000',
    fontSize: 35,
    textAlign: 'center',
    width: '31%',
  },
  jikanwa: {
    fontSize: 35,
    textAlign: 'left',
    width: '31%',
    color: '#ea5506',
  },
  kara: {
    width: '31%',
  },
});
