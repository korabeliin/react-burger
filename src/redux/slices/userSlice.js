import { createSlice } from "@reduxjs/toolkit";
import { createUser, sendCode, resetPassword, loginRequest, getUserData, updateToken, logoutRequest, updateUserData } from '../../utils/asyncFunctions';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    success: false,
    message: '',
    accessToken: '',
    refreshToken: '',
    password: ''
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.success = action.payload.success
        state.accessToken = action.payload?.accessToken?.split('Bearer ')[1];
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.success = action.payload.success
      })

      .addCase(sendCode.fulfilled, (state, action) => {
        state.success = action.payload.success
        state.message = action.payload.message
      })
      .addCase(sendCode.rejected, (state, action) => {
        state.success = action.payload.success
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.success = action.payload.success
        state.message = action.payload.message
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.success = action.payload.success
      })

      .addCase(loginRequest.fulfilled, (state, action) => {
        state.success = action.payload?.success;
        state.accessToken = action.payload?.accessToken?.split('Bearer ')[1];
        state.refreshToken = action.payload.refreshToken;
        state.password = action.meta.arg.password;
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.success = action.payload.success
      })

      .addCase(getUserData.fulfilled, (state, action) => {
        state.success = action.payload.success
        state.user = action.payload.user;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.success = action.payload.success
      })

      .addCase(updateToken.fulfilled, (state, action) => {
        state.success = action.payload?.success
        state.accessToken = action.payload?.accessToken?.split('Bearer ')[1];
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(updateToken.rejected, (state, action) => {
        state.success = action.payload?.success
      })

      .addCase(logoutRequest.fulfilled, (state) => {
        state.user = null
        state.accessToken = ''
        state.refreshToken = ''
      })
      .addCase(logoutRequest.rejected, (state, action) => {
        state.success = action.payload.success
        state.message = action.payload.message
      })

      .addCase(updateUserData.fulfilled, (state, action) => {
        state.success = action.payload?.success;
        state.user = action.payload.user;
        state.password = action.meta.arg.user.password;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.success = action.payload.success
      })
  }
});

export default userSlice.reducer;