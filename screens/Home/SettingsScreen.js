import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/banner.png")} style={{ width: "80%", height: "30%" }} resizeMode="contain" />
      <Text style={{ padding: 20 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet dictum sapien, nec viverra orci. Morbi sed maximus purus. Phasellus quis justo mi. Nunc ut tellus lectus.
    </Text>
      <Text style={{ padding: 20 }}>
        In eleifend, turpis sit amet suscipit tincidunt, felis ex tempor tellus, at commodo nunc massa rhoncus dui. Vestibulum at malesuada elit.
    </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
    flex: 1
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
});

export default SettingsScreen;