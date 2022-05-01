
import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined,
}
// Cấu hình slice
export const authSlide = createSlice({
    name: 'number',
    initialState,
    reducers: {
        login(state, action) {
            state.logging = true;
        },
        loginSuccess(state, action) {
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload
        },
        loginFailed: (state, action) => {
            state.logging = false;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
    }
})

//ACTION
export const { login, logout } = authSlide.actions;

//SELECTOR 
// export const increaseNumbrSelector = (state) => state.numbers.increaseNumbr

//REDUCER
export default authSlide.reducer;
