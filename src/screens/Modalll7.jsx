// eslint-disable-next-line
// import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  LogBox,
} from 'react-native';
import {
  Form, Item, Input, Label, Icon,
} from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { number, string, shape } from 'prop-types';
import firebase from 'firebase';

import { kokusaijouhou } from '../../kokusaijouhou.json';

export default function Modalll7(props) {
  const {
    navigation,
    route,
  } = props;
  const {
    index,
    bodyText,
  } = route.params;
  const [ref, setRef] = useState();
  const [body, setBody] = useState(bodyText);
  const [subje, setSubje] = useState([]);
  const [listData, setlistData] = useState(subje);
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log(route.params.aki === 100);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    if (route.params.aki === 100) {
      const reff = db.collection(`users/${currentUser.uid}/memos`);
      setRef(reff);
    } else {
      const reff = db.collection(`users/${currentUser.uid}/meemos`);
      setRef(reff);
    }
    const ar = [];
    for (let v = 0; v < kokusaijouhou.length; v++) {
      if (index === kokusaijouhou[v].subjectId[0] || index === kokusaijouhou[v].subjectId[1]) {
        ar.push({
          subject: kokusaijouhou[v].subject,
          teacher: kokusaijouhou[v].teacher,
          term: kokusaijouhou[v].term,
        });
      }
    }
    setSubje(ar);
    if (body.length > 0) {
      setBody(bodyText);
    }
    if (listData.length === 0 || listData.length > 0) {
      setlistData(ar);
    }
  }, [isFocused]);
  /* eslint-disable */
  const searchSubjects = (body) => {
    let lista = subje.filter((item) => {
      return item.subject.indexOf(body) > -1 || item.teacher.indexOf(body) > -1;
    });
    setlistData(lista);
    setBody(body);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.modal}>

          <View style={styles.search}>
            <View
              style={styles.appbar}
            >
              <View style={styles.leftbar}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <AntDesign style={styles.arrow} name="arrowleft" size={24} />
                  <Text style={styles.backmessage}>戻る</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Form style={styles.searchInput}>
              <Item floatingLabel>
                <Label style={styles.jugyoumei}>授業名または教員名で検索</Label>
                <Icon style={styles.megane} active name="search" />
                <Input
                  value={body}
                  onChangeText={searchSubjects}
                  style={{ color: '#000' }}
                />
              </Item>
            </Form>
          </View>

          <View>
            <FlatList
              data={listData}
              keyExtractor={(item, inde) => inde.toString()}
              renderItem={({ item }) => (
                <View
                  style={styles.memoListItem}
                >

                  <View style={styles.subject}>
                    <View
                      style={styles.subjectbottom}
                    >
                      <Text
                        style={styles.memoListItemTitle}
                        numberOfLines={1}
                      >
                        {item.subject}
                      </Text>
                      <View style={styles.memoleftbottom}>
                        <Text
                          style={styles.memoListItemTitle}
                          numberOfLines={1}
                        >
                          {item.teacher}
                        </Text>
                        <Text
                          style={styles.memoListItemTitle}
                          numberOfLines={1}
                        >
                          {item.term}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.touroku}>
                      <TouchableOpacity
                        style={styles.tbutton}
                        onPress={() => {
                          if (currentUser) {
                            ref.add({
                              bodyText: item.subject,
                              index,
                              teacher: item.teacher,
                              term: item.term,
                            })
                              .then(() => {
                                navigation.goBack();
                              })
                              .catch((error) => {
                                console.log('Error', error);
                              });
                          }
                        }}
                      >
                        <Text style={styles.ttext}>+ 登録</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>
              )}
              nestedScrollEnabled />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

Modalll7.propTypes = {
  route: shape({
    params: shape({
      bodyText: string,
      index: number,
      id: number,
    }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appbar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },
  leftbar: {
    width: '23%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 50,
    color: '#000',
  },
  backmessage: {
    color: '#000',
    textAlign: 'center',
  },
  search: {
    marginTop: 100,
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  titleText: {
    marginTop: 0,
    fontSize: 20,
    fontWeight: "300",
  },
  searchInput: {
    marginTop: 5,
    marginBottom: 30,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: 300,
    borderColor: "#000",
    paddingHorizontal: 20,
  },
  jugyoumei: {
    color: '#000',
    opacity: 0.8,
  },
  megane: {
    color: '#000',
  },
  memoListItem: {
    height: '80%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 75,
    marginHorizontal: 20,
    marginTop: 5,
  },
  subject: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#000',
    borderLeftWidth: 4,
  },
  subjectbottom: {
    width: '50%',
  },
  memoleftbottom: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '70%',
  },
  memoInner: {
    flex: 1,
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
    color: '#000',
    fontWeight: 'bold',
  },
  touroku: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
  },
  tbutton: {
    borderColor: '#000',
    borderWidth: 2,
    padding: 15,
  },
  ttext: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});
