

import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { AppStyle } from './src/style'
import { NavigationContainer } from '@react-navigation/native'
import Router from './src/routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import LocationProvider from './src/location-context'

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
		<StatusBar translucent backgroundColor={"transparent"} barStyle={"dark-content"} />
		<GestureHandlerRootView style={AppStyle.flex}>
			<LocationProvider>
				<NavigationContainer>
					<Router />
				</NavigationContainer>
			</LocationProvider>
		</GestureHandlerRootView>
	</SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
	root : {
		flex: 1,
		backgroundColor: "#fff"
	}
})