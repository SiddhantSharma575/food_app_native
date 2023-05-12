import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FontListO from "react-native-vector-icons/Fontisto"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome5"
import { colors } from '../globals/style'

const HomeHeadNav = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <FontListO name="nav-icon-list-a" size={24} color="black" style={styles.myicon} />
            <View style={styles.containerin}>
                <Text style={styles.mytext}>Foodie</Text>
                <MaterialIcon name="food-outline" size={26} color="black" style={styles.myicon} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
                <FontAwesome name="user-circle" size={26} color="black" style={styles.myicon} />
            </TouchableOpacity>
        </View>
    )
}

export default HomeHeadNav

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
        backgroundColor: colors.col1,
        elevation: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    containerin: {
        flexDirection: "row",
        alignItems: "center",
    },
    myicon: {
        color: colors.text1
    },
    mytext: {
        color: colors.text1,
        fontSize: 24
    }
})