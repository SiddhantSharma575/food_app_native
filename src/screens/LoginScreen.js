import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { btn1, colors, hr80, titles } from "../globals/style"
import AntDesign from "react-native-vector-icons/AntDesign"
import OctIcons from "react-native-vector-icons/Octicons"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome5"
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore"


const LoginScreen = ({ navigation }) => {
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [customError, setCustomError] = useState("");


    const handleLogin = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log("Logged In Sucessfully !!!")
                navigation.navigate("Welcome")
            }).catch((error) => {

                if (error.code === 'auth/invalid-email') {
                    setCustomError('That email address is invalid!');
                } else {
                    setCustomError("Incorrect Email or Password")
                }

                console.error(error);
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.head1}>Sign In</Text>
            {customError !== "" && <Text style={styles.errormsg}>{customError}</Text>}
            <View style={styles.inputout}>
                <AntDesign name="user" size={24} color={emailFocus === true ? colors.text1 : colors.text2} />
                <TextInput
                    style={styles.input}
                    placeholder="Email..."
                    onFocus={() => {
                        setEmailFocus(true);
                        setPasswordFocus(false)
                        setShowPassword(false)
                    }} onChangeText={setEmail} />
            </View>
            <View style={styles.inputout}>
                <MaterialIcon name="lock-outline" size={24} color={passwordFocus === true ? colors.text1 : colors.text2} />
                <TextInput
                    style={styles.input}
                    placeholder="Password..."
                    onFocus={() => {
                        setEmailFocus(false);
                        setPasswordFocus(true)
                    }}
                    secureTextEntry={showPassword === false ? true : false}
                    onChangeText={setPassword}
                />

                <View style={{ marginRight: -20 }}>
                    <OctIcons
                        name={showPassword === false ? "eye-closed" : "eye"}
                        size={24}
                        color="black"
                        onPress={() => setShowPassword(!showPassword)}
                    />
                </View>
            </View>
            <TouchableOpacity style={btn1} onPress={() => handleLogin()}>
                <Text style={{ color: colors.col1, fontSize: titles.btnText, fontWeight: "bold" }}>
                    Sign In
                </Text>
            </TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
            <Text style={styles.or}>OR</Text>
            <Text style={styles.gftxt}>Sign In With</Text>

            <View style={styles.gf}>
                <TouchableOpacity>
                    <View style={styles.gficon}>
                        <AntDesign name="google" size={24} color="#EA4335" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.gficon}>
                        <FontAwesome name="facebook-f" size={24} color="#EA4335" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={hr80} />
            <Text >
                Don't have an account?
                <Text style={styles.signup} onPress={() => navigation.navigate("Signup")}> Sign Up</Text>
            </Text>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    head1: {
        fontSize: titles.title1,
        color: colors.text1,
        textAlign: "center",
        marginVertical: 10
    },
    inputout: {
        flexDirection: "row",
        width: "80%",
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 20,
        alignItems: "center"
    },
    input: {
        fontSize: 18,
        marginLeft: 10,
        width: "80%",
    },
    forgot: {
        color: colors.text2,
        marginTop: 20,
        marginBottom: 10
    },
    or: {
        color: colors.text1,
        marginVertical: 10,
        fontWeight: 'bold'
    },
    gftxt: {
        color: colors.text2,
        marginVertical: 10,
        fontSize: 25
    },
    gf: {
        flexDirection: "row"
    },
    gficon: {
        backgroundColor: "white",
        width: 50,
        margin: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        elevation: 20
    },
    signup: {
        color: colors.text1
    },
    errormsg: {
        color: "red",
        fontSize: 18,
        textAlign: "center",
        marginTop: 10,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    }
})