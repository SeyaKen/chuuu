// ホームスクリーン
import React, {
  useEffect,
  useState,
} from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
// import { shape, number } from 'prop-types';
import firebase from 'firebase';

import AppAki from '../components/AppAki';

const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;

export default function JugyouAki(props) {
  const { navigation } = props;
  // mamosにはfirebaseの情報
  // memosには配列の情報
  const [fire, setFire] = useState([]);
  const aki = 100;
  const [Kara, setKara] = useState([]);
  const memos = [
    {
      index: 0, bodytex: "", id: "", teacher: "",
    },
    {
      index: 1, bodytex: "", id: "", teacher: "",
    },
    {
      index: 2, bodytex: "", id: "", teacher: "",
    },
    {
      index: 3, bodytex: "", id: "", teacher: "",
    },
    {
      index: 4, bodytex: "", id: "", teacher: "",
    },
    {
      index: 5, bodytex: "", id: "", teacher: "",
    },
    {
      index: 6, bodytex: "", id: "", teacher: "",
    },
    {
      index: 7, bodytex: "", id: "", teacher: "",
    },
    {
      index: 8, bodytex: "", id: "", teacher: "",
    },
    {
      index: 9, bodytex: "", id: "", teacher: "",
    },
    {
      index: 10, bodytex: "", id: "", teacher: "",
    },
    {
      index: 11, bodytex: "", id: "", teacher: "",
    },
    {
      index: 12, bodytex: "", id: "", teacher: "",
    },
    {
      index: 13, bodytex: "", id: "", teacher: "",
    },
    {
      index: 14, bodytex: "", id: "", teacher: "",
    },
    {
      index: 15, bodytex: "", id: "", teacher: "",
    },
    {
      index: 16, bodytex: "", id: "", teacher: "",
    },
    {
      index: 17, bodytex: "", id: "", teacher: "",
    },
    {
      index: 18, bodytex: "", id: "", teacher: "",
    },
    {
      index: 19, bodytex: "", id: "", teacher: "",
    },
    {
      index: 20, bodytex: "", id: "", teacher: "",
    },
    {
      index: 21, bodytex: "", id: "", teacher: "",
    },
    {
      index: 22, bodytex: "", id: "", teacher: "",
    },
    {
      index: 23, bodytex: "", id: "", teacher: "",
    },
    {
      index: 24, bodytex: "", id: "", teacher: "",
    },
    {
      index: 25, bodytex: "", id: "", teacher: "",
    },
    {
      index: 26, bodytex: "", id: "", teacher: "",
    },
    {
      index: 27, bodytex: "", id: "", teacher: "",
    },
    {
      index: 28, bodytex: "", id: "", teacher: "",
    },
    {
      index: 29, bodytex: "", id: "", teacher: "",
    },
    {
      index: 30, bodytex: "", id: "", teacher: "",
    },
    {
      index: 31, bodytex: "", id: "", teacher: "",
    },
    {
      index: 32, bodytex: "", id: "", teacher: "",
    },
    {
      index: 33, bodytex: "", id: "", teacher: "",
    },
    {
      index: 34, bodytex: "", id: "", teacher: "",
    },
    {
      index: 35, bodytex: "", id: "", teacher: "",
    },
  ];

  // 時間割表の左上の空白
  const blank = [{ name: '', key: "blank" }];

  // 曜日の表示
  const period = [
    { name: '月', key: "mon" },
    { name: '火', key: "tue" },
    { name: '水', key: "wed" },
    { name: '木', key: "thu" },
    { name: '金', key: "fri" },
    { name: '土', key: "sat" },
  ];

  // 時間の表示
  const time = [
    { name: '1', key: "one" },
    { name: '2', key: "two" },
    { name: '3', key: "three" },
    { name: '4', key: "four" },
    { name: '5', key: "five" },
    { name: '6', key: "six" },
  ];

  const { currentUser } = firebase.auth();
  const db = firebase.firestore();
  const ref = db.collection(`users/${currentUser.uid}/memos`);
  const reff = db.collection(`users/${currentUser.uid}/jugyou`);
  const isFocused = useIsFocused();

  useEffect(() => {
    let unsub = () => {};
    const kara = [];
    if (currentUser) {
      unsub = reff.onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (currentUser) {
            kara.push({
              id: data.id,
            });
          }
        });
        setKara(kara);
      });
    }
    return unsub;
  }, [isFocused]);

  useEffect(() => {
    const userMemos = [];
    let unsubscribe = () => {};
    if (currentUser) {
      unsubscribe = ref.onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (currentUser) {
            userMemos.push({
              id: doc.id,
              bodyText: data.bodyText,
              index: data.index,
              teacher: data.teacher,
              term: data.term,
            });
          }
        });
        userMemos.sort((a, b) => {
          if (a.index > b.index) {
            return 1;
          } else {
            return -1;
          }
        });
        const fir = [];
        for (let i = 0; i < 36; i++) {
          if (userMemos[i]) {
            const inde = userMemos[i].index;
            memos[inde].bodytex = userMemos[i].bodyText;
            memos[inde].id = userMemos[i].id;
            memos[inde].teacher = userMemos[i].teacher;
            memos[inde].term = userMemos[i].term;
            if (memos[i].bodytex.length === 0) {
              memos[i].bodytex = "";
            }
          } else if (memos[i].bodytex.length === 0) {
            memos[i].bodytex = "";
          } else {
          }
          fir.push({
            bodyText: memos[i].bodytex,
            index: i,
            id: memos[i].id,
            teacher: memos[i].teacher,
            term: memos[i].term,
          });
        }
        setFire(fir);
      });
    }
    return unsubscribe;
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.Jugyou}>
      <AppAki />
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <FlatList
              data={blank}
              numColumns={1}
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.blank}>{item.name}</Text>
                </View>
              )}
            />
          </View>
          <View>
            <FlatList
              data={period}
              numColumns={1}
              horizontal
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.period}>{item.name}</Text>
                </View>
              )}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <FlatList
              data={time}
              numColumns={1}
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.time}>{item.name}</Text>
                </View>
              )}
            />
          </View>

          <View style={styles.centeredView}>

            <FlatList
              data={fire}
              numColumns={6}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.table}
                  onPress={() => {
                    if (item.bodyText.length === 0) {
                      const jug = [
                        'Modalll1',
                        'Modalll2',
                        'Modalll3',
                        'Modalll4',
                        'Modalll5',
                        'Modalll6',
                        'Modalll7',
                      ];
                      for (let ju = 0; ju < jug.length; ju++) {
                        if (Kara[0].id === ju) {
                          navigation.navigate(jug[ju], {
                            // 授業を作る画面
                            bodyText: item.bodyText,
                            index: item.index,
                            teacher: item.teacher,
                            id: Kara[0].id,
                            aki,
                          });
                        }
                      }
                    } else if (item.bodyText.length !== 0) {
                      // 授業を消す画面
                      navigation.navigate('Modall', {
                        bodyText: item.bodyText,
                        id: item.id,
                        index: item.index,
                        teacher: item.teacher,
                        term: item.term,
                        aki,
                      });
                    }
                  }}
                >
                  <Text
                    style={styles.text}
                    numberOfLines={4}
                    ellipsizeMode="tail"
                  >
                    {item.bodyText}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// JugyouAkiƒ.propTypes = {
//   route: shape({
//     params: shape({ iid: number }),
//   }).isRequired,
// };

const styles = StyleSheet.create({
  Jugyou: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    paddingLeft: 4,
    paddingRight: 5,
    marginTop: 4,
  },
  blank: {
    width: 13,
    margin: 1,
  },
  period: {
    margin: 1,
    textAlign: 'center',
    width: ITEM_WIDTH / 6.6,
    color: '#000',
    fontWeight: 'bold',
    borderColor: '#000',
    borderWidth: 2,
  },
  time: {
    borderColor: '#000',
    borderWidth: 2,
    width: 13,
    margin: 1,
    textAlign: 'center',
    lineHeight: ITEM_HEIGHT / 8.3,
    height: ITEM_HEIGHT / 8.3,
    color: '#000',
    fontWeight: 'bold',
  },
  table: {
    margin: 1,
    borderColor: '#000',
    borderWidth: 2,
    width: ITEM_WIDTH / 6.6,
    height: ITEM_HEIGHT / 8.3,
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
  },
});
