/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Button,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';


const Login = ({ navigation }) => {

    const [getMobile, setMobile] = useState('');
    const [getPassword, setPassword] = useState('');


    const validateBody = async () => {
        if (getMobile === "") {
            alert("Mobile cannot be empty")
        } else if (getPassword === "") {
            alert("Password cannot be empty")
        } else {
            var dictParameter = JSON.stringify([{
                "userPassword": getPassword,
                "userMobile": getMobile,
                "languageID": "1",
                "userDeviceID": "token",
                "apiType": "Android",
                "apiVersion": "1.0"
            }])
            // console.log(dictParameter)
            return fetch('http://34.205.194.138/backend/web/index.php/v1/users/user-login-password', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),

                body: 'json=' + dictParameter
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('login response', JSON.stringify(responseJson))

                    if (responseJson[0].message === "OTP successfully send.") {
                        navigation.navigate("Home")
                    } else {
                        alert(responseJson[0].message)
                    }
                })
        }
    }

    return (
        <>
            <SafeAreaView style={{ margin: 10 }}>
                <ScrollView>

                    <Text>Mobile Number*</Text>
                    <TextInput maxLength={10} keyboardType="number-pad" placeholder={"Enter mobile"} onChangeText={(text) => { setMobile(text) }}
                        style={{ padding: 10, borderWidth: 0.8, borderRadius: 5, marginBottom: 10 }} />

                    <Text>Password*</Text>
                    <TextInput placeholder={"Enter password"} secureTextEntry={true} onChangeText={(text) => { setPassword(text) }}
                        style={{ padding: 10, borderWidth: 0.8, borderRadius: 5, marginBottom: 18 }} />

                    <Button title="Submit"
                        onPress={() => {
                            validateBody()
                        }} />
                    <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
                        <Text style={{ margin: 25, fontSize: 18, width: '100%', textAlign: 'center' }}>Register</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({

});

export default Login;
