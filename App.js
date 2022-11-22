import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { Component } from 'react';  

export default function App() {
  return (
    <View style={styles.container}>
      <Text>heyyy</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#000",
    alignItems: "center",
    width: "100%",
  },

});
