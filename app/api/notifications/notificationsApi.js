import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Component } from "react";

class NotificationsApi extends Component {
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    let token;
    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return (token = "");
    } else {
      return (token = await Notifications.getExpoPushTokenAsync());
    }

    // try {
    //     console.log(PUSH_ENDPOINT_GETUSER);
    //     await fetch(PUSH_ENDPOINT_GETUSER)
    //         .then(async response => response.json())
    //         .then(async user => new Promise(async (resolve, reject) => {
    //             console.log(`${user.id}`);
    //             console.log(`${PUSH_ENDPOINT_REGISTER_NOTIFICATIONS}${user.id}`);
    //             let res = await fetch(`${PUSH_ENDPOINT_REGISTER_NOTIFICATIONS}${user.id}`, {
    //                 method: 'POST',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     expoToken: token
    //                 }),
    //             })
    //             console.log(`${res}`);
    //             resolve(res);
    //         }))
    //         .catch(async (error) => {
    //             console.log('Request failed', error);
    //         })
    // } catch (error) {
    //     console.log('error in registerForPushNotificationsAsync');
    //     console.log(error);
    // }
  };
}

export default NotificationsApi;
