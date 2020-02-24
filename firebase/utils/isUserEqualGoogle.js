import API from './firebase';

const isUserEqualGoogle = (googleUser, firebaseUser) => {
    console.log(`isUserEqual Called !!!`);
    if (firebaseUser) {
        const { providerData } = firebaseUser;
        for (let i = 0; i < providerData.length; i++) {
            if (
                providerData[i].providerId === API.auth.GoogleAuthProvider.PROVIDER_ID
                && providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
                return true;
            }
        }
    }
    return false;
};

export default isUserEqualGoogle;