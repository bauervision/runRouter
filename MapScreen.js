import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";

export default () => {
  return <MapView style={styles.map} showsUserLocation followsUserLocation />;
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
