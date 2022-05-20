import { all } from 'redux-saga/effects'
import counterSaga from '~/ui-component/dashboard/test-ruduxtoolkit-saga/counter/counterSaga'
import { callRegisterClient, fetchApiFailure } from '~/app/registerClient/registerClientSaga'
import { callLogout } from './saga/loginSaga'
export default function* rootSaga() {
  yield all([
    counterSaga(),
    fetchApiFailure(),
    callRegisterClient(),
    callLogout()
  ])
}