import API from './firebase';

const isUserEqualFacebook = (facebookAuthResponse, firebaseUser) => {
    console.log(`isUserEqual Called !!!`);
    if (firebaseUser) {
        const { providerData } = firebaseUser;
        for (let i = 0; i < providerData.length; i++) {
            if (
                providerData[i].providerId === API.auth.FacebookAuthProvider.PROVIDER_ID 
                && providerData[i].uid === facebookAuthResponse.userID
            ) {
                return true;
            }
        }
    }
    return false;
};

export default isUserEqualFacebook;