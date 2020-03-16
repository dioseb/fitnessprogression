const PUSH_ENDPOINT_GETUSER = 'http://192.168.0.5:3000/api/users/';

async function getById(id) {
    try {
        console.log(`${PUSH_ENDPOINT_GETUSER}${id}`);
        const response = await fetch(`${PUSH_ENDPOINT_GETUSER}${id}`);
        return await response.json();
    } catch (error) {
        console.log('error in getById');
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

export {getById};