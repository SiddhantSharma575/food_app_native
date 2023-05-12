import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, nonveg, veg } from '../globals/style'

const CardSlider = ({ title, data, navigation }) => {
    console.log(title)
    console.log(data)

    const openProductPage = (item) => {
        navigation.navigate("ProductPage", item)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.cardouthead}>{title}</Text>
            <FlatList
                data={data}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity key={item.index} onPress={() => {
                        openProductPage(item)
                    }}>
                        <View style={styles.card}>
                            <View style={styles.s1}>
                                <Image
                                    source={{
                                        uri: item.foodImageUrl
                                    }}
                                    style={styles.cardImagein}
                                />
                            </View>
                            <View style={styles.s2}>
                                <Text style={styles.txt1}>{item.foodName}</Text>
                                <View style={styles.s2in}>
                                    <Text style={styles.txt2}>
                                        Rs. {item.foodPrice}
                                    </Text>
                                    {item.foodType === "veg" ? <Text style={veg}></Text> : <Text style={nonveg}></Text>}
                                </View>
                            </View>
                            <View style={styles.s3}>
                                <Text style={styles.buybtn}>
                                    Buy
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default CardSlider

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    cardouthead: {
        color: colors.text3,
        width: "90%",
        fontSize: 20,
        fontWeight: "200",
        borderRadius: 10,
        marginHorizontal: 10
    },
    card: {
        width: 300,
        height: 300,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e8e8e8",
        backgroundColor: colors.col1
    },
    cardImagein: {
        width: '100%',
        height: 200,
        borderRadius: 10
    },
    s2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    s2in: {
        alignItems: "center",
        marginTop: 5
    },
    txt1: {
        fontSize: 18,
        color: colors.text3,
        marginHorizontal: 5,
        width: 150
    },
    txt2: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10
    },
    s3: {
        position: "absolute",
        alignItems: "center",
        bottom: 1,
        width: "100%",
    },
    buybtn: {
        backgroundColor: colors.text1,
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        textAlign: "center",
        width: "90%"
    }
})