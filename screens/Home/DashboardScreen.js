import * as React from 'react'
import { Text, View, StatusBar } from 'react-native'
import color from '../../styles/colors'
import { UserContext } from '../../context/UserContext'
import { getUser } from '../../storage/UserAsyncStorage';

function DashboardScreen({ navigation }) {

    const [login, loginAction] = React.useContext(UserContext)

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
            }}>Welcome{'\n' + (login ? login.user.email : '')}</Text>
        </View>
    )
}

export default DashboardScreen;