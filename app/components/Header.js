import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import LeftComponent from './LeftComponent';

export default function HeaderBar({ title, navigation }) {

  return (
    <Header
      backgroundColor="#fb5b5a"
      leftComponent={<LeftComponent navigate={navigation}/>}
      centerComponent={<Text style={styles.headerText}>{title}</Text>}
    />
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    letterSpacing: 1,
  }
});