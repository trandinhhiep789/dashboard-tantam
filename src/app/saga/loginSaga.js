import { call, put, putResolve, select, take } from "redux-saga/effects";
import { CheckIsRegisterClient, CreateLoginData } from "~/library/AuthenLib";
import { deleteCookie, setCookie } from "~/library/CommonLib";
import indexedDBLib from "~/library/indexedDBLib";
import WebRequest from "~/library/net/WebRequest";
import { decryptData2 } from "~/utils/dotNetRSACrypto";
import { AUTHEN_HOSTNAME, AUTHEN_HOST_BASEURL, CLIENT_INFO_OBJECT_STORENAME, COOKIELOGIN, SESSION_EXPIRE_MINUTE } from "../constants/systemVars";
import { callRegisterClient } from "../registerClient/registerClientSaga";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../registerClient/registerClientSlice";

export function* callLogout() {
  while (true) {
    yield take(LOGOUT.type)
    yield put(LOGOUT())
    deleteCookie(COOKIELOGIN)
    localStorage.removeItem('LoginInfo')
  }
}

export function* callLoginAPI(username, password) {
  let state = yield select()
  const clientID = state.RegisterClientInfo[AUTHEN_HOSTNAME].ClientID
  const clientPrivateKey = state.RegisterClientInfo[AUTHEN_HOSTNAME].ClientPrivateKey
  yield put(LOGIN_REQUEST({
    Username: username,
    Password: password
  }))
  state = yield select()
  const loginData = CreateLoginData(username, password, state)
  const sendData = { ClientID: clientID, LoginData: loginData }
  const url = AUTHEN_HOST_BASEURL + "api/Authentication/Authenticate"
  const apiResult = yield call(WebRequest.postData, url, sendData)
  if (!apiResult.IsError) {
    const encryptedTokenString = apiResult.ResultObject.TokenString
    const plainTokenString = decryptData2(clientPrivateKey, 1024, encryptedTokenString)
    yield putResolve(LOGIN_SUCCESS({
      IsLoginSuccess: true,
      LoginUserInfo: apiResult.ResultObject.LoginUserInfo,
      TokenString: plainTokenString,
      Password: password
    }))
    state = yield select()
    const LoginInfo = JSON.stringify(state.LoginInfo)
    localStorage.setItem('LoginInfo', LoginInfo)
    setCookie(COOKIELOGIN, LoginInfo, SESSION_EXPIRE_MINUTE)
  } else {
    yield put(LOGIN_FAILURE({
      ErrorMessage: apiResult.Message
    }))
  }
  return apiResult
}

export function* callLogin(username, password) {
  let RegisterClientInfo = yield select(state => state.RegisterClientInfo)
  if (!CheckIsRegisterClient(RegisterClientInfo[AUTHEN_HOSTNAME])) {
    yield call(callRegisterClient)

    RegisterClientInfo = yield select(state => state.RegisterClientInfo)
    if (RegisterClientInfo[AUTHEN_HOSTNAME].IsRegisterClientSuccess && RegisterClientInfo[AUTHEN_HOSTNAME].IsRegisterClientSuccess) {
      yield call(callLoginAPI, username, password)
    }
  } else {
    const apiResult = yield call(callLoginAPI, username, password)
    if (apiResult.StatusID == 7) {
      const db = new indexedDBLib(CLIENT_INFO_OBJECT_STORENAME)
      yield call([db, db.delete], AUTHEN_HOSTNAME)
      yield call(callRegisterClient)

      RegisterClientInfo = yield select(state => state.RegisterClientInfo)
      if (RegisterClientInfo[AUTHEN_HOSTNAME].IsRegisterClientSuccess && RegisterClientInfo[AUTHEN_HOSTNAME].IsRegisterClientSuccess) {
        yield call(callLoginAPI, username, password)
      }
    }
  }
}