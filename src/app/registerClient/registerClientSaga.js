import { call, put, putResolve, select, take, takeMaybe } from 'redux-saga/effects'
import { GUID } from '~/library/AuthenLib'
import indexedDBLib from '~/library/indexedDBLib'
import WebRequest from '~/library/net/WebRequest'
import { decryptData2, GenRSAKey } from '~/utils/dotNetRSACrypto'
import { API_HOST_LIST, AUTHEN_HOSTNAME, CLIENT_INFO_OBJECT_STORENAME } from '../constants/systemVars'
import { callLogin } from '../saga/loginSaga'
import { FETCH_API_FAILURE, LOGIN_RELOGIN, REGISTER_CLIENT_FAILURE, REGISTER_CLIENT_LOADING, REGISTER_CLIENT_LOAD_FROM_LOCAL, REGISTER_CLIENT_SUCCESS, REGISTER_CLIENT_REQUEST } from './registerClientSlice'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
export function* fetchApiFailure() {
  while (true) {
    const action = yield take(FETCH_API_FAILURE.type)
    const unAuthenStatus = [10, 11, 12, 13, 18];
    if (unAuthenStatus.includes(action.payload.ErrorStatus)) {
      yield put(LOGIN_RELOGIN());
    }
  }
}

export function* callRegisterClientFromServer(hostname, username, password) {
  try {
    const key = GenRSAKey(1024);
    const clientID = GUID();

    const sendData = {
      ClientID: clientID,
      UserName: username,
      Password: password,
      ClientPublicKey: key.PublicKey
    }

    const url = API_HOST_LIST[hostname].HostBaseURL + "api/RegisterClient/Register";

    yield putResolve(REGISTER_CLIENT_REQUEST({
      Hostname: hostname,
      ClientID: clientID,
      ClientPublicKey: key.PublicKey,
      ClientPrivateKey: key.PrivateKey
    }))

    const apiResult = yield call(WebRequest.postData, url, sendData)

    if (apiResult.StatusID == 0) {
      const encryptedServerPublicKey = apiResult.ResultObject.ServerPublicKey;
      const plainServerPublicKey = decryptData2(key.PrivateKey, 1024, encryptedServerPublicKey);

      const saveRegisterClientData = {
        IsRegisterClientRequest: false,
        IsRegisterClientCompleted: true,
        IsRegisterClientSuccess: true,
        IsRegisterClientError: false,
        ClientID: clientID,
        ClientPublicKey: key.PublicKey,
        ClientPrivateKey: key.PrivateKey,
        ServerPublicKey: plainServerPublicKey
      }

      const db = new indexedDBLib(CLIENT_INFO_OBJECT_STORENAME)
      yield call([db, db.set], hostname, saveRegisterClientData)
      yield put(REGISTER_CLIENT_SUCCESS({ Hostname: hostname, ServerPublicKey: plainServerPublicKey }))
    }
    else {
      yield put(REGISTER_CLIENT_FAILURE({ Hostname: hostname, ErrorMessage: apiResult.Message }))
      Notify.failure(apiResult.Message)
    }
  } catch (error) {
    console.error(error);
    yield put(REGISTER_CLIENT_FAILURE({ Hostname: hostname, ErrorMessage: "Lỗi đăng ký client: không kết nối được với máy chủ" }))
    Notify.failure("Lỗi đăng ký client: không kết nối được với máy chủ")
  }
}

export function* callRegisterClient() {
  while (true) {
    const action = yield take(REGISTER_CLIENT_LOADING.type)
    try {
      const db = new indexedDBLib(CLIENT_INFO_OBJECT_STORENAME)
      const result = yield call([db, db.get], action.payload.AUTHEN_HOSTNAME)
      if (result) {
        yield putResolve(REGISTER_CLIENT_LOAD_FROM_LOCAL({ Hostname: action.payload.AUTHEN_HOSTNAME, ClientInfo: result }))
      }
      else {
        yield call(callRegisterClientFromServer, action.payload.AUTHEN_HOSTNAME, action.payload.userName, action.payload.passWord)
      }

      let RegisterClientInfo = yield select(state => state.RegisterClientInfo)
      if (RegisterClientInfo[AUTHEN_HOSTNAME].IsRegisterClientCompleted && RegisterClientInfo[AUTHEN_HOSTNAME].IsRegisterClientSuccess) {
        yield call(callLogin, action.payload.userName, action.payload.passWord)
      }
    } catch (error) {
      console.error(error);
      yield call(callRegisterClientFromServer, action.payload.AUTHEN_HOSTNAME, action.payload.userName, action.payload.passWord)
    }
  }
}