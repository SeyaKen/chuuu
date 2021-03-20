import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { string, shape, number } from 'prop-types';
import firebase from 'firebase';

export default function Modall(props) {
  const {
    navigation,
    route,
  } = props;
  const {
    id, 
    bodyText, 
    teacher,
    term,
  } = route.params;
  const [ref, setRef] = useState();
  const [body, setBody] = useState(bodyText);
  const isFocused = useIsFocused();
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();

  useEffect(() => {
    if (route.params.aki === 100) {
      const reff = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      setRef(reff);
    } else {
      const reff = db.collection(`users/${currentUser.uid}/meemos`).doc(id);
      setRef(reff);
    }
    if (body.length > 0) {
      setBody(bodyText);
    }
  }, [isFocused]);

  function deleteMemo() {
    Alert.alert('この授業を削除します。', '本当によろしいですか？', [
      {
        text: 'キャンセル',
        onPress: () => {},
      },
      {
        text: '削除する',
        style: 'destructive',
        // 文字が赤くなる
        onPress: () => {
          ref.delete()
            .then(() => {
              navigation.goBack();
            })
            .catch(() => {
              Alert.alert('削除に失敗しました。');
            });
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modal}>
        <View
          style={styles.appbar}
        >
          <View style={styles.leftbar}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign style={styles.arrow} name="arrowleft" size={24} color="black" />
              <Text style={styles.backmessage}>戻る</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.underapp}>

          <View style={styles.jugyoublock}>
            <Text style={styles.jugyou}>授業</Text>
            <Text style={styles.jugyoumei}>{body}</Text>
          </View>

          <View style={styles.senseiblock}>
            <Text style={styles.sensei}>先生</Text>
            <Text style={styles.senseimei}>{teacher}</Text>
          </View>

          <View style={styles.senseiblock}>
            <Text style={styles.sensei}>曜日</Text>
            <Text style={styles.senseimei}>{term}</Text>
          </View>
        </View>

        <View style={styles.memoDelete}>
          <TouchableOpacity
            style={styles.memobottom}
            onPress={() => { deleteMemo(id); }}
          >
            <FontAwesome5 name="trash-alt" size={35} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.deletemessage}>この授業を消す</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

Modall.propTypes = {
  route: shape({
    params: shape({
      bodyText: string,
      index: number,
      id: string,
      teacher: string,
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
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    alignItems: 'center',
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
  underapp: {
    flex: 1,
    padding: 30,
    alignItems: 'flex-start',
    width: '100%',
  },
  jugyoublock: {
    marginTop: 30,
  },
  jugyou: {
    color: '#000',
    fontSize: 20,
    marginBottom: 15,
  },
  jugyoumei: {
    color: '#000',
    fontSize: 30,
  },
  senseiblock: {
    marginTop: 60,
  },
  sensei: {
    color: '#000',
    fontSize: 20,
    marginBottom: 15,
  },
  senseimei: {
    color: '#000',
    fontSize: 30,
  },
  memoDelete: {
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 40,
    bottom: 50,
  },
  memobottom: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deletemessage: {
    color: '#000',
  },
});
