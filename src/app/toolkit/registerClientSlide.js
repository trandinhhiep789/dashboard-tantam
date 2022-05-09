import indexedDBLib from '~/library/indexedDBLib'
import { GUID } from '~/library/AuthenLib'
import WebRequest from '~/library/net/WebRequest'

import {
  REGISTER_CLIENT_REQUEST,
  REGISTER_CLIENT_SUCCESS,
  REGISTER_CLIENT_FAILURE,
  REGISTER_CLIENT_LOAD_FROM_LOCAL
} from '../constants/actionTypes'
import {
  AUTHEN_HOSTNAME,
  AUTHEN_HOST_BASEURL,
  API_HOST_LIST,
  CLIENT_INFO_OBJECT_STORENAME
} from '../constants/systemVars.js'

import { GenRSAKey, decryptData2 } from '~/utils/dotNetRSACrypto'

export function registerClientLoadFromLocal(hostname, clientInfo) {
  return {
    type: REGISTER_CLIENT_LOAD_FROM_LOCAL,
    Hostname: hostname,
    ClientInfo: clientInfo
  }
}

export function registerClientRequest(hostname, ClientID, ClientPublicKey, ClientPrivateKey) {
  // console.log(REGISTER_CLIENT_REQUEST);
  return {
    type: REGISTER_CLIENT_REQUEST,
    Hostname: hostname,
    ClientID: ClientID,
    ClientPublicKey: ClientPublicKey,
    ClientPrivateKey: ClientPrivateKey
  }
}

export function callRegisterClientFromServer(hostname, username, password) {
  return (dispatch, getState) => {
    const key = GenRSAKey(1024)
    const clientID = GUID()
    dispatch(registerClientRequest(hostname, clientID, key.PublicKey, key.PrivateKey))
    const sendData = {
      ClientID: clientID,
      UserName: username,
      Password: password,
      ClientPublicKey: key.PublicKey
    }

    const url = API_HOST_LIST[hostname].HostBaseURL + 'api/RegisterClient/Register'
    //  console.log("url:", url);
    return WebRequest.postData(url, sendData)
      .then(apiResult => {
        if (apiResult.StatusID == 0) {
          //console.log(apiResult);
          const encryptedServerPublicKey = apiResult.ResultObject.ServerPublicKey
          console.log('encryptedServerPublicKey:', encryptedServerPublicKey)
          const plainServerPublicKey = decryptData2(key.PrivateKey, 1024, encryptedServerPublicKey)
          console.log('plainServerPublicKey:', plainServerPublicKey)

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
          db.set(hostname, saveRegisterClientData).catch(error => {
            console.log('callRegisterClientFromServer:', error)
          })
          dispatch(registerClientSuccess(hostname, plainServerPublicKey))

          //   console.log("after dispatch(registerClientSuccess)");
          //this.callLogin(username,password);
          return {
            IsError: false,
            Message: apiResult.Message
          }
        } else {
          //  console.log(apiResult.Message);
          dispatch(registerClientFailure(hostname, apiResult.Message))
          return {
            IsError: true,
            Message: apiResult.Message
          }
        }
      })
      .catch(err => {
        console.error(err)
        dispatch(registerClientFailure(hostname, 'Lỗi đăng ký client: không kết nối được với máy chủ'))
        return {
          IsError: true,
          Message: 'Lỗi đăng ký client: không kết nối được với máy chủ'
        }
      })
  }
}

export function registerClientFailure(hostname, errorMessage) {
  //console.log(REGISTER_CLIENT_FAILURE);
  return {
    type: REGISTER_CLIENT_FAILURE,
    Hostname: hostname,
    ErrorMessage: errorMessage
  }
}

export function registerClientSuccess(hostname, serverPublicKey) {
  //console.log(REGISTER_CLIENT_SUCCESS);
  return {
    type: REGISTER_CLIENT_SUCCESS,
    Hostname: hostname,
    ServerPublicKey: serverPublicKey
  }
}

export function callRegisterClient(hostname, username, password) {
  return (dispatch, getState) => {
    const db = new indexedDBLib(CLIENT_INFO_OBJECT_STORENAME)
    return db
      .get(hostname)
      .then(result => {
        if (result != null) {
          dispatch(registerClientLoadFromLocal(hostname, result))
          return {
            IsError: false,
            Message: 'Load register client from DB OK!'
          }
        } else {
          return dispatch(callRegisterClientFromServer(hostname, username, password))
        }
      })
      .catch(error => {
        console.log('callRegisterClient: ', error)
        return dispatch(callRegisterClientFromServer(hostname, username, password))
      })
  }
}
