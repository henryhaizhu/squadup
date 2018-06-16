import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RecreationScreen from '../screens/RecreationScreen';
import VolunteerScreen from '../screens/VolunteerScreen';
import ShopScreen from '../screens/ShopScreen';
import CreateScreen from '../screens/CreateEventScreen';

const CreateStack = createStackNavigator({
  Create: {
    screen: CreateScreen
  }
}, {
  
  headerMode: 'none'
})

const RecreationStack = createStackNavigator({
  Recreation: RecreationScreen,
  Create: CreateStack
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
  Create: CreateStack
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
  Create: CreateStack
});

ShopStack.navigationOptions = {
  tabBarLabel: 'Shop',
  tabBarIcon: ({ focused }) => (
    // <TabBarIcon
    //   focused={focused}
    //   name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    // />
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
