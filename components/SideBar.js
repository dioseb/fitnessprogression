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
import { getById } from '../api/users/usersApi';
import SignOut from '../firebase/utils/signOut';

function Item({ item, navigate }) {
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => navigate(item.name)}>
            <Ionicons name={item.icon} size={32} color='grey' />
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
    const [user, setUser] = React.useState('')

    React.useEffect(() => {
        //fetchSesion();
        fetchUser();
    }, [])

    async function fetchUser() {
        console.log("FetchUser called !!!!")

        const response = await getById('8pUBIVF1ypQPiZeze7mNQanaxF53');

        if (response == null) {
            console.log("FetchUser response null : ", JSON.stringify(response));
            goToScreen('LoginAnimated');
            return
        }

        console.log("FetchUser response not null: ", JSON.stringify(response));
        setUser(response);
    }

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
            <View style={styles.headers}>
                <Image source={require("../assets/images/profile.jpg")} style={styles.profileImg} />
                {/* <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>{login}</Text> */}
                <Text style={{ color: "gray", fontSize: 12 }}>{'\n' + user.email}</Text>
            </View>
            <View style={styles.sidebarDivider}></View>
            <FlatList
                style={styles.body}
                data={routes}
                renderItem={({ item }) => <Item item={item} navigate={navigation.navigate} />}
                keyExtractor={item => item.name}
            />
            <View style={styles.sidebarDivider}></View>
            <View style={styles.footer}>
                <Button onPress={() => signOut()} title="Logout" />
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
    headers: {
        alignItems: "center",
        width: "100%",
        flex: 1
    },
    body: {
         width: "100%", 
         marginLeft: 30 
    },
    footer: {
        backgroundColor: "#fff",
        paddingTop: 10,
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
        marginLeft: 20,
        color: 'grey'
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