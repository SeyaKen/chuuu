import React from 'react';
import { StyleSheet, Alert, View } from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button';

export default function Logout() {
  const navigation = useNavigation();
  // reactHooksは直下に置かなきゃダメ
  function handlePress() {
    firebase.auth().signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'First' }],
        });
      })
      .catch(() => {
        Alert.alert('ログアウトに失敗しました');
      });
  }
  return (
    <View style={styles.button}>
      <Button
        onPress={handlePress}
        label="ログアウト"
        style={styles.buttonn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonn: {
    borderColor: '#000',
    color: '#000',
  },
});
