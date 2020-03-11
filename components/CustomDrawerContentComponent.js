import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

function Item({ item, navigation }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={() => navigation(item.name)}>
      <Ionicons name={item.icon} size={32} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  state = {
    routes: [
      {
        name: "Dashboard",
        icon: "ios-home"
      },
      {
        name: "Settings",
        icon: "ios-settings"
      },
      {
        name: "Profile",
        icon: "ios-contact"
      },
    ]
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/images/profile.jpg")} style={styles.profileImg} />
        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>Sébastien Medel</Text>
        <Text style={{ color: "gray", marginBottom: 10 }}>dioseb.m@gmail.com</Text>
        <View style={styles.sidebarDivider}></View>
        <FlatList
          style={{ width: "100%", marginLeft: 30 }}
          data={this.state.routes}
          renderItem={({ item }) => <Item item={item} navigation={this.props.navigation.navigate} />}
          keyExtractor={item => item.name}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
    flex: 1

  },
  listItem: {
    height: 60,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    marginLeft: 20
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 20
  },
  sidebarDivider: {
    height: 1,
    width: "100%",
    backgroundColor: "lightgray",
    marginVertical: 10
  }
});