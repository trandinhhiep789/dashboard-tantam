import { configureStore } from '@reduxjs/toolkit'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './toolkit_saga/rootSaga'

import authSlide from '../ui-component/dashboard/test-ruduxtoolkit-saga/auth/authSlide'
import numberSlice from '../ui-component/dashboard/test-ruduxtoolkit-saga/counter/numberSlice'
import registerClientSlide from '~/app/toolkit_saga/registerClientSlideSaga/registerClientSlide'
import loginClientSlide from '~/app/toolkit_saga/loginClientSlideSaga/loginClientSlide'

// Redux-Saga cung cấp một chức năng createSagaMiddle mà chúng tôi sử dụng để khởi động sagaMiddleware.
// Bởi vì tham số middleware trong configureStore API là một mảng của phần mềm middleware hiện có,
// chúng ta có thể nhận được middleware hiện tại với phuong thuc getDefaultMiddleware
// và kết hợp middleware Saga mới của chúng tôi với mảng.

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    number: numberSlice,
    auth: authSlide,
    registerClient: registerClientSlide,
    loginClient: loginClientSlide
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
})

// phai chay o duoi, doi "configureStore" cho chay xong
sagaMiddleware.run(rootSaga)
export default store
