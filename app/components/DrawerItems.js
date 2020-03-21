import * as React from "react";
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

export default function Item({ item, navigate }) {
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => navigate(item.name)}>
            <Ionicons name={item.icon} size={32} />
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listItem: {
        height: 60,
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        fontSize: 18,
        marginLeft: 20,
        color: 'black'
    }
});