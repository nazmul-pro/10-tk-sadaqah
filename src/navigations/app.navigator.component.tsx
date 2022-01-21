// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {HomeScreen} from '../screens/home.screen.component';
// import {DetailsScreen} from '../screens/details.screen.component';

// const {Navigator, Screen} = createStackNavigator();

// const HomeNavigator = () => (
//   <Navigator headerMode="none">
//     <Screen name="Home" component={HomeScreen} />
//     <Screen name="Details" component={DetailsScreen} />
//   </Navigator>
// );

// export const AppNavigator = () => (
//   <NavigationContainer>
//     <HomeNavigator />
//   </NavigationContainer>
// );
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import { HomeScreen } from '../screens/home.screen.component';
import { DonateScreen } from '../screens/donate/donate.screen.component';
import { ShareScreen } from '../screens/share/share.screen.component';
import { EmailIcon } from '../core/icons.component';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Share' icon={EmailIcon}/>
    <BottomNavigationTab title='Donate' icon={EmailIcon}/>
    <BottomNavigationTab title='Home' icon={EmailIcon}/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator screenOptions={{headerShown:false}} tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Share' component={ShareScreen}/>
    <Screen name='Donate' component={DonateScreen}/>
    <Screen name='Home' component={HomeScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator/>
  </NavigationContainer>
);