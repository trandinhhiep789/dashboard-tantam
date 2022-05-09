import {
  AUTHEN_HOSTNAME,
  AUTHEN_HOST_BASEURL,
  CLIENT_INFO_OBJECT_STORENAME,
  COOKIELOGIN
} from '../constants/systemVars.js'
import WebRequest from '~/library/net/WebRequest'
import { callRegisterClient } from '~/app/toolkit/registerClientSlide'
import indexedDBLib from '~/library/indexedDBLib.js'
import { CreateLoginData, CheckIsRegisterClient } from '~/library/AuthenLib.js'
import { deleteCookie } from '~/library/CommonLib.js'

export function loginRequest(username, password) {
  return {
    type: 'LOGIN_REQUEST',
    Username: username,
    Password: password
  }
}

export function loginSuccess(loginUserInfo, tokenString, password) {
  return {
    type: 'LOGIN_SUCCESS',
    IsLoginSuccess: true,
    LoginUserInfo: loginUserInfo,
    TokenString: tokenString,
    Password: password
  }
}

export function loginFailure(errorMessage) {
  return {
    type: 'LOGIN_FAILURE',
    ErrorMessage: errorMessage
  }
}

export function logout() {
  return {
    type: 'LOGOUT'
  }
}

export function relogin() {
  return {
    type: 'LOGIN_RELOGIN'
  }
}

export function calllogout() {
  return (dispatch, getState) => {
    deleteCookie(COOKIELOGIN)
    localStorage.removeItem('LoginInfo')
    return {
      type: 'LOGOUT'
    }
  }
}

export function callLogin(username, password) {
  return (dispatch, getState) => {
    const state = getState()
    if (state.LoginInfo.IsLoginSuccess || state.LoginInfo.IsLoginRequest) return
    if (!CheckIsRegisterClient(state.RegisterClientInfo[AUTHEN_HOSTNAME])) {
      return dispatch(callRegisterClient(AUTHEN_HOSTNAME, username, password)).then(registerResult => {
        if (!registerResult.IsError) {
          return dispatch(callLoginAPI(username, password))
        } else {
          return {
            IsError: true,
            StatusID: 100,
            Message: registerResult.Message
          }
        }
      })
    } else {
      return dispatch(callLoginAPI(username, password)).then(apiResult => {
        if (apiResult.StatusID == 7) {
          const db = new indexedDBLib(CLIENT_INFO_OBJECT_STORENAME)
          db.delete(AUTHEN_HOSTNAME).catch(error => {
            console.log('Error Delete indexedDBLib key:', error)
          })

          return dispatch(callRegisterClient(AUTHEN_HOSTNAME, username, password)).then(registerResult => {
            if (!registerResult.IsError) {
              return dispatch(callLoginAPI(username, password))
            } else {
              return {
                IsError: true,
                StatusID: 100,
                Message: registerResult.Message
              }
            }
          })
        } else {
          return dispatch(callLoginAPI(username, password))
        }
      })
    }
  }
}

export function callLoginAPI(username, password) {
  return (dispatch, getState) => {
    const state = getState()

    const clientID = state.RegisterClientInfo[AUTHEN_HOSTNAME].ClientID
    const clientPrivateKey = state.RegisterClientInfo[AUTHEN_HOSTNAME].ClientPrivateKey
    //   console.log("callLogin:", state);
    dispatch(loginRequest(username, password))
    const loginData = CreateLoginData(username, password, state)
    //console.log("callLogin loginData:", loginData);
    const sendData = { ClientID: clientID, LoginData: loginData }
    const url = AUTHEN_HOST_BASEURL + 'api/Authentication/Authenticate'

    return WebRequest.postData(url, sendData)
      .then(apiResult => {
        if (!apiResult.IsError) {
          //console.log("Login OK:");
          //console.log(apiResult);
          const encryptedTokenString = apiResult.ResultObject.TokenString
          //console.log(encryptedServerPublicKey);

          const plainTokenString = window.decryptData2(clientPrivateKey, 1024, encryptedTokenString)
          //this.props.addLoginSuccess(apiResult.ResultObject.LoginUserInfo, plainTokenString);
          // console.log("callLogin apiResult:", apiResult);
          dispatch(loginSuccess(apiResult.ResultObject.LoginUserInfo, plainTokenString, password))
          //console.log(plainTokenString);

          //this.testCallServices();
          //this.setState({IsLoginOK: true});
          return {
            IsError: false,
            StatusID: apiResult.StatusID,
            Message: ''
          }
        } else {
          console.log('apiResult', apiResult)
          dispatch(loginFailure(apiResult.Message))
          return {
            IsError: true,
            StatusID: apiResult.StatusID,
            Message: apiResult.Message
          }
        }
      })
      .catch(err => {
        console.error(err)
        dispatch(loginFailure('Lỗi đăng nhập: không kết nối được với máy chủ'))
        return {
          IsError: true,
          StatusID: 100,
          Message: 'Lỗi đăng nhập: không kết nối được với máy chủ'
        }
      })
  }
}
