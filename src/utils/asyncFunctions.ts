import { createAsyncThunk } from "@reduxjs/toolkit";
import request from './request';
// import { 
//   registerURL, 
//   forgotPasswordURL, 
//   resetPasswordURL, 
//   loginURL, 
//   userDataURL,
//   updateTokenURL,
//   logoutURL
//  } from '../api/ingredientsAPI';

 import {IngredientsAPI} from '../api/ingredientsAPI';

 const { registerURL, forgotPasswordURL, resetPasswordURL, loginURL, userDataURL, updateTokenURL, logoutURL } = IngredientsAPI;

export const createUser:any = createAsyncThunk(
  'user/createUser',
  async (body) => {
      const data = request(registerURL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return data
  }
)

export const sendCode:any = createAsyncThunk(
  'user/sendCode',
  async (body, ) => {
    const data = request(forgotPasswordURL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data
  }
)

export const resetPassword:any = createAsyncThunk(
  'user/resetPassword',
  async (body) => {
    const data = request(resetPasswordURL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data
  }
)

export const loginRequest:any = createAsyncThunk(
  'user/loginRequest',
  async (body) => {
    const data = request(loginURL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data
  }
)

export const getUserData:any = createAsyncThunk(
  'user/getUserData',
  async (token) => {
    const data = request(userDataURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return data
  }
)

export const updateToken:any = createAsyncThunk(
  'user/updateToken',
  async (body) => {
    const data = request(updateTokenURL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data
  }
)

export const logoutRequest:any = createAsyncThunk(
  'user/logoutRequest',
  async (body) => {
    const data = request(logoutURL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data
  }
)

export const updateUserData:any = createAsyncThunk(
  'user/updateUserData',
  async (userInfo:any) => {
    const data = request(userDataURL, {
      method: 'PATCH',
      body: JSON.stringify(userInfo.user),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    return data
  }
)