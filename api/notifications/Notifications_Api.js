import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Component } from 'react';

//const PUSH_ENDPOINT = 'http://10.5.118.64:3000/api/notifications/registerForPushNotifications/1';
const PUSH_ENDPOINT = 'http://192.168.0.0:3000/api/notifications/registerForPushNotifications/1';

class NotificationsApi extends Component {
        registerForPushNotificationsAsync = async () => {
            const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
            );

            let finalStatus = existingStatus;

            // only ask if permissions have not already been determined, because
            // iOS won't necessarily prompt the user a second time.
            if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
            }

            // Stop here if the user did not grant permissions
            if (finalStatus !== 'granted') {
            return;
            }
            console.log(finalStatus)

            // Get the token that uniquely identifies this device
            let token = await Notifications.getExpoPushTokenAsync();
            console.log(token)
            
            try {
                console.log(PUSH_ENDPOINT)
                let res = await fetch(PUSH_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        expoToken : token
                    }),
                    });

                    if (!res.ok) {
                        let data = await res.json();
                        console.log(data.error);
                        throw Error(data.error);
                    }
                    else {
                        console.log("Ok");
                    }
            } catch (error) {
                console.log('error in registerForPushNotificationsAsync');
                console.log(error);
            }
        }
    }

export default NotificationsApi;