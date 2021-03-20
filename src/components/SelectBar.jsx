import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { string, shape } from 'prop-types';

export default function SelectBar(props) {
  const { children, style } = props;
  return (
    <View style={styles.appBar}>
      {/* eslint-disable-next-line */}
      <View style={styles.hambur}></View>
      <Text style={[styles.jikanwari, style]}>{children}</Text>
      {/* eslint-disable-next-line */}
      <View style={styles.kara}></View>

    </View>
  );
}

SelectBar.propTypes = {
  children: shape({
    children: string,
  }).isRequired,
  style: shape(),
};

SelectBar.defaultProps = {
  style: null,
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
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
    fontSize: 35,
    textAlign: 'center',
    width: '50%',
  },
  kara: {
    width: '20%',
  },
});
