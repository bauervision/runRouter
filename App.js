import React, { Component, useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import MapScreen from "./MapScreen";
import Slider from "@react-native-community/slider";

export default function App() {
  const [distance, SetDistance] = useState(1);
  const [routeCount, SetRouteCount] = useState("none");

  const findRoutes = () => {
    SetRouteCount("Three");
  };

  return (
    <View style={styles.container}>
      <Text>Distance to Run:</Text>
      <Text>{distance}</Text>

      <Slider
        style={{ width: Dimensions.get("window").width, height: 40 }}
        step={0.25}
        maximumTrackTintColor="#d3d3d3"
        maximumValue={10}
        minimumTrackTintColor="#1fb28a"
        minimumValue={1}
        thumbTintColor="#1a9274"
        onValueChange={(value) => SetDistance(value)}
      />

      <Button
        onPress={findRoutes}
        title="Find Routes"
        //color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <MapScreen />

      <Text>Total Routes Found</Text>
      <Text>{routeCount}</Text>

      <Button
        onPress={findRoutes}
        title="Start Run"
        //color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
});
