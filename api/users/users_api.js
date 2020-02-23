import { Component } from 'react';

const PUSH_ENDPOINT_GETUSER = 'http://192.168.0.7:3000/api/users/';

class UsersApi extends Component {
    getById = async (id) => {
        try {
            console.log(PUSH_ENDPOINT_GETUSER);
            await fetch(`${PUSH_ENDPOINT_GETUSER}${id}`)
                .then(async response => response.json())
                .then(async user => new Promise(async (resolve, reject) => {
                    resolve(user);
                }))
                .catch(async (error) => {
                    console.log('Request failed', error);
                })
        } catch (error) {
            console.log('error in registerForPushNotificationsAsync');
            console.log(error);
        }
    }
}

export default UsersApi;