


import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useState, useMemo, useEffect, useContext } from 'react'
import moment from "moment"
import { WEATHER_API_KEY } from '../../config'
import { FontStyle } from '../../style'
import { AppTheme } from '../../style/theme'
import Gap from '../../components/gap'
import { FlatList } from 'react-native-gesture-handler'
import { LocationContext } from '../../location-context'


const useQuery = (location) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState(null)

    const refetch = async () => {
        try {
            setLoading(true)
            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?q=${location}&key=${WEATHER_API_KEY}&days=5&tp=360`)
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
    }, [])

    return {
        loading,
        error,
        data
    }
}


const ForecastScreen = () => {

    const {location} = useContext(LocationContext)
    const query = useQuery(location)

    const forecast = useMemo(() => {
        return query.data?.forecast?.forecastday ?? []
    }, [query.data])

    const HeaderComponent = () => {
        return(
            <View>
                <Gap m6 />
                <Gap m5 />
                <View>
                    <Text style={[FontStyle.display, { fontSize: 24 }]}>Weather Forecast</Text>
                    <Text style={[FontStyle.body, { fontSize: 16, color: AppTheme.colors.textLight }]}>{location}</Text>
                </View>
                <Gap m4 />
            </View>
        )
    }

    const EmptyComponent = () => {
        return(
            <View>
                {
                    query.loading ?
                    (<ActivityIndicator size={28} color={AppTheme.colors.text} />) :
                    (<Text style={[FontStyle.body, {textAlign: "center"}]}>No results</Text>)
                }
            </View>
        )
    }

    const renderItem = props => <ForecastCard {...props} />

    return (
        <View style={{ flex: 1, marginHorizontal: AppTheme.spacing.container }}>
            <FlatList
                data={forecast ?? []}
                ListHeaderComponent={HeaderComponent}
                ListEmptyComponent={EmptyComponent}
                renderItem={renderItem} />
        </View>
    )
}


const ForecastCard = ({ item }) => {
    const hours = useMemo(() => {
        return item.hour?.filter((hr, index) => index % 5 == 1)
    }, [])
    console.log("item", hours);
    return (
        <View style={styles.forecastCardRoot}>
            <Text style={[FontStyle.body, { fontSize: 13 }]}>{moment(item.date).format("MMMM DD")}</Text>
            <Gap m3 />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View>
                    <Text style={[FontStyle.display, { fontSize: 20, textAlign: "center" }]}>{parseInt(hours[0].feelslike_c)}°</Text>
                    <Text style={[FontStyle.body, { fontSize: 10 }]}>{moment(hours[0].time).format("h:mm A")}</Text>
                </View>
                <View>
                    <Text style={[FontStyle.display, { fontSize: 20, textAlign: "center" }]}>{parseInt(hours[1].feelslike_c)}°</Text>
                    <Text style={[FontStyle.body, { fontSize: 10 }]}>{moment(hours[1].time).format("h:mm A")}</Text>
                </View>
                <View>
                    <Text style={[FontStyle.display, { fontSize: 20, textAlign: "center" }]}>{parseInt(hours[2].feelslike_c)}°</Text>
                    <Text style={[FontStyle.body, { fontSize: 10 }]}>{moment(hours[2].time).format("h:mm A")}</Text>
                </View>
                <View>
                    <Text style={[FontStyle.display, { fontSize: 20, textAlign: "center" }]}>{parseInt(hours[3].feelslike_c)}°</Text>
                    <Text style={[FontStyle.body, { fontSize: 10 }]}>{moment(hours[3].time).format("h:mm A")}</Text>
                </View>
            </View>
        </View>
    )
}

export default ForecastScreen

const styles = StyleSheet.create({
    forecastCardRoot: {
        backgroundColor: "#d0dcf5",
        flexDirection: "column",
        paddingHorizontal: AppTheme.spacing.container,
        paddingVertical: 14,
        marginBottom: 20,
        borderRadius: 16
    },
    forecastCardRootChild: {

    }
})