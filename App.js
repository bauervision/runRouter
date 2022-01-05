import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapScreen from "./MapScreen";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MapScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
  },
});
