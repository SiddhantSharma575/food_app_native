import { StatusBar, ScrollView, StyleSheet, Text, TextInput, View, FlatList, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors } from '../globals/style'

import firestore from "@react-native-firebase/firestore"
import CardSlider from '../components/CardSlider'
import BottomNav from '../components/BottomNav'

const HomeScreen = ({ navigation }) => {
    const [foodData, setFoodData] = useState([]);
    const [vegData, setVegData] = useState([]);
    const [nonvegData, setNonVegData] = useState([]);
    const [search, setSearch] = useState("")
    const foodRef = firestore().collection("FoodData")

    useEffect(() => {
        foodRef.onSnapshot((snapshot) => {
            setFoodData(snapshot.docs.map(doc => doc.data()));
        })
    }, [])

    useEffect(() => {
        setVegData(foodData.filter((item) => item.foodType === "veg"))
        setNonVegData(foodData.filter((item) => item.foodType === "non-veg"))
    }, [foodData])

    // console.log(foodData)
    // console.log(vegData)


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <HomeHeadNav navigation={navigation} />
            <View style={styles.bottomnav}>
                <BottomNav navigation={navigation} />
            </View>
            <ScrollView>
                <View style={styles.searchBox}>
                    <AntDesign name="search1" size={24} color="black" style={styles.searchIcon} />
                    <TextInput style={styles.input} placeholder='search' onChangeText={(text) => {
                        setSearch(text)
                    }} />
                </View>
                {search !== "" &&
                    <View style={styles.searchResultOuter}>
                        <FlatList
                            style={styles.searchResultInner}
                            data={foodData}
                            renderItem={({ item }) => {
                                if (item.foodName.toLowerCase().includes(search.toLowerCase())) {
                                    return (
                                        <View style={styles.searchResult}>
                                            <AntDesign name="arrowright" size={24} color="black" />
                                            <Text style={styles.searchResultText}>{item.foodName}</Text>
                                        </View>
                                    )
                                }
                            }}
                        />
                    </View>}
                <Categories />
                <OfferSlider />
                <CardSlider title={"Today's Special"} data={foodData} navigation={navigation} />
                <CardSlider title={"Veg Love"} data={vegData} navigation={navigation} />
                <CardSlider title={"Non Veg Love"} data={nonvegData} navigation={navigation} />
            </ScrollView>
        </View>

    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.col1,
        alignItems: "center",
        width: "100%"
    },
    searchBox: {
        flexDirection: "row",
        width: "90%",
        backgroundColor: colors.col1,
        borderRadius: 30,
        alignItems: "center",
        padding: 10,
        margin: 20,
        elevation: 10
    },
    input: {
        marginLeft: 10,
        width: "90%",
        fontSize: 18,
        color: colors.text1
    },
    searchIcon: {
        color: colors.text1
    },
    searchResultOuter: {
        width: "100%",
        marginHorizontal: 30,
        height: "100%",
        backgroundColor: colors.col1
    },
    searchResultInner: {
        width: "100%"
    },
    searchResult: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        padding: 5
    },
    searchResultText: {
        marginLeft: 10,
        fontSize: 18,
        color: colors.text1
    },
    bottomnav: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: colors.col1,
        zIndex: 20
    }
})