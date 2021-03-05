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
    TouchableOpacity,
} from 'react-native';


const Register = ({ navigation }) => {

    const [getFName, setFName] = useState('');
    const [getLName, setLName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getMobile, setMobile] = useState('');
    const [getPassword, setPassword] = useState('');


    const validateBody = async () => {
        if (getFName === "") {
            alert("First name cannot be empty")
        } else if (getLName === "") {
            alert("Last name cannot be empty")
        } else if (getEmail === "") {
            alert("email cannot be empty")
        } else if (getMobile === "") {
            alert("Mobile cannot be empty")
        } else if (getPassword === "") {
            alert("Password cannot be empty")
        } else {
            var dictParameter = JSON.stringify([{
                "languageID": "1",
                "userFirstName": getFName,
                "userLastName": getLName,
                "userEmail": getEmail,
                "userCountryCode": "+91",
                "userMobile": getMobile,
                "userPassword": getPassword,
                "userProfilePicture": "qwerty",
                "userDeviceType": "Android",
                "userDeviceID": "xyz",
                "apiType": "Android",
                "apiVersion": "1.0"
            }])
            return fetch('http://34.205.194.138/backend/web/index.php/v1/users/user-registration', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }, console.log('users/user-registration', dictParameter
                )),

                body: 'json=' + dictParameter
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('response', JSON.stringify(responseJson))
                    alert(responseJson[0].message)
                    navigation.navigate("Login")
                })
        }
    }

    return (
        <>
            <SafeAreaView style={{ margin: 10 }}>
                <ScrollView>
                    <Text>First Name*</Text>
                    <TextInput placeholder={"Enter first name"} onChangeText={(text) => { setFName(text) }}
                        style={{ padding: 10, borderWidth: 0.8, borderRadius: 5, marginBottom: 10 }} />

                    <Text>Last Name*</Text>
                    <TextInput placeholder={"Enter last name"} onChangeText={(text) => { setLName(text) }}
                        style={{ padding: 10, borderWidth: 0.8, borderRadius: 5, marginBottom: 10 }} />

                    <Text>Email*</Text>
                    <TextInput placeholder={"Enter email"} onChangeText={(text) => { setEmail(text) }}
                        style={{ padding: 10, borderWidth: 0.8, borderRadius: 5, marginBottom: 10 }} />

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

                    <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                        <Text style={{ margin: 25, fontSize: 18, width: '100%', textAlign: 'center' }}>Login</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({

});

export default Register;
