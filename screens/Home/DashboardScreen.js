import * as React from 'react';
import { Text, View, StatusBar, BackHandler } from 'react-native';
import color from '../../styles/colors';

import { UserContext } from '../../context/UserContext';
import { getUser } from '../../storage/UserAsyncStorage';

import SignOut from '../../firebase/utils/signOut';
import MyButton from '../../components/MyButton';

function useBackButton(handler) {
    React.useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handler)

        return () => {
            console.log('hardwareBackPress Close')
            BackHandler.removeEventListener("hardwareBackPress", handler)
        }
    }, [handler])
}

function DashboardScreen({ navigation }) {

    useBackButton(signOut)
    const [login, loginAction] = React.useContext(UserContext)
    const [user, setUser] = React.useState('')

    React.useEffect(() =>{
        fetchSesion()
    }, [])

    console.log(`User : ${JSON.stringify(user)}`);

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
            }}>Welcome{'\n' + user.email}</Text>
            <MyButton
                titulo='Cerrar Sesión'
                onPress={() => signOut()}
            />
        </View>
    )

    function goToScreen(routeName) {
        navigation.navigate(routeName)
    }

    async function fetchSesion(){  
        console.log("FetchSession called !!!!")
        
        const response = await getUser()

        if(response == null){
            setTimeout(() =>{
                goToScreen('LoginAnimated')
            }, 3000)
            return
        }

        console.log("FetchSession response : ", JSON.stringify(response));
        setUser(response);
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
}

export default DashboardScreen;