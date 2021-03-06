import React from 'react';

//API URL
import { USER_API_ENDPOINT } from './api/config/config';
//export const API_URL = 'https://mesannodejsapiwithverification.herokuapp.com/api';
export const API_URL = 'localhost:3000/api';

//API End Points
export const REGISTER = `${API_URL}/auth/register`;
export const LOGIN = `${API_URL}/auth/login`;
export const UPDATE_PROFILE = `${API_URL}/users`;
export const UPLOAD_IMAGE = `${API_URL}/user/upload`;
export const FORGOT_PASSWORD = `${API_URL}/auth/recover`;