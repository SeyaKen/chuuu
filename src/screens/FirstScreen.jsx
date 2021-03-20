import { func, shape } from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';

import Button from '../components/Button';

const image = require("../../assets/splash.png");

export default function FirstScreen(props) {
  const { navigation } = props;
  return (
    <View style={styles.component}>
      <ImageBackground source={image} style={styles.image}>
        {/* eslint-disable-next-line */}
        <View style={styles.simplecomponent}>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerButton}>
            <Button
              label="新規登録"
              style={styles.ButtonIner}
              onPress={() => { navigation.navigate('SignUp'); }}
            />
            <Button
              label="ログイン"
              onPress={() => { navigation.navigate('LogIn'); }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

FirstScreen.propTypes = {
  navigation: shape({
    navigate: func,
  }).isRequired,
};

const styles = StyleSheet.create({
  component: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  simplecomponent: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  simple: {
    color: '#000',
    fontSize: 60,
  },
  simpleeComponetn: {
    flexDirection: 'row',
  },
  simplee: {
    color: '#ed1b24',
    fontSize: 60,
  },
  footer: {
    alignItems: 'center',
    width: '100%',
    height: '40%',
    marginTop: 20,
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 0.5,
    shadowOpacity: 0.3,
    zIndex: 1,
    elevation: 1,
  },
  ButtonIner: {
    color: '#fff',
    backgroundColor: '#000',
    borderColor: '#000',
  },
});
