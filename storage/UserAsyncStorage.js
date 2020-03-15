import { AsyncStorage } from 'react-native';

const USER_KEY = '@user:key'

async function saveUser(user){
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
        console.log(`saveUser AsyncStorage : ${JSON.stringify(user)}`)
        return JSON.stringify(user)
    } catch (error) {
        // Error setting data
        console.log('error al guardar: ' +error.message)
        return 'Error de sintaxis'
    }
}

async function getUser(){
    try {
        const item = await AsyncStorage.getItem(USER_KEY)
        console.log(`getUser AsyncStorage : ${JSON.stringify(item)}`)
        return JSON.parse(item)
    } catch (error) {
        // Error retrieving data
        console.log("Error al recuperar:" + error.message)
        return null
    }
}

async function deleteUser(){
    try {
        await AsyncStorage.removeItem(USER_KEY)
        const item = await AsyncStorage.getItem(USER_KEY)
        console.log(`deleteUser AsyncStorage : ${JSON.stringify(item)}`)
        return (item == null?"user removido":"user no removido")
    } catch (error) {
        // Error deleting data
        console.log("Error al eliminar" + error.message)
        return "Error de sintaxis"
    }
}

export {saveUser, getUser, deleteUser}