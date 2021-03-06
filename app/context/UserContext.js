import * as React from 'react';
import { saveUser, deleteUser } from '../storage/UserAsyncStorage';
//import { sendEmail } from 'email';

const initialState = {
    user: {},
    activo: false
}

const userReducer = (state = initialState, payload) => {

    switch (payload.type) {

        case 'sign-in':
            console.log('Bienvenidos al sistema')
            console.log('User signed in !!!')
            return { ...state, user: payload.data, activo: true }
        case 'sign-up':
            saveUser(payload.data).then((msg) => {
                console.log(`SignUp UserContext: ${msg}`)
                console.log('User registered !!!')
            })
            return { ...state, user: payload.data, activo: true }
        case 'sign-out':
            deleteUser().then((msg) => {
                console.log(`SignOut UserContext: ${msg}`)
                console.log('User signed out !!!')
            })
            return { ...state, user: payload.data, activo: false }
        case 'lost-password':
            sendEmail().then((msg) => {
                console.log(msg)
            })
            return { ...state, user: payload.data, activo: false }
        default:
            return state
    }
}

const UserContext = React.createContext(initialState)

function UserProvider(props) {

    const [login, loginAction] = React.useReducer(userReducer, initialState)
    return (
        <UserContext.Provider value={[login, loginAction]}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }