import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import logo from "../../assets/logoFood.png"
import { colors, hr80 } from "../globals/style"
import auth from '@react-native-firebase/auth';

const WelcomeScreen = ({ navigation }) => {
    const [userLogged, setUserLogged] = useState(null);
    useEffect(() => {
        const checkLogin = () => {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    setUserLogged(user);
                } else {
                    setUserLogged(null)
                }
            })
        }
        checkLogin()
    }, [])

    const handleLogOut = () => {
        auth().signOut().then(() => {
            setUserLogged(null);
            console.log("User Signed Out")
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome To Foodie</Text>
            <View style={styles.logoout}>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={hr80} />
            <Text style={styles.text}>
                Find the best food around you at lowest price.
            </Text>
            <View style={hr80} />
            {
                userLogged === null ? <View style={styles.btnOut}>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.btn}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.btn}>Log In</Text>
                    </TouchableOpacity>
                </View> : <View style={styles.logged}>
                    <Text style={styles.txtLog}>Signed in as <Text style={styles.txtLogIn}>{userLogged.email}</Text></Text>
                    <View style={styles.btnOut}>
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <Text style={styles.btn}>Go to Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleLogOut()}>
                            <Text style={styles.btn}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ff4242",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 50,
        color: colors.col1,
        textAlign: "center",
        marginVertical: 10,
        fontWeight: "200"
    },
    logoout: {
        width: "80%",
        height: "30%",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        justifyContent: "center"
    },
    logo: {
        width: "100%",
        height: "100%",
    },
    text: {
        fontSize: 18,
        width: "80%",
        color: colors.col1,
        textAlign: "center"
    },
    btnOut: {
        flexDirection: "row"
    },
    btn: {
        fontSize: 20,
        color: colors.text1,
        textAlign: "center",
        marginVertical: 30,
        marginHorizontal: 10,
        fontWeight: "700",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20
    },
    logged: {
        alignItems: "center"
    },
    txtLog: {
        fontSize: 16,
        color: colors.col1
    },
    txtLogIn: {
        fontSize: 18,
        color: colors.col1,
        fontWeight: "700",
        textDecorationStyle: "solid",
        textDecorationLine: "underline"
    }
})