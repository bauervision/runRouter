import React, { useRef, forwardRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Polyline, Dimensions, View } from "react-native";

export default MapScreen = forwardRef((props, mapRef) => {
  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      showsUserLocation={true}
      initialRegion={props.mapRegion}
    >
      {props.mapRegion && (
        <Marker title={"My Location"} coordinate={props.mapRegion} />
      )}

      {props.destination && (
        <Marker title={"Destination"} coordinate={props.destination} />
      )}
      {/* {destination && (
        <Polyline
          coordinates={[mapRegion, destination]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={["#7F0000"]}
          strokeWidth={6}
        />
      )} */}
    </MapView>
  );
});

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
    margin: 25,
    borderColor: "#fff",
    borderWidth: 1,
  },
});
