import React, { useState, useEffect } from 'react';
// useEffectはその画面を映した瞬間に処理を実行できる。
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import firebase from 'firebase';

import Loading from '../components/Loading';
import Button from '../components/Button';
import translateErrors from '../utils';

export default function LogInScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(true);
  // emailは保持したい値setEmailは関数

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('ホーム');
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);
  // 第二引数に[]を指定することで、「一回だけ」処理を実行できる

  function handlePress() {
    setLoading(true);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        console.log(user.email);
        navigation.reset({
          index: 0,
          routes: [{ name: 'ホーム' }],
        });
      })
      .catch((error) => {
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      })
      .then(() => {
        setLoading(false);
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <Loading isLoading={isLoading} />
      <View style={styles.appbar}>
        <Text style={styles.logIn}>
          ログイン
        </Text>
      </View>

      <View style={styles.inner}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => { setEmail(text); }}
          placeholder="メールアドレス"
          placeholderTextColor="#000"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          placeholder="パスワード"
          placeholderTextColor="#000"
          secureTextEntry
          value={password}
          onChangeText={(text) => { setPassword(text); }}
          autoCapitalize="none"
          textContentType="password"
        />

        <Button
          label="ログイン"
          style={styles.buttonInner}
          onPress={handlePress}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            まだ登録していませんか?
          </Text>
          <TouchableOpacity
            style={styles.footerTouch}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignUp' }],
                // 画面遷移を履歴を残さずにできる
              });
            }}
          >

            <Text style={styles.footerTouchable}>
              新規登録
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  appbar: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 3,
  },
  inner: {
    backgroundColor: '#fff',
    paddingHorizontal: 27,
    paddingVertical: 23,
    flex: 1,
    marginTop: 0,
    alignItems: 'flex-start',
  },
  logIn: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    borderBottomWidth: 2,
    width: '100%',
    height: 35,
    borderColor: '#ddd',
    marginTop: 30,
    fontSize: 16,
    color: '#000',
  },
  ex: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  exTouchable: {
    paddingLeft: 5,
    textDecorationLine: 'underline',
  },
  exTouchablee: {
    paddingLeft: 5,
    paddingRight: 5,
    textDecorationLine: 'underline',
  },
  buttonInner: {
    color: '#000',
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  footerTouch: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  footerText: {
    color: '#000',
  },
  footerTouchable: {
    color: '#000',
    textDecorationLine: 'underline',
  },
});
