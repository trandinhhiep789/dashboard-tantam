// import counterSaga from 'features/counter/counterSaga'
import { all } from 'redux-saga/effects'
// import counterSaga from '../../ui-component/dashboard/test-ruduxtoolkit-saga/counter/counterSaga'
import counterSaga from '~/ui-component/dashboard/test-ruduxtoolkit-saga/counter/counterSaga'
import authSaga from '~/ui-component/dashboard/test-ruduxtoolkit-saga/auth/authSaga'

export default function* rootSaga() {
  console.log('rootSaga')
  yield all([counterSaga(), authSaga()])
}
