import { delay, fork, put, retry, takeEvery, takeLatest } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  increaseNumberSaga,
  getDataSaga,
  getDataSuccess,
  increaseNumberSagaSuccess,
  desNumberSaga,
  desNumberSagaSuccess
} from './numberSlice'

import { Notify } from 'notiflix/build/notiflix-notify-aio'

function* handleIncrementSaga(action) {
  // wait 1sec
  yield delay(500)
  console.log('TestToolkitSaga +1')
  Notify.success('TestToolkitSaga +1')

  // dispatch action successfully
  yield put(increaseNumberSagaSuccess())
}

function* handleDesSaga(action) {
  // wait 1sec
  yield delay(500)
  console.log('TestToolkitSaga -1')
  Notify.success('TestToolkitSaga -1')

  // dispatch action successfully
  yield put(desNumberSagaSuccess())
}

function* handleGetDataSaga(action) {
  // wait 1sec
  yield delay(500)

  // dispatch action successfully
  yield put(getDataSuccess())
}

export default function* counterSaga() {
  // yield takeEvery(increaseNumberSaga.toString(), handleIncrementSaga)
  yield takeLatest(increaseNumberSaga.toString(), handleIncrementSaga)
  yield takeLatest(desNumberSaga.toString(), handleDesSaga)
  yield takeLatest(getDataSaga.toString(), handleGetDataSaga)
}
