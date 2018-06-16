import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RecreationScreen from '../screens/RecreationScreen';
import VolunteerScreen from '../screens/VolunteerScreen';
import ShopScreen from '../screens/ShopScreen';
import CreateScreen from '../screens/CreateEventScreen';


const RecreationStack = createStackNavigator({
  Recreation: RecreationScreen,
  Create: CreateScreen
});

RecreationStack.navigationOptions = {
  tabBarLabel: 'Recreation',
  tabBarIcon: ({ focused }) => (
    <Icon
      name='mood'
      color={focused ? "#0066cc": "#D3D3D3"}
    />
  ),
};

const VolunteerStack = createStackNavigator({
  Volunteer: VolunteerScreen,
  Create: CreateScreen
});

VolunteerStack.navigationOptions = {
  tabBarLabel: 'Volunteer',
  tabBarIcon: ({ focused }) => (
    <Icon
      name='directions-run'
      color={focused ? "#0066cc": "#D3D3D3"}
    />
  ),
};

const ShopStack = createStackNavigator({
  Shop: ShopScreen,
  Create: CreateScreen
});

ShopStack.navigationOptions = {
  tabBarLabel: 'Shop',
  tabBarIcon: ({ focused }) => (
    <Icon
      name='shopping-basket'
      color={focused ? "#0066cc": "#D3D3D3"}
    />
  ),
};

export default createBottomTabNavigator({
  RecreationStack,
  VolunteerStack,
  ShopStack,
});

