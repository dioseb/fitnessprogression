import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';

export default function HeaderBar({ title, navigation }) {

  const openMenu = () => {
    navigation.openDrawer();
  }

  return (
    <Header
      leftComponent={{ icon: 'menu', color: '#fff', onPress: () => openMenu() }}
      centerComponent={<Text style={styles.headerText}>{title}</Text>}
    />
    // <View style={styles.header}>
    //   <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
    // </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
  }
});