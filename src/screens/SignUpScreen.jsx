import React, { useState } from 'react';
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
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';
import Button from '../components/Button';
import translateErrors from '../utils';

export default function SignUpScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // emailは保持したい値setEmailは関数
  // firebaseに情報を登録
  function handlePress() {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Select');
      })
      .catch((error) => {
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      });
  }
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.appbar}>
        <Text style={styles.logIn}>
          新規登録
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

        <View style={styles.ex}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Privacypolicy');
            }}
          >
            <Text style={styles.exTouchable}>
              利用規約（必読）
            </Text>
          </TouchableOpacity>

          <Text style={styles.exTouchablee}>
            ※新規登録をした場合、利用規約に同意したものとします。
          </Text>
        </View>

        <View style={styles.button}>
          <Button
            label="新規登録"
            style={styles.buttonInner}
            onPress={handlePress}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ログイン画面はこちらです
          </Text>
          <TouchableOpacity
            style={styles.footerTouch}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'LogIn' }],
                // 画面遷移を履歴を残さずにできる
              });
            }}
          >
            <Text style={styles.footerTouchable}>
              <AntDesign
                name="arrowright"
                size={16}
                color="#000"
              />
              ログイン
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
  topex: {
    color: '#000',
  },
  exTouchable: {
    paddingLeft: 5,
    paddingRight: 5,
    textDecorationLine: 'underline',
    color: '#000',
  },
  exTouchablee: {
    paddingLeft: 5,
    paddingRight: 5,
    color: '#000',
  },
  buttonInner: {
    color: '#fff',
    backgroundColor: '#000',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  footerTouch: {
    marginLeft: 10,
    color: '#000',
  },
  footerText: {
    color: '#000',
    fontSize: 14,
    lineHeight: 16,
  },
  footerTouchable: {
    color: '#000',
    textDecorationLine: 'underline',
    fontSize: 14,
    lineHeight: 16,
  },
});
