
import { createSlice } from "@reduxjs/toolkit";
import { Report } from 'notiflix/build/notiflix-report-aio';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
    increaseNumbr: 0,
    status: 'idle',
    statusGetData: 'idle',
}
// Cấu hình slice
export const numberSlice = createSlice({
    name: 'number',
    initialState,
    reducers: {
        increaseNumber: (state, action) => {
            state.increaseNumbr = state.increaseNumbr + 1
        },
        desNumber: (state, action) => {
            state.increaseNumbr = state.increaseNumbr - 1
        },
        increaseNumberSaga: (state, action) => {
            state.status = 'loading'
        },
        increaseNumberSagaSuccess: (state, action) => {
            state.status = 'idle'
            state.increaseNumbr = state.increaseNumbr + 1
        },
        desNumberSaga: (state, action) => {
            state.status = 'loading'
        },
        desNumberSagaSuccess: (state, action) => {
            state.status = 'idle'
            state.increaseNumbr = state.increaseNumbr - 1
        },
        getDataSaga: (state, action) => {
            state.statusGetData = 'loading'
        },
        getDataSuccess: (state, action) => {
            state.status = 'idle'
            let requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch("https://nguyenleminh-api.herokuapp.com/get_all_product?page=2&limit=1", requestOptions)
                .then(response => response.text())
                .then(result => Report.success(
                    'Notiflix Success',
                    result,
                    'Okay',
                    ))
                .catch(error => console.log('error', error));
        }
    }
})

//ACTION
export const {
    increaseNumberSaga,
    increaseNumberSagaSuccess,
    desNumberSaga,
    desNumberSagaSuccess,
    getDataSaga,
    getDataSuccess
} = numberSlice.actions;

//SELECTOR 
export const increaseNumbrSelector = (state) => state.numbers.increaseNumbr

//REDUCER
export default numberSlice.reducer;
