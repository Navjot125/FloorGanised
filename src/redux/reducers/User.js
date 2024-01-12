import {createSlice} from '@reduxjs/toolkit';

const userData = createSlice({
  name: 'userData',
  initialState: {
    data: null,
    fcmToken: null,
  },
  reducers: {
    setUserData(state, action) {
      state.data = action.payload;
    },
    removeUserData(state) {
      state.data = '';
    },
    setFcmToken(state, action) {
      state.fcmToken = action.payload;
    },
  },
});
export const {setUserData, removeUserData, setFcmToken} = userData.actions;
export default userData.reducer;
