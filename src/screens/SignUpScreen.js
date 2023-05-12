import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { btn1, colors, hr80, titles } from "../globals/style"
import AntDesign from "react-native-vector-icons/AntDesign"
import OctIcons from "react-native-vector-icons/Octicons"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome5"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"


const SignUpScreen = ({ navigation }) => {
    const [emailFocus, setEmailFocus] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showcPassword, setShowcPassword] = useState(false);
    const [cpasswordFocus, setcPasswordFocus] = useState(false);
    const [customError, setCustomError] = useState("")
    const [successmsg, setSuccessMsg] = useState(null)
    const usersRef = firestore().collection("Users")

    // state for form data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("")

    const handleSignUp = () => {


        if (password !== cpassword) {
            // Alert.alert("Password doesn't match")
            setCustomError("Password Doesn't Match");
            return;
        } else {
            try {
                auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((userCredentials) => {
                        console.log("User Created...")
                        setSuccessMsg('User account created & signed in!');
                        usersRef.add({
                            name: name,
                            email: email,
                            password: password,
                            // cpassword: cpassword,
                            phone: phone,
                            address: address,
                            uid: userCredentials?.user?.uid
                        }).then(() => {
                            console.log("Data Added to Firestore")
                        }).catch((error) => {
                            console.log(error.message)
                        })
                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                            setCustomError('That email address is already in use!');
                        }

                        if (error.code === 'auth/invalid-email') {
                            setCustomError('That email address is invalid!');
                        }

                        console.error(error);
                    });
            } catch (error) {
                Alert.alert(error.message);
            }
        }
    }

    return (
        <ScrollView>
            {
                successmsg === null ? (
                    <SafeAreaView style={styles.container}>
                        <Text style={styles.head1}>Sign Up</Text>
                        {customError !== "" && <Text style={styles.errormsg}>{customError}</Text>}
                        <View style={styles.inputout}>
                            <AntDesign name="user" size={24} color={nameFocus === true ? colors.text1 : colors.text2} />
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                onFocus={() => {
                                    setNameFocus(true)
                                    setPasswordFocus(false)
                                    setEmailFocus(false);
                                    setPasswordFocus(false)
                                    setShowPassword(false)
                                    setCustomError("")
                                }} onChangeText={setName} />
                        </View>
                        <View style={styles.inputout}>
                            <AntDesign name="user" size={24} color={emailFocus === true ? colors.text1 : colors.text2} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email..."
                                onFocus={() => {
                                    setNameFocus(false)
                                    setPasswordFocus(false)
                                    setEmailFocus(true);
                                    setPasswordFocus(false)
                                    setShowPassword(false)
                                    setCustomError("")
                                }}
                                onChangeText={setEmail}
                            />
                        </View>
                        <View style={styles.inputout}>
                            <AntDesign name="phone" size={24} color={phoneFocus === true ? colors.text1 : colors.text2} />
                            <TextInput
                                style={styles.input}
                                placeholder="Phone..."
                                onFocus={() => {
                                    setNameFocus(false)
                                    setPhoneFocus(true)
                                    setEmailFocus(false);
                                    setPasswordFocus(false)
                                    setShowPassword(false)
                                    setCustomError("")
                                }}
                                onChangeText={setPhone} />
                        </View>
                        <View style={styles.inputout}>
                            <MaterialIcon name="lock-outline" size={24} color={passwordFocus === true ? colors.text1 : colors.text2} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password..."
                                onFocus={() => {
                                    setNameFocus(false);
                                    setPhoneFocus(false)
                                    setEmailFocus(false);
                                    setcPasswordFocus(false);
                                    setPasswordFocus(true)
                                    setCustomError("")
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
                        <View style={styles.inputout}>

                            <MaterialIcon name="lock-outline" size={24} color={cpasswordFocus === true ? colors.text1 : colors.text2} />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password..."
                                onFocus={() => {
                                    setPhoneFocus(false)
                                    setEmailFocus(false);
                                    setPasswordFocus(false)
                                    setcPasswordFocus(true)
                                    setCustomError("")
                                }}
                                secureTextEntry={showcPassword === false ? true : false}
                                onChangeText={setCpassword}
                            />

                            <View style={{ marginRight: -20 }}>
                                <OctIcons
                                    name={showPassword === false ? "eye-closed" : "eye"}
                                    size={24}
                                    color="black"
                                    onPress={() => setShowcPassword(!showcPassword)}
                                />
                            </View>
                        </View>

                        <Text style={styles.address}>
                            Please enter your address
                        </Text>
                        <View style={styles.inputout}>
                            <TextInput style={styles.input1} placeholder='Enter your Address' onChangeText={setAddress} />
                        </View>

                        <TouchableOpacity style={btn1} onPress={handleSignUp}>
                            <Text style={{ color: colors.col1, fontSize: titles.btnText, fontWeight: "bold" }}>
                                Sign Up
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
                            Already have an account?
                            <Text style={styles.signup} onPress={() => navigation.navigate("Login")}> Sign In</Text>
                        </Text>
                    </SafeAreaView>
                ) : (
                    <View style={styles.container1}>
                        <Text style={styles.successmsg}>{successmsg}</Text>
                        <TouchableOpacity style={btn1} onPress={() => navigation.navigate("Login")}>
                            <Text style={{ color: colors.col1, fontSize: titles.btnText, fontWeight: "bold" }}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btn1} onPress={() => setSuccessMsg(null)}>
                            <Text style={{ color: colors.col1, fontSize: titles.btnText, fontWeight: "bold" }}>
                                Go Back
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    container1: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        justifyContent: "center"
    },
    successmsg: {
        color: "green",
        fontSize: 18,
        textAlign: "center",
        marginTop: 10,
        borderColor: "red",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
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
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        elevation: 20
    },
    signup: {
        color: colors.text1
    },
    address: {
        fontSize: 18,
        color: colors.text2,
        textAlign: "center",
        marginTop: 20
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