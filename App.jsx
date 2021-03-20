import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
// 上二つは画面を移動させるのに使うからインストール
import firebase from 'firebase';

import FirstScreen from './src/screens/FirstScreen';
import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import JugyouScreen from './src/screens/JugyouScreen';
import JugyouAki from './src/screens/JugyouAki';
import Logout from './src/screens/Logout';
import Modall from './src/screens/Modall';
import Modalll1 from './src/screens/Modalll1';
import Modalll2 from './src/screens/Modalll2';
import Modalll3 from './src/screens/Modalll3';
import Modalll4 from './src/screens/Modalll4';
import Modalll5 from './src/screens/Modalll5';
import Modalll6 from './src/screens/Modalll6';
import Modalll7 from './src/screens/Modalll7';
import Hamburger from './src/screens/Hamburger';
import HamburgerAki from './src/screens/HamburgerAki';
import Privacy from './src/screens/Privacy';
import Privacypolicyy from './src/screens/Privacypolicyy';
import Select from './src/screens/Select';

import { firebaseConfig } from './env';

require('firebase/firestore');

const Stack = createStackNavigator();

if (firebase.apps.length === 0) {
  // firebase.apps.lengthは既に初期化されているアプリの数
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="First"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="First"
          component={FirstScreen}
        />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="ホーム"
          component={JugyouScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="JugyouAki"
          component={JugyouAki}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="ログアウト"
          component={Logout}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Modall"
          component={Modall}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Modalll1"
          component={Modalll1}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Modalll2"
          component={Modalll2}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Modalll3"
          component={Modalll3}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Modalll4"
          component={Modalll4}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Modalll5"
          component={Modalll5}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Modalll6"
          component={Modalll6}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Modalll7"
          component={Modalll7}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Hamburger"
          component={Hamburger}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="HamburgerAki"
          component={HamburgerAki}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Privacypolicy"
          component={Privacy}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Privacypolicyy"
          component={Privacypolicyy}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Select"
          component={Select}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
