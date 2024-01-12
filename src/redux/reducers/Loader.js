import { createSlice } from '@reduxjs/toolkit';

const loader = createSlice({
    name: 'loader',
    initialState: {
        data: false,
    },
    reducers: {
        setLoader(state, action) {
            state.data = action.payload;
        },
    },
});
export const { setLoader } = loader.actions;
export default loader.reducer;
