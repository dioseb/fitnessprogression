import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Badge} from 'react-native-elements';

//HEADER COMPONENT
export const Header = (props) => {
    let {title, style} = props;

    return (
        <View style={[styles.header, style]}>
            <Text style={styles.headerText}>
                {title}
            </Text>
        </View>
    )
};

Header.defaultProps = {
    title: "",
    style: {}
};

//ERROR COMPONENT
export const ErrorText = ({error}) => {
    return <Text style={styles.errorText}>{error}</Text>
};

ErrorText.defaultProps = {
    error: ""
};

const styles = StyleSheet.create({
    header: {
        marginTop: 150,
        justifyContent: "center"
    },

    headerText: {
        fontSize: 50,
        color: "#fb5b5a",
        fontWeight: "bold"
    },

    errorText:{
        marginBottom: 8,
        color:"red"
    }
});