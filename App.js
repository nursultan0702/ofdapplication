import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Profile from './app/components/profile';
import HomeScreen from './app/components';

 

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: Profile,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}