import React, { Component, useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import * as Location from "expo-location";

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <MapView
      style={styles.map}
      showsUserLocation={true}
      initialRegion={mapRegion}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
    margin: 25,
    borderColor: "#fff",
    borderWidth: 1,
  },
});
