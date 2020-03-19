import * as React from 'react';
import { Text, View, StatusBar, ImageBackground, StyleSheet, BackHandler } from 'react-native';
import * as Animatable from 'react-native-animatable';
import color from '../../styles/colors';
import bground from '../../assets/images/background.png';

import { UserContext } from '../../context/UserContext';
import { getUser } from '../../storage/UserAsyncStorage';
import { getById } from '../../api/users/usersApi';
import SignOut from '../../firebase/utils/signOut';

import MyButton from '../../components/MyButton';

// function useBackButton(handler) {
//     React.useEffect(() => {
//         BackHandler.addEventListener("hardwareBackPress", handler)

//         return () => {
//             console.log('hardwareBackPress Close')
//             BackHandler.removeEventListener("hardwareBackPress", handler)
//         }
//     }, [handler])
// }

function DashboardScreen({ navigation }) {

    // useBackButton(signOut)
    // const [login, loginAction] = React.useContext(UserContext)
    // const [user, setUser] = React.useState('')

    // React.useEffect(() => {
    //     //fetchSesion();
    //     fetchUser();
    // }, [])

    //console.log(`User : ${JSON.stringify(user)}`);
    // if (user == "") {
    //     return (
    //         <ImageBackground source={bground} style={styles.backgroundContainer}>
    //             <StatusBar translucent backgroundColor='rgba(0,0,0,0.2)' />
    //             <Animatable.Image
    //                 animation="rotate"
    //                 easing="ease-out"
    //                 iterationCount="infinite"
    //                 style={{
    //                     width: 50,
    //                     height: 50,
    //                     margin: 50
    //                 }}
    //                 source={require('../../assets/images/instaIcon.png')}
    //             />
    //         </ImageBackground>
    //     )
    // }
    // else {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <StatusBar
                    backgroundColor={color.BLUE}
                    barStyle='dark-content'
                    translucent={true}
                />
                <Text style={{
                    textAlign: 'center', fontSize: 30, marginTop: 200,
                    fontFamily: 'Poppins-Bold'
                }}>Welcome</Text>
                {/* <Text style={{
                    textAlign: 'center', fontSize: 30, marginTop: 200,
                    fontFamily: 'Poppins-Bold'
                }}>Welcome{'\n' + user.email +
                    '\n' + user.first_name +
                    '\n' + user.last_name
                    }</Text> */}
                {/* <MyButton
                    titulo='Logout'
                    onPress={() => signOut()}
                /> */}
            </View>
        )
    //}

    function goToScreen(routeName) {
        navigation.navigate(routeName)
    }

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

    async function fetchSesion() {
        console.log("FetchSession called !!!!")

        const response = await getUser()

        if (response == null) {
            goToScreen('Auth');
        }

        console.log("FetchSession response : ", JSON.stringify(response));
        setUser(response);
    }

    function desconectarse() {
        loginAction({
            type: 'sign-out',
            data: {}
        })
        goToScreen('Auth')
    }

    function signOut() {
        if (login) {
            desconectarse();
        }
        SignOut();
    }
}

export default DashboardScreen;

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    }
});