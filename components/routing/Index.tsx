import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RouterProps} from './type';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../../views/HomeScreen';

const Stack = createNativeStackNavigator();

export const Router: React.FC<RouterProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
