


import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'



export const LocationContext = React.createContext()

const LocationProvider = (props) => {
    
    const [location, updateLocation] = useState("New York")

    const getLocation = async() => {
        try {
            const location = await AsyncStorage.getItem("location")
            if(location){
                setLocation(location)
            }
        } catch (error) {
            
        }
    }

    const setLocation = async(location) => {
        updateLocation(location)
        try {
            await AsyncStorage.setItem("location", location)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getLocation()
    }, [])

    return(
        <LocationContext.Provider value={{location, setLocation}}>
            {props.children}
        </LocationContext.Provider>
    )
}

export default LocationProvider

const styles = StyleSheet.create({})