import API from './firebase';

const SignOut = () => {
    console.log('SignOut Pressed');
    API.auth().signOut();
}

export default SignOut;