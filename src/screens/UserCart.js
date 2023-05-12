import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import AntDesign from "react-native-vector-icons/AntDesign"
import style, { btn2, colors, navbtn, navbtnin, navbtnout } from '../globals/style'
import BottomNav from '../components/BottomNav'

const UserCart = ({ navigation }) => {
    const [cardData, setCartData] = useState([]);
    const [totalCost, setTotalCost] = useState("0")
    const getCartData = async () => {
        const docRef = await firestore().collection("UserCart").doc(auth().currentUser.uid)
        docRef.get().then((doc) => {
            if (doc.exists) {
                const data = JSON.stringify(doc.data());
                setCartData(JSON.parse(data))
            } else {
                console.log("No Such Document")
            }
        }).catch((error) => {
            console.log(error.message)
        })
    }

    useEffect(() => {
        getCartData()
    }, [])

    useEffect(() => {
        if (cardData !== null) {
            const food = cardData.cart;
            let totalFoodPrice = 0;
            food !== undefined && food.map((item) => (
                totalFoodPrice += (item.foodPrice * item.foodQuantity) +
                (item.foodAddonPrice * item.addOnQuantity)
            ))
            setTotalCost(totalFoodPrice);
        }
        // console.log(cardData.cart)
    }, [cardData])

    console.log(cardData)

    const deleteItem = async (item) => {
        const docRef = await firestore().collection("UserCart").doc(auth().currentUser.uid);
        docRef.update({
            cart: firestore.FieldValue.arrayRemove(item)
        })
        getCartData()
    }
    return (
        <View style={styles.containerout}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={navbtnout}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} style={navbtnin} />
                </View>
            </TouchableOpacity>
            <View style={styles.bottomnav}>
                <BottomNav navigation={navigation} />
            </View>
            <View style={styles.container}>
                <Text style={styles.head1}>Your Cart</Text>
                {
                    cardData === null ? <Text style={styles.head2}>Your Cart is Empty</Text>
                        : <FlatList
                            data={cardData.cart}
                            renderItem={({ item }) => (
                                <View style={styles.cartcard}>
                                    <Image
                                        source={{
                                            uri: item.foodImageUrl
                                        }}
                                        style={styles.cartimg}
                                    />
                                    <View style={styles.cartcardin}>
                                        <View style={styles.c1}>
                                            <Text style={styles.txt1}>{item.foodQuantity} {item.foodName}</Text>
                                            <Text style={styles.txt2}>₹{item.foodPrice} /each</Text>
                                        </View>
                                        {
                                            item.addOnQuantity > 0 && <View style={styles.c2}>
                                                <Text style={styles.txt3}>
                                                    {item.addOnQuantity} {item.foodAddon}
                                                </Text>
                                                <Text style={styles.txt3}>
                                                    ₹{item.foodAddonPrice}
                                                </Text>
                                            </View>
                                        }
                                        <TouchableOpacity onPress={() => deleteItem(item)} >
                                            <View style={styles.c4}>
                                                <Text style={styles.txt1}>Delete</Text>
                                                <AntDesign name="delete" size={24} color="black" style={styles.del} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />

                }
                <View style={styles.btncont}>
                    <View style={styles.c3}>
                        <Text style={styles.txt5}>Total</Text>
                        <Text style={styles.txt6}>₹{totalCost}</Text>
                    </View>
                    <View style={btn2}>
                        <Text style={styles.btntxt} >Place Order</Text>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default UserCart

const styles = StyleSheet.create({
    containerout: {
        flex: 1,
        backgroundColor: colors.col1,
        // alignItems: 'center',
        width: '100%',
        // height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: colors.col1,
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        // height: '100%',
    },
    head1: {
        fontSize: 40,
        textAlign: 'center',
        // fontWeight: '200',
        // marginVertical: 20,
        color: colors.text1,
    },
    head2: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '200',
        marginVertical: 20,
        elevation: 10,
        backgroundColor: colors.col1,
        width: '90%',
        height: '50%',
        alignSelf: 'center',
        paddingVertical: '25%',
        borderRadius: 10,
    },
    cartcard: {
        flexDirection: 'row',
        backgroundColor: colors.col1,
        marginVertical: 5,
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        elevation: 10,
        alignItems: 'center',
    },
    cartimg: {
        width: 150,
        height: 100,
        borderRadius: 10,
    },
    cartcardin: {
        flexDirection: 'column',
        margin: 5,
        width: '58%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: colors.text1,
        padding: 15
    },
    cardlist: {
        width: '100%',
    },
    cartout: {
        flex: 1,
        width: '100%',
    },
    btntxt: {
        backgroundColor: colors.text1,
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',

    },
    btncont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
        marginBottom: 80,
        borderTopColor: colors.text3,
        borderTopWidth: 0.2,
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.col1,
        zIndex: 20,
    },
    c1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: colors.col1,
        borderRadius: 10,
        padding: 5,
    },
    txt1: {
        fontSize: 16,
        color: colors.text1,
        width: '60%',
        fontWeight: 'bold',
    },
    txt2: {
        fontSize: 16,
        color: colors.text3,
        fontWeight: 'bold',
    },
    c2: {
        backgroundColor: colors.text1,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        flexDirection: 'row',
    },
    txt3: {
        fontSize: 15,
        color: colors.col1,
    },
    txt5: {
        fontSize: 20,
        color: colors.text3,
        marginHorizontal: 5,
    },
    txt6: {
        fontSize: 25,
        color: colors.text3,
        marginHorizontal: 5,
        fontWeight: 'bold',
    },
    c3: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    c4: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 10,
        borderColor: colors.text1,
        borderWidth: 1,
        marginVertical: 10,
        padding: 5,
    },
    del: {
        color: colors.text1,
    }
})