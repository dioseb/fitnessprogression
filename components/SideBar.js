import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Button
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

import SignOut from '../firebase/utils/signOut';

function Item({ item, navigate }) {
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => navigate(item.name)}>
            <Ionicons name={item.icon} size={32} />
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    );
}

const Sidebar = ({ navigation, lastName, firstName, email }) => {
    const routes = [
        {
            name: "Dashboard",
            icon: "ios-home"
        },
        {
            name: "Profile",
            icon: "ios-contact"
        },
        {
            name: "Settings",
            icon: "ios-settings"
        }];

    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/profile.jpg")} style={styles.profileImg} />
            <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>{lastName}{firstName}</Text>
            <Text style={{ color: "gray", marginBottom: 10 }}>{email}</Text>
            <View style={styles.sidebarDivider}></View>
            <FlatList
                style={{ width: "100%", marginLeft: 30 }}
                data={routes}
                renderItem={({ item }) => <Item item={item} navigate={navigation.navigate} />}
                keyExtractor={item => item.name}
            />
            <View style={styles.sidebarDivider}></View>
            <View style={styles.container}>
                <Button onPress={SignOut} title="Sign Out" />
            </View>
        </View>
    )
}

export default Sidebar;

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
    header: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20
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