import { createAsyncThunk } from "@reduxjs/toolkit";
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
  async (body, thunkAPI) => {
    try {
      const res = await fetch(registerURL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json()
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const sendCode = createAsyncThunk(
  'user/sendCode',
  async (body, thunkAPI) => {
    try {
      const res = await fetch(forgotPasswordURL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json()
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (body, thunkAPI) => {
    try {
      const res = await fetch(resetPasswordURL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json()
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const loginRequest = createAsyncThunk(
  'user/loginRequest',
  async (body, thunkAPI) => {
    try {
      const res = await fetch(loginURL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json()
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (token, thunkAPI) => {
    try {
      const res = await fetch(userDataURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json()
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const updateToken = createAsyncThunk(
  'user/updateToken',
  async (body, thunkAPI) => {
    try {
      const res = await fetch(updateTokenURL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json()
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const logoutRequest = createAsyncThunk(
  'user/logoutRequest',
  async (body, thunkAPI) => {
    try {
      const res = await fetch(logoutURL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json()
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (userInfo, thunkAPI) => {
    try {
      const res = await fetch(userDataURL, {
        method: 'PATCH',
        body: JSON.stringify(userInfo.user),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      const data = await res.json()
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)