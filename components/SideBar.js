import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Button,
    BackHandler,
    TouchableOpacity
} from "react-native";

import { UserContext } from '../context/UserContext';
import { getById } from '../api/users/usersApi';
import SignOut from '../firebase/utils/signOut';

import DrawerItem from './DrawerItems';
import routes from '../helpers/Routes';
import { Ionicons } from '@expo/vector-icons';

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
            goToScreen('Auth');
            return
        }

        console.log("FetchUser response not null: ", JSON.stringify(response));
        setUser(response);
    }

    function goToScreen(routeName) {
        navigation.push(routeName)
    }

    function desconectarse() {
        console.log("desconectarse called");
        loginAction({
            type: 'sign-out',
            data: {}
        })
        goToScreen('Auth')
    }

    function signOut() {
        console.log("signOut called");
        SignOut();
        desconectarse();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require("../assets/images/profile.jpg")} style={styles.profileImg} />
                <Text style={{ color: "black", fontSize: 12 }}>{'\n' + user.email}</Text>
            </View>
            <View style={styles.sidebarDivider}></View>
            <View style={styles.body}>
                <FlatList
                    data={routes}
                    renderItem={({ item }) => <DrawerItem item={item} navigate={navigation.navigate} />}
                    keyExtractor={item => item.name}
                />
            </View>
            <View style={styles.sidebarDivider}></View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => signOut()}>
                    <Ionicons name={'ios-log-out'} color={'black'} size={36} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Sidebar;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        alignItems: "center",
        flex: 3,
        paddingTop: 15
    },
    body: {
        paddingLeft: 10,
        flex: 9,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1,
        paddingRight: 10
    },
    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20
    },
    sidebarDivider: {
        height: 1,
        width: "100%",
        backgroundColor: "lightgray",
        marginVertical: 10
    }
});