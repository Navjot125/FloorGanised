import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'dateSlice',
  initialState: {
    date: null,
    selectedDate: null,
  },
  reducers: {
    setdate(state, action) {
      state.date = action.payload;
    },
    setSelecteddate(state, action) {
      state.selectedDate = action.payload;
    },
    removedate(state) {
      state.date = '';
    },
  },
});
export const { setdate, removedate,setSelecteddate } = dateSlice.actions;
export default dateSlice.reducer;
