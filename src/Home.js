/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
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
    Platform,
    FlatList
} from 'react-native';
import { checkMultiple, PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import MapView from 'react-native-maps';

const Home = ({ navigation }) => {

    const [getAddresstitle, setAddresstitle] = useState('');
    const [getLine1, setLine1] = useState('');
    const [getLine2, setLine2] = useState('');
    const [getLandmark, setLandmark] = useState('');
    const [getLat, setLat] = useState(0);
    const [getLong, setLong] = useState(0);
    const [getResultView, setResultView] = useState(
        {
            show: false,
            data: []
        }
    )
    const [mapView, setMapView] = useState(false)

    useEffect(() => {
        alert("Logged in successfully")
        checkPermission()
    }, [])

    const checkPermission = () => {
        if (Platform.OS === "android") {
            checkMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then(
                (statuses) => {
                    if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "denied") {
                        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                            // console.log(result)
                            checkPermission();
                        })
                    } else if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "granted") {
                        // console.log("Permission granted")
                        // Geolocation.getCurrentPosition(info => console.log("locationsss", info));

                        Geolocation.getCurrentPosition(
                            (position) => {
                                // console.log("position", position);
                                var NY = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                };

                                setLat(NY.lat.toString())
                                setLong(NY.lng.toString())
                                Geocoder.geocodePosition(NY).then(res => {
                                    // console.log("Google location res", res)
                                    if (res.length > 0) {
                                        var { subLocality, feature, locality, adminArea, subAdminArea, formattedAddress } = res[0];
                                        setLine1(formattedAddress)
                                        if (subLocality === null) {
                                            subLocality = feature
                                        }
                                        setLine2(locality)
                                        if (locality === null) {
                                            locality = subAdminArea
                                            if (locality === null) {
                                                locality = adminArea

                                            }

                                        }
                                        setLandmark(feature)
                                        if (locality === null && subLocality === null) {
                                            Toast.show("Unable to get city.")
                                        }
                                        console.log(res[0])
                                        // this.setLocation({ township: subLocality === null ? '' : subLocality, city: locality === null ? (position.coords.latitude + ", " + position.coords.longitude) : locality, state: adminArea, latitude: position.coords.latitude, longitude: position.coords.longitude })
                                    } else {
                                        // this.setLocation({ township: '', city: (position.coords.latitude + ", " + position.coords.longitude), state: '', latitude: position.coords.latitude, longitude: position.coords.longitude })
                                    }
                                })
                                    .catch(err => {
                                        // console.log(err)
                                        // this.setLocation({ township: '', city: (position.coords.latitude + ", " + position.coords.longitude), state: '', latitude: position.coords.latitude, longitude: position.coords.longitude })
                                    })

                            },
                            (error) => {
                                // See error code charts below.
                                // alert(error)
                                // Toast.show(this.props.t('toast.wentwrong'))
                                console.log(JSON.stringify(error));
                            },
                            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, forceRequestLocation: true, accuracy: { android: "high", ios: "best" } }
                        );
                    }


                }

            );
        }
    }


    const validateBody = async () => {
        if (getAddresstitle === "") {
            alert("Please enter address title")
        } else {
            var dictParameter = JSON.stringify([{
                "languageID": "1",
                "loginuserID": "1",
                "addressTitle": getAddresstitle,
                "addressAddressLine1": getLine1,
                "addressAddressLine2": getLine2,
                "cityID": "3",
                "stateID": "2",
                "countryID": "1",
                "areaID": "4",
                "addressLandmark": getLandmark,
                "addressType": "Other",
                "addressIsDefault": "No",
                "addressLatitude": getLat,
                "addressLogitude": getLong,
                "apiType": "Android",
                "apiVersion": "1.0"
            }]
            )
            // console.log(dictParameter)
            return fetch('http://34.205.194.138/backend/web/index.php/v1/useraddress/add-address', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),

                body: 'json=' + dictParameter
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('submit response', JSON.stringify(responseJson))
                    // alert(responseJson[0].message)
                    setResultView({
                        show: true,
                        data: responseJson[0].data
                    })
                })
        }
    }

    const renderItem = ({ item }) => (
        <View style={{ margin: 10, borderRadius: 15, backgroundColor: 'white', padding: 8, elevation: 1 }}>
            <Text style={{ fontSize: 20, paddingBottom: 10 }}>{item.addressTitle}</Text>
            <Text>{item.addressAddressLine1}</Text>
            <Text>{item.addressAddressLine2}</Text>
            <Text>{item.addressLandmark}</Text>
        </View>
    );

    return (
        <>
            <SafeAreaView style={{ margin: 10 }}>
                {getResultView.show ? <View>
                    {mapView ?
                        <Text>You don't have Google api key</Text>
                        //  <MapView
                        //     initialRegion={{
                        //         latitude: 37.78825,
                        //         longitude: -122.4324,
                        //         latitudeDelta: 0.0922,
                        //         longitudeDelta: 0.0421,
                        //     }}
                        // /> 
                        : <FlatList
                            data={getResultView.data}
                            renderItem={renderItem}
                            keyExtractor={item => item.addressLatitude}
                        />}
                    <Button title={mapView ? "List View" : "Map View"}
                        onPress={() => {
                            setMapView(!mapView)
                        }} />
                </View> :
                    <ScrollView>
                        <Text>Address Title*</Text>
                        <TextInput value={getAddresstitle} placeholder={"Address Title"} onChangeText={(text) => { setAddresstitle(text) }}
                            style={{ padding: 10, borderWidth: 0.8, borderRadius: 5, marginBottom: 10 }} />
                        <Text>Address*</Text>
                        <TextInput value={getLine1} placeholder={"Line 1"} onChangeText={(text) => { setLine1(text) }}
                            style={{ padding: 10, borderWidth: 0.8, borderRadius: 5, marginBottom: 10 }} />
                        <TextInput value={getLine2} placeholder={"Line 2"} onChangeText={(text) => { setLine2(text) }}
                            style={{ padding: 10, borderWidth: 0.8, borderRadius: 5, marginBottom: 10 }} />

                        <Text>Landmark*</Text>
                        <TextInput value={getLandmark} placeholder={"Enter landmark"} onChangeText={(text) => { setLandmark(text) }}
                            style={{ padding: 10, borderWidth: 0.8, borderRadius: 5, marginBottom: 18 }} />

                        <Text>Latitude*</Text>
                        <TextInput value={getLat} keyboardType="numeric" placeholder={"Enter latitude"} onChangeText={(text) => { setLat(text) }}
                            style={{ padding: 10, borderWidth: 0.8, borderRadius: 5, marginBottom: 18 }} />

                        <Text>Longitude*</Text>
                        <TextInput value={getLong} keyboardType="numeric" placeholder={"Enter longitude"} onChangeText={(text) => { setLong(text) }}
                            style={{ padding: 10, borderWidth: 0.8, borderRadius: 5, marginBottom: 25 }} />
                        <Button title="Submit"
                            onPress={() => {
                                validateBody()
                            }} />
                    </ScrollView>}
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({

});

export default Home;
