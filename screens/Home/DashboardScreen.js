import * as React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>DashboardScreen</Text>
        <Button onPress={() => navigation.navigate('Settings')} title="Go to Settings" />
    </View>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
});