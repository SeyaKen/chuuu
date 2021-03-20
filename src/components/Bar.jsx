import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function Bar() {
  const navigation = useNavigation();
  return (
    <View style={styles.appBar}>

      <TouchableOpacity
        style={styles.hambur}
        onPress={() => navigation.goBack()}
      >
        <AntDesign style={styles.arrow} name="arrowleft" size={24} />
      </TouchableOpacity>
      <Text style={styles.jikanwari}>プライバシーポリシー</Text>
      {/* eslint-disable-next-line */}
      <View style={styles.kara}></View>

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
    alignItems: 'flex-start',
    width: '20%',
  },
  arrow: {
    fontSize: 50,
    color: '#000',
  },
  jikanwari: {
    color: '#000',
    fontSize: 17,
    textAlign: 'center',
    width: '50%',
  },
  kara: {
    width: '20%',
  },
});
