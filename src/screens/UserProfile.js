import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { colors, navbtn, navbtnOut, navbtnin } from "../globals/style.js"
import AntDesign from "react-native-vector-icons/AntDesign"


const UserProfile = ({ navigation }) => {
    const [userLoggedUid, setUserLoggedUid] = useState(null);
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        const checkLogin = () => {
            auth().onAuthStateChanged((user) => {
                if (user) {

                    setUserLoggedUid(user.uid)
                } else {
                    setUserLogged(null)
                    // navigation.navigate("Login");
                }
            })
        }
        checkLogin()
    }, [])

    // console.log(userLogged)
    useEffect(() => {
        const getUserData = async () => {
            const docRef = await firestore().collection("Users").where(
                "uid", "==", userLoggedUid
            );
            const doc = await docRef.get();
            if (!doc.empty) {
                doc.forEach((dc) => {
                    setUserData(dc.data())
                })
            }
        }
        getUserData();
    }, [userLoggedUid])


    return (
        <View style={styles.containerOut}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={navbtnOut}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} style={navbtnin} />
                </View>
            </TouchableOpacity>

            <View style={styles.container}>
                <Text style={styles.head1}>Your Profile</Text>
                <View style={styles.containerin}>
                    <Text style={styles.head2}>
                        Name : {
                            userData ? <Text style={styles.head2in} >{userData.name}</Text> : "Loading"
                        }
                    </Text>
                    <Text style={styles.head2}>
                        Email : {
                            userData ? <Text style={styles.head2in} >{userData.email}</Text> : "Loading"
                        }
                    </Text>
                    <Text style={styles.head2}>
                        Phone : {
                            userData ? <Text style={styles.head2in} >{userData.phone}</Text> : "Loading"
                        }
                    </Text>
                    <Text style={styles.head2}>
                        Address : {
                            userData ? <Text style={styles.head2in} >{userData.address}</Text> : "Loading"
                        }
                    </Text>

                </View>
            </View>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    containerOut: {
        flex: 1,
        backgroundColor: "#fff",
        width: "100%"
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        width: "100%"
    },
    head1: {
        fontSize: 40,
        fontWeight: "200",
        marginVertical: 20,
        color: colors.text1
    },
    containerin: {
        width: "90%",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.text1,
        borderRadius: 10,
        padding: 20,
        marginTop: 20
    },
    head2: {
        fontSize: 20,
        fontWeight: "200",
        marginTop: 20
    },
    head2in: {
        fontSize: 20,
        fontWeight: "300"
    }
})