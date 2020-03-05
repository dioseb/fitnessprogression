import { Component } from 'react';

//const PUSH_ENDPOINT_GETUSER = 'http://10.5.118.54:3000/api/users/';
const PUSH_ENDPOINT_GETUSER = 'http://10.5.118.95:3000/api/users/';

class UsersApi extends Component {
    getById = async (id) => {
        try {
            console.log(`${PUSH_ENDPOINT_GETUSER}${id}`);
            await fetch(`${PUSH_ENDPOINT_GETUSER}${id}`)
                .then(async response => response.json())
                .then(async user => {
                    return user;
                })
                .catch(async (error) => {
                    console.log('Request failed : ', error);
                })
        } catch (error) {
            console.log('error in registerForPushNotificationsAsync');
            console.log(error);
        }
        // try {
        //     console.log(PUSH_ENDPOINT_GETUSER);
        //     await fetch(`${PUSH_ENDPOINT_GETUSER}${id}`)
        //         .then(async response => {
        //             console.log(`response usersApi.js : ${response}`);
        //             response.json()
        //         })
        //         // .then(async user => {
        //         //     console.log(`User : ${user}`);
        //         //     resolve(user)
        //         // })
        //         .catch(async (error) => {
        //             console.log('Request failed', error);
        //         })
        // } catch (error) {
        //     console.log('error in registerForPushNotificationsAsync');
        //     console.log(error);
        // }
    }
}

export default UsersApi;