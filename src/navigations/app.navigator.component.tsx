import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import { HomeScreen } from '../screens/home.screen.component';
import { DonateScreen } from '../screens/donate/donate.screen.component';
import { ShareScreen } from '../screens/share/share.screen.component';
import { DonateIcon, EmailIcon, ShareIcon, UpdatesIcon } from '../core/icons.component';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Home' icon={UpdatesIcon}/>
    <BottomNavigationTab title='Donate' icon={DonateIcon}/>
    <BottomNavigationTab title='Share' icon={ShareIcon}/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator screenOptions={{headerShown:false}} tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Donate' component={DonateScreen}/>
    <Screen name='Share' component={ShareScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator/>
  </NavigationContainer>
);