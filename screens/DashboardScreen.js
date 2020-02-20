import * as React from 'react';
import { StyleSheet, View } from 'react-native';

class DashboardScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>

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