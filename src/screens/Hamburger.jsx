import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

export default function Hamburger() {
  const navigation = useNavigation();

  const openSupport = () => {
    Linking.openURL(
      "https://docs.google.com/forms/d/e/1FAIpQLSdV5tKO4BV0nnA2bNoRTIadM11HrC-jXSmdch7sITvTj9Bq0g/viewform",
      // eslint-disable-next-line
    ).then((supported) => {
      if (!supported) {
        console.log(
          // eslint-disable-next-line
          "無効なURLです: " + "https://docs.google.com/forms/d/e/1FAIpQLSdV5tKO4BV0nnA2bNoRTIadM11HrC-jXSmdch7sITvTj9Bq0g/viewform",
        );
      } else {
        return Linking.openURL(
          "https://docs.google.com/forms/d/e/1FAIpQLSdV5tKO4BV0nnA2bNoRTIadM11HrC-jXSmdch7sITvTj9Bq0g/viewform",
        );
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.minicontainer}>
        <Feather style={styles.cross} name="x" size={40} color="#000" />
        <TouchableOpacity
          style={styles.topTouchable}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.text}>ホーム</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            navigation.navigate('JugyouAki');
          }}
        >
          <Text style={styles.text}>学期を切り替える</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            navigation.navigate('ログアウト');
          }}
        >
          <Text style={styles.text}>ログアウト</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Privacypolicyy')}
        >
          <Text style={styles.text}>プライバシーポリシー</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchable}
          onPress={() => (navigation.navigate('Privacypolicy'))}
        >
          <Text style={styles.text}>利用規約</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchable}
          onPress={openSupport}
        >
          <Text style={styles.text}>お問い合わせ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
  },
  minicontainer: {
    padding: 20,
    height: '70%',
    justifyContent: 'space-between',
  },
  topTouchable: {
    borderLeftColor: '#000',
    borderLeftWidth: 4,
    height: '13%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cross: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  touchable: {
    borderLeftColor: '#000',
    borderLeftWidth: 4,
    height: '13%',
    justifyContent: 'center',
  },
  text: {
    paddingLeft: 10,
    color: '#000',
    fontWeight: '700',
    fontSize: 20,
    justifyContent: 'center',
  },
});
