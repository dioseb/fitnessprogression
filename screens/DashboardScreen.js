import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import firebase from 'firebase';

class DashboardScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                    <Button title="Sign out" onPress={() => firebase.auth().signOut()}/>
            </View>
        );
    }
}

export default DashboardScreen;

DashboardScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
});