/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  SafeAreaView,
} from 'react-native';


const Stack = createStackNavigator();

import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/Register';
import Login from './src/Login';
import Home from './src/Home';
const App = () => {

  return (

    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Register" options={{ headerShown: false, }} component={Register} />
        <Stack.Screen name="Login" options={{ headerShown: false, }} component={Login} />
        <Stack.Screen name="Home" options={{ headerShown: false, }} component={Home} />

      </Stack.Navigator>
    </NavigationContainer>

  );
};


export default App;
