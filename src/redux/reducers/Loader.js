// import { createSlice } from '@reduxjs/toolkit';

// const loader = createSlice({
//     name: 'loader',
//     initialState: {
//         data: false,
//     },
//     reducers: {
//         setLoader(state, action) {
//             state.data = action.payload;
//         },
//     },
// });
// export const { setLoader } = loader.actions;
// export default loader.reducer;
import {SET_LOADER} from '../constants';

const initialState = {
    loader:false,
};
export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
    return {
        ...state,
        loader: action.data,
      };
    default:
      return state;
  }
};
