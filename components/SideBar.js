import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Button,
    BackHandler
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

import { UserContext } from '../context/UserContext';
import SignOut from '../firebase/utils/signOut';

function Item({ item, navigate }) {
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => navigate(item.name)}>
            <Ionicons name={item.icon} size={32} />
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    );
}

function useBackButton(handler) {
    React.useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handler)

        return () => {
            console.log('hardwareBackPress Close')
            BackHandler.removeEventListener("hardwareBackPress", handler)
        }
    }, [handler])
}

const Sidebar = ({ navigation }) => {

    useBackButton(desconectarse)
    const [login, loginAction] = React.useContext(UserContext)

    function goToScreen(routeName) {
        navigation.navigate(routeName)
    }

    function desconectarse() {
        loginAction({
            type: 'sign-out',
            data: {}
        })
        goToScreen('LoginAnimated')
    }

    function signOut() {
        if (login) {
            desconectarse();
        }
        SignOut();
    }

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
            <View style={styles.containerAvatar}>
                <Image source={require("../assets/images/profile.jpg")} style={styles.profileImg} />
                {/* <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>{login}</Text> */}
                <Text style={{ color: "gray", marginBottom: 10 }}>{login.user.email}</Text>
            </View>
            <View style={styles.sidebarDivider}></View>
            <FlatList
                style={{ width: "100%", marginLeft: 30 }}
                data={routes}
                renderItem={({ item }) => <Item item={item} navigate={navigation.navigate} />}
                keyExtractor={item => item.name}
            />
            <View style={styles.sidebarDivider}></View>
            <View style={styles.container}>
                <Button onPress={() => signOut()} title="Sign Out" />
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
    containerAvatar: {
        alignItems: "center",
        width: "100%",
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