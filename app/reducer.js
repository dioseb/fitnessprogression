//Action Types
export const LOGGED_IN = `auth/LOGGED_IN`;
export const LOGGED_OUT = `auth/LOGGED_OUT`;

export const  initialState = {
    isLoggedIn: false,
    user: null
};

//REDUCER
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN:{
            let { user } = action;
            //console.log(`User from reducer : ${JSON.stringify(user)}`)

            return {...state, isLoggedIn: true, user};
        }

        case LOGGED_OUT:{
            console.log(`LOGGED_OUT from reducer : ${JSON.stringify(state)}`)
            return {...state, ...initialState};
        }

        default:
            return state;
    }
};

export default authReducer;