import { take, fork } from '@redux-saga/core/effects'
import { login, logout } from './authSlide'
import { Notify } from 'notiflix/build/notiflix-notify-aio'

function* handleLogin(payload) {
  console.log('login', payload)
  Notify.success('Đăng nhập thành công')
}

function* handleLogout() {
  Notify.success('Đăng xuất thành công')
}

function* watchLoginFlow() {
  while (true) {
    const action = yield take(login.type)
    yield fork(handleLogin, action.payload)

    yield take(logout.type)
    yield fork(handleLogout)
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow)
}
