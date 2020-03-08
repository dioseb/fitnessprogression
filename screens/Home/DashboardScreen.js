import * as React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

import SignOut from '../../firebase/utils/signOut';

function DashboardScreen() {
  return (
    <View style={styles.container}>
        <Text>DashboardScreen</Text>
        <Button onPress={SignOut} title="Sign Out" />
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