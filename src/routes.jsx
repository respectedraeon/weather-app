




import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/home-screen';
import ForecastScreen from './screen/forecast-screen';
import SearchScreen from './screen/search';


const Stack = createStackNavigator();

export const RouteName = {
    HOME_SCREEN : "/home",
    FORECAST_SCREEN : "/forecast",
    SEARCH_SCREEN : "/search",
}

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={RouteName.HOME_SCREEN} component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name={RouteName.FORECAST_SCREEN} component={ForecastScreen} options={{headerShown: false}} />
      <Stack.Screen name={RouteName.SEARCH_SCREEN} component={SearchScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})