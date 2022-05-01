
import { configureStore } from "@reduxjs/toolkit";
import numberSlice from "../ui-component/dashboard/test-ruduxtoolkit-saga/counter/numberSlice";
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';
import authSlide from "../ui-component/dashboard/test-ruduxtoolkit-saga/auth/authSlide";
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        numbers: numberSlice,
        auth: authSlide
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware)
})

// phai chay o duoi, doi "configureStore" cho chay xong
sagaMiddleware.run(rootSaga)
export default store