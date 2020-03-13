import * as React from 'react'
import { Text, View, StatusBar, Alert, BackHandler } from 'react-native'
import color from '../../styles/colors'
import MyButton from '../../components/MyButton'
import { UserContext } from '../../context/UserContext'

function useBackButton(handler){
  React.useEffect(()=> {
      BackHandler.addEventListener("hardwareBackPress", handler)

      return() => {
          console.log('hardwareBackPress Close')
          BackHandler.removeEventListener("hardwareBackPress", handler)
      }
  }, [handler])
}

function DashboardScreen({ navigation }) {

  useBackButton(desconectarse)
    const [login, loginAction] = React.useContext(UserContext)

    return (
        <View style={{flex:1, alignItems:'center'}}>
            <StatusBar
                backgroundColor={color.BLUE}
                barStyle='dark-content'
                translucent={true}
            />
            <Text style={{ textAlign: 'center', fontSize:30, marginTop: 200, 
            fontFamily: 'Poppins-Bold' }}>Welcome{'\n' + login.user.email}</Text>
            <MyButton
                titulo='Sign out'
                onPress={()=> desconectarse()}
            />
        </View>
    )

    function goToScreen(routeName){
        navigation.navigate(routeName)
    }

    function desconectarse(){
        loginAction({
            type:'sign-out',
            data:{}
        })
        goToScreen('LoginAnimated')
    }
}

export default DashboardScreen;