import API from './firebase';

const SignOut = () => API.auth().signOut();

export default SignOut;