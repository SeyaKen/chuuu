import { func, string, shape } from 'prop-types';
// funcは関数という意味
import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

export default function Button(props) {
  const { label, style, onPress } = props;
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={onPress}
      >
        <Text
          style={[styles.buttonInner, style]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

Button.propTypes = {
  label: string.isRequired,
  style: shape(),
  onPress: func,
};

Button.defaultProps = {
  style: null,
  onPress: null,
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    borderColor: '#1c2f57',
    borderWidth: 1,
    width: 170,
    height: 60,
    borderRadius: 40,
    alignItems: 'center',
    padding: 10,
    position: 'relative',
    justifyContent: 'center',
  },
  buttonInner: {
    color: '#1c2f57',
    fontSize: 17,
    position: 'absolute',
  },
});
