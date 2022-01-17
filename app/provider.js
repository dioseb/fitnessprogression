import React, { useMemo, useReducer, useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//IMPORT REDUCER, INITIAL STATE AND ACTION TYPES
import reducer, { initialState, LOGGED_IN, LOGGED_OUT } from "./reducer";

// CONFIG KEYS [Storage Keys]===================================
export const TOKEN_KEY = "token";
export const USER_KEY = "user";
export const keys = [TOKEN_KEY, USER_KEY];

// CONTEXT ===================================
const AuthContext = createContext();

function AuthProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState || {});

  // Get Auth state
  const getAuthState = async () => {
    try {
      //GET TOKEN && USER
      let token = await AsyncStorage.getItem(TOKEN_KEY);
      //console.log(`Token from provider : ${JSON.stringify(token)}`);
      let user = await AsyncStorage.getItem(USER_KEY);
      //console.log(`User from provider : ${JSON.stringify(user)}`);

      if (token !== null && user !== null) {
        //console.log(`HandleLogin from GetAuthState`);
        await handleLogin({ token, user: JSON.parse(user) });
      } else {
        //console.log(`HandleLogout from GetAuthState`);
        await handleLogout();
      }

      return { token, user };
    } catch (error) {
      throw new Error(error);
    }
  };

  // Handle Login
  const handleLogin = async (data) => {
    try {
      // await AsyncStorage.multiRemove(keys);
      // dispatch({type: LOGGED_OUT});

      console.log(`HandleLogin : ${JSON.stringify(data)}`);
      //STORE DATA
      let { token, user } = data;
      token = data.expoToken;
      user = data;
      let data_ = [
        [USER_KEY, JSON.stringify(user)],
        [TOKEN_KEY, token],
      ];
      //await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
      await AsyncStorage.multiSet(data_);

      //AXIOS AUTHORIZATION HEADER
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.expoToken}`;

      //DISPATCH TO REDUCER
      dispatch({ type: LOGGED_IN, user: data });
    } catch (error) {
      console.log(`HandleLogin Error : ${error}`);
      throw new Error(error);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      console.log(`HandleLogout`);

      //REMOVE DATA
      await AsyncStorage.multiRemove(keys);

      //AXIOS AUTHORIZATION HEADER
      delete axios.defaults.headers.common["Authorization"];

      //DISPATCH TO REDUCER
      dispatch({ type: LOGGED_OUT });
    } catch (error) {
      console.log(`HandleLogout Error : ${error}`);
      throw new Error(error);
    }
  };

  //UPDATE USER LOCAL STORAGE DATA AND DISPATCH TO REDUCER
  const updateUser = async (user) => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      dispatch({ type: LOGGED_IN, user }); //DISPATCH TO REDUCER
    } catch (error) {
      throw new Error(error);
    }
  };

  const value = useMemo(() => {
    return { state, getAuthState, handleLogin, handleLogout, updateUser };
  }, [state]);

  return (
    <AuthContext.Provider 
    value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}


export default AuthProvider;

const useAuth = () => useContext(AuthContext);
export { useAuth };
