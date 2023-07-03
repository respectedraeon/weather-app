




import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Gap = (props = {
    row : null,
    m1 : null,
    m2 : null,
    m3 : null,
    m4 : null
}) => {

    let spacing = 10

    if(props.hasOwnProperty("m1")) spacing = 2
    if(props.hasOwnProperty("m2")) spacing = 4
    if(props.hasOwnProperty("m3")) spacing = 8
    if(props.hasOwnProperty("m4")) spacing = 16
    if(props.hasOwnProperty("m5")) spacing = 24
    if(props.hasOwnProperty("m6")) spacing = 32

    if(props.hasOwnProperty("row")) return <View style={{width: spacing}} />

    return <View style={{height: spacing}} />
}

export default Gap