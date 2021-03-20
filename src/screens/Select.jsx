import React from 'react';
import {
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import firebase from 'firebase';

import SelectBar from '../components/SelectBar';

export default function Select(props) {
  const { navigation } = props;
  const gakubu = [
    { bodyText: '法学部', id: 0, key: 'hou' },
    { bodyText: '経済学部', id: 1, key: 'kei' },
    { bodyText: '商学部', id: 2, key: 'shou' },
    { bodyText: '総合政策学部', id: 3, key: 'sou' },
    { bodyText: '国際経営学部', id: 4, key: 'kokusa' },
    { bodyText: '文学部', id: 5, key: 'bunn' },
    { bodyText: '国際情報学部', id: 6, key: 'kokusai' },
  ];

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => {
          const { currentUser } = firebase.auth();
          const db = firebase.firestore();
          const reff = db.collection(`users/${currentUser.uid}/jugyou`);
          if (currentUser) {
            reff.add({
              id: item.id,
            })
              .then((docRef) => {
                console.loglog('creatd', docRef.id);
              })
              .catch(() => {
              });
            navigation.navigate('ホーム');
          }
        }}
      >
        <View style={styles.memoInner}>
          <Text
            style={styles.memoListItemTitle}
            numberOfLines={1}
          >
            {item.bodyText}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.Jugyou}>
      <View>
        <SelectBar>
          <Text>学部を選択</Text>
        </SelectBar>
        <FlatList
          data={gakubu}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Jugyou: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  memoListItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  memoInner: {
    flex: 1,
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
  memoDelete: {
    padding: 8,
  },
});
