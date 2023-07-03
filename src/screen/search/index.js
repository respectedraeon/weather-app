



import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import {useNavigation} from "@react-navigation/native"
import OctIcon from "react-native-vector-icons/Octicons"
import { AppTheme } from '../../style/theme'
import Gap from '../../components/gap'
import { FontStyle } from '../../style'
import { WEATHER_API_KEY } from '../../config'
import { LocationContext } from '../../location-context'
import { RouteName } from '../../routes'



const useQuery = (searchQuery) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState(null)

    const refetch = async (query) => {
        try {
            setLoading(true)
            const response = await fetch(`http://api.weatherapi.com/v1/search.json?q=${query ?? searchQuery}&key=${WEATHER_API_KEY}`)
            const data = await response.json()
            console.log("loc", data);
            setData(data)
            setLoading(false)
            return data
        } catch (error) {
            console.log("Hello", error);
            setLoading(false)
            setError(error)
        }
    }

    useEffect(() => {
        if(searchQuery?.length >= 3){
            refetch()
        }
    }, [])

    return {
        loading,
        error,
        data,
        refetch
    }
}

const SearchScreen = () => {

    const inputRef = useRef(null)

    const query = useQuery()

    const HeaderComponent = useCallback(() => {
        const [searchQuery, setSearchQuery] = useState()

        useEffect(() => {
            if(searchQuery?.length >= 3) query.refetch(searchQuery)
        }, [searchQuery])

        useEffect(() => {
            inputRef.current?.focus()
        }, [])

        return(
            <View>
                <Gap m6 />
                <View style={{borderWidth: 1.4, backgroundColor: "rgba(0, 72, 128, 0.1)", margin: AppTheme.spacing.container, flexDirection: "row", alignItems: "center", borderRadius: 8, paddingHorizontal: AppTheme.spacing.container/2, borderColor: "rgba(0, 72, 128, 0.2)"}}>
                    <TextInput
                        ref={inputRef}
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        placeholder='Search "City'
                        placeholderTextColor={"rgba(0,0,0,0.5)"}
                        style={{color: AppTheme.colors.text, flex: 1}} />
                    <TouchableOpacity onPress={() => query.refetch(searchQuery)}>
                        <OctIcon name="search" size={24} color="rgba(0, 72, 128, 1)" style={{marginRight: 8}} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }, [])

    const renderItem = props => <LocationCard {...props} />

    return (
        <View>
            <FlatList
                data={query.data}
                extraData={query.data}
                keyboardShouldPersistTaps="always"
                ListHeaderComponent={HeaderComponent}
                renderItem={renderItem} />
        </View>
    )
}


const LocationCard = ({item, index}) => {
    const navigation = useNavigation()
    const {setLocation} = useContext(LocationContext)
    const onApply = () => {
        setLocation(item.name)
        Keyboard.dismiss()
        navigation.navigate(RouteName.HOME_SCREEN)
    }
    return(
        <View style={{height: 48, alignItems: "center", flexDirection: "row", paddingHorizontal: AppTheme.spacing.container, backgroundColor: index % 2 ? "transparent" : "rgba(0,0,0,0.03)"}}>
            <Text style={[FontStyle.body, {fontSize: 16, flex: 1}]}>{item.name}</Text>
            <TouchableOpacity onPress={onApply} hitSlop={10}>
                <Text style={[FontStyle.body, {fontSize: 12, color: "blue", }]}>Set</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({})