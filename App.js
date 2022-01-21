import React, {
  Component,
  useState,
  useEffect,
  createRef,
  useRef,
} from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import MapScreen from "./MapScreen";
import Slider from "@react-native-community/slider";
import * as geolib from "geolib";
import * as Location from "expo-location";

export default function App() {
  const [distance, SetDistance] = useState(1);
  const [routeCount, SetRouteCount] = useState("none");

  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);

  const [destinationCoord, setDestinationCoordinate] = useState();

  const mapRef = createRef();

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

  const getRandomBearing = () => {
    return Math.floor(Math.random() * 359);
  };

  const findRoutes = () => {
    // find a point
    const destinationPoint = geolib.computeDestinationPoint(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      getRouteDistanceOneWay(), //convert integer miles to meters, then halve it
      getRandomBearing()
    );

    setDestinationCoordinate({
      latitude: destinationPoint.latitude,
      longitude: destinationPoint.longitude,
    });

    const latLng = [
      { latitude: location.latitude, longitude: location.longitude },
      {
        latitude: destinationPoint.latitude,
        longitude: destinationPoint.longitude,
      },
    ];

    mapRef.current.fitToCoordinates(latLng);
    console.log(latLng[1].latitude);
    //SetRouteCount(destinationPoint.latitude);
  };

  const getRouteDistanceOneWay = () => {
    return (distance * 1609.344) / 2;
  };

  return (
    <View style={styles.container}>
      {/* <PlaceInput /> */}

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

      <Text>
        {" "}
        One Way : {Math.round((getRouteDistanceOneWay() / 1609) * 100) /
          100}{" "}
        miles
      </Text>
      <Button
        onPress={findRoutes}
        title="Find Routes"
        //color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      {/* <MapScreen
        myRef={mapRef}
        mapRegion={mapRegion}
        destination={destinationCoord}
      /> */}

      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={mapRegion}
      >
        {mapRegion && <Marker title={"My Location"} coordinate={mapRegion} />}

        {destinationCoord && (
          <Marker title={"Destination"} coordinate={destinationCoord} />
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

      <Text>Total Routes Found</Text>

      {/* <Button
        onPress={findRoutes}
        title="Start Run"
        //color="#841584"
        accessibilityLabel="Learn more about this purple button"
      /> */}
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
    margin: 25,
    borderColor: "#fff",
    borderWidth: 1,
  },
});
