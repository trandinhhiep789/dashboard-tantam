import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { fetchAPIInfoSlice, getCacheInfoSlice, loginInfoSlice, modalInfoSlide, pageInfoSlice, registerClientInfoSlice } from '~/app/registerClient/registerClientSlice'
import loginClientSlide from '~/app/toolkit_saga/loginClientSlideSaga/loginClientSlide'
import authSlide from '~/ui-component/dashboard/test-ruduxtoolkit-saga/auth/authSlide'
import numberSlice from '~/ui-component/dashboard/test-ruduxtoolkit-saga/counter/numberSlice'
import rootSaga from '~/app/rootSaga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    number: numberSlice,
    auth: authSlide,
    RegisterClientInfo: registerClientInfoSlice,
    LoginInfo: loginInfoSlice,
    FetchAPIInfo: fetchAPIInfoSlice,
    GetCacheInfo: getCacheInfoSlice,
    PageInfo: pageInfoSlice,
    ModalInfo: modalInfoSlide,
    loginClient: loginClientSlide
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)
export default store
