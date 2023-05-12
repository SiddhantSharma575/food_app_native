import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import IonIcons from "react-native-vector-icons/Ionicons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { colors } from '../globals/style'

const BottomNav = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.btnCon1}>
                <AntDesign name="home" size={30} color="black" style={styles.icon1} onPress={() => navigation.navigate("Home")} />
            </View>
            <View style={styles.btnCon2}>
                <IonIcons name="search" size={40} color="black" style={styles.icon2} onPress={() => navigation.navigate("Home")} />
            </View>
            <View style={styles.btnCon1}>
                <AntDesign name="shoppingcart" size={30} color="black" style={styles.icon1} onPress={() => navigation.navigate("Cart")} />
            </View>
            <View style={styles.btnCon1}>
                <FontAwesome5
                    name="map-marked-alt" size={30} color="black" style={styles.icon1} onPress={() => navigation.navigate("Home")} />
            </View>
        </View>
    )
}

export default BottomNav

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
        backgroundColor: "white",
        width: "100%",
        elevation: 30,
        borderTopColor: colors.text1,
        borderTopWidth: 0.5,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20
    },
    icon1: {
        color: colors.text1
    },
    icon2: {
        color: "white"
    },
    btnCon2: {
        alignItems: "center",
        justifyContent: "center",
        position: 'relative',
        top: -15,
        backgroundColor: colors.text1,
        width: 60,
        height: 60,
        borderRadius: 60
    }
})