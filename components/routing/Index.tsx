import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from './type';

import {HomeScreen} from '../../views/HomeScreen';
import {PostDetails} from '../../views/PostDetails';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Router = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomeScreen}
        />
        <RootStack.Screen
          options={{
            headerShown: true,
            title: 'Post details',
          }}
          name="PostDetails"
          component={PostDetails}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
