import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import SignOut from '../firebase/utils/signOut';

const DashboardScreen = () => (
    <View style={styles.container}>
        <Text>DashboardScreen</Text>
        <Button onPress={SignOut} title="Sign Out" />
    </View>
);

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
});