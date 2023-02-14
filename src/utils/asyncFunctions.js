import { createAsyncThunk } from "@reduxjs/toolkit";
import request from './request';
import { 
  registerURL, 
  forgotPasswordURL, 
  resetPasswordURL, 
  loginURL, 
  userDataURL,
  updateTokenURL,
  logoutURL
 } from '../api/ingredientsAPI';

export const createUser = createAsyncThunk(
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

export const sendCode = createAsyncThunk(
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

export const resetPassword = createAsyncThunk(
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

export const loginRequest = createAsyncThunk(
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

export const getUserData = createAsyncThunk(
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

export const updateToken = createAsyncThunk(
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

export const logoutRequest = createAsyncThunk(
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

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (userInfo) => {
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