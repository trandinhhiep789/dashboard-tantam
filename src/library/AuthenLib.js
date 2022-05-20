import { AUTHEN_HOSTNAME } from '~/app/constants/systemVars'
import { encryptData2 } from './cryptography/CSRSACryptography'

export function GUID() {
  function _p8(s) {
    var p = (Math.random().toString(16) + '000000000').substr(2, 8)
    return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p
  }
  return _p8() + _p8(true) + _p8(true) + _p8()
}

export function ConvertStr(intNum) {
  if (intNum > 9) return intNum.toString()
  return '0' + intNum.toString()
}

export function createIV() {
  const d = new Date()
  const month = d.getMonth() + 1

  const dateString =
    d.getFullYear().toString() +
    ConvertStr(d.getMonth() + 1) +
    ConvertStr(d.getDate()) +
    '.' +
    ConvertStr(d.getHours()) +
    ConvertStr(d.getMinutes())
  return dateString
}

export function CreateLoginData(username, password, state) {
  const serverPublicKey = state.RegisterClientInfo[AUTHEN_HOSTNAME].ServerPublicKey
  const passowrdMD5 = password
  const loginData = username + '|' + passowrdMD5 + '|100|2|'
  const encryptLoginData = encryptData2(serverPublicKey, 1024, loginData)
  return encryptLoginData
}

export function CreateAuthenData(hostname, state) {
  const serverPublicKey = state.RegisterClientInfo[hostname].ServerPublicKey
  const tokenString = state.LoginInfo.TokenString
  const authenData = tokenString + '|' + createIV()
  const encryptAuthenData = encryptData2(serverPublicKey, 1024, authenData)
  return encryptAuthenData
}

export function CheckIsRegisterClient(registerClientInfo) {
  if (typeof registerClientInfo == 'undefined') return false
  if (registerClientInfo.ServerPublicKey == null) return false

  if (registerClientInfo.ServerPublicKey.length == 0) return false
  return registerClientInfo.IsRegisterClientSuccess
}
