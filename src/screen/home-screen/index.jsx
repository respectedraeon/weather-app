


import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import {useNavigation} from "@react-navigation/native"
import { AppStyle, FontStyle } from '../../style'
import moment from 'moment'
import Gap from '../../components/gap'
import { AppTheme } from '../../style/theme'
import { RouteName } from '../../routes'
import {  WEATHER_API_KEY } from '../../config'
import { LocationContext } from '../../location-context'

const useQuery = (location) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState(null)

    const refetch = async() => {
        try {
            setLoading(true)
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?q=${location}&key=${WEATHER_API_KEY}`)
            const data = await response.json()
            setData(data)
            setLoading(false)
            return data
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    useEffect(() => {
        refetch()
    }, [location])

    return {
        loading,
        error,
        data
    }
}

const HomeScreen = () => {

    const {location} = useContext(LocationContext)
    const query = useQuery(location)
    const navigation = useNavigation()

    const today = useMemo(() => moment().format("dddd, MMMM DD"), [])
    const currentTemperature = useMemo(() => moment().format("dddd, MMMM YY"), [query.data])
    

    const onChangeLocation = () => {
        navigation.navigate(RouteName.SEARCH_SCREEN)
    }

    return (
        <View style={styles.root}>
            <View>
                <Text style={[FontStyle.display, styles.date]}>{today}</Text>
                <Text style={[FontStyle.display, styles.locationText]}>{location}</Text>
                <TouchableOpacity onPress={onChangeLocation} activeOpacity={0.6} hitSlop={20}>
                    <Text style={[FontStyle.body, styles.changeText]}>change</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.temperatureRoot}>
                <Text style={[FontStyle.displayLarge, styles.temperature]}>{parseInt(query.data?.current?.feelslike_c ?? 1) ?? 1}°</Text>
            </View>
            <ForecastCard />
        </View>
    )
}

const ForecastCard = () => {

    const navigation = useNavigation()

    const onPress = () => {
        navigation.navigate(RouteName.FORECAST_SCREEN)
    }

    return(
        <TouchableOpacity 
            onPress={onPress}
            style={styles.forecastRoot} 
            activeOpacity={0.7}>
            <Text style={[FontStyle.body, styles.forecastText]}>See weather forecast</Text>
        </TouchableOpacity>
    )
}

const RecentTemperatureCard = () => {

    const renderItem = props => {
        return(
            <View>
                <Text>24</Text>
            </View>
        )
    }

    return(
        <FlatList
            data={[1,2,3,4]}
            renderItem={renderItem} />
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    root : {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    date : {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center"
    },
    locationText : {
        fontSize: 24,
        fontWeight: "900",
        textAlign: "center"
    },
    changeText : {
        fontSize: 12,
        fontWeight: "400",
        textAlign: "center",
        color: "rgba(0, 72, 128, 0.8)"
    },
    temperatureRoot : {
        minHeight: 200,
    },
    temperature : {
        textAlign: "center"
    },
    forecastRoot : {
        paddingHorizontal: AppTheme.spacing.container,
        paddingVertical: AppTheme.spacing.container/2,
        borderWidth: 2,
        borderColor: "rgba(0, 72, 128, 0.4)",
        borderRadius: 10,
        marginHorizontal: AppTheme.spacing.container
    },
    forecastText : {
        color: "rgba(0, 72, 128, 1)",
        textAlign: "center"
    }
})