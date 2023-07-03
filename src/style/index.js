
import { StyleSheet } from "react-native"
import { AppTheme } from "./theme"


export const AppStyle = StyleSheet.create({
    flex : {
        flex: 1
    },
    flexRow : {
        flex : 1,
        flexDirection: "row"
    },
    flexRowCenterY : {
        flex : 1,
        flexDirection: "row",
        alignItems: "center"
    }
})


export const FontStyle = StyleSheet.create({
    display : {
        fontSize: 28,
        includeFontPadding: false,
        color: AppTheme.colors.text,
        fontWeight: "900"
    },
    displayLarge : {
        fontSize: 84,
        includeFontPadding: false,
        color: AppTheme.colors.text,
        fontWeight: "900"
    },
    body : {
        fontSize: 18,
        fontWeight: "500",
        color: AppTheme.colors.text,
        includeFontPadding: false,
    }
})