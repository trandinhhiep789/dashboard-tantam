import { createSlice } from "@reduxjs/toolkit";

const initialRegisterClientInfoState = {
  AuthenAPI: {
    IsRegisterClientRequest: false,
    ClientID: '',
    ClientPublicKey: '',
    ClientPrivateKey: ''
  }
};

const initialLoginInfoState = {
  IsLoginRequest: false,
  IsLoginCompleted: false,
  IsLoginSuccess: false,
  IsRelogin: false,
  IsLoginError: false,
  Username: "",
  Password: ""
};

const initialFetchAPIInfoState = {
  IsFetchAPIRequest: false,
  IsFetchAPICompleted: false,
  IsFetchAPISuccess: false,
  Hostname: "",
  HostURL: "",
  PostData: {},
  ResultMessage: "",
  ResultObject: {}
}

const initialGetCacheInfoState = {
  IsGetCacheRequest: false,
  IsGetCacheCompleted: false,
  IsGetCacheError: false,
  CacheKeyID: "",
  ResultMessage: "",
  ResultObject: {}
}

const initialPageInfoState = {
  PagePath: []
}

const initialModal = {
  type: null,
  props: {}
}

const registerClientInfo = createSlice({
  name: "registerClientInfo",
  initialState: initialRegisterClientInfoState,
  reducers: {
    REGISTER_CLIENT_LOADING: (state, action) => {
      return state
    },
    REGISTER_CLIENT_REQUEST: (state, action) => {
      const clientInfo1 = Object.assign({}, state[action.payload.Hostname],
        {
          IsRegisterClientRequest: true,
          IsRegisterClientCompleted: false,
          IsRegisterClientSuccess: false,
          IsRegisterClientError: false,

          ClientID: action.payload.ClientID,
          ClientPublicKey: action.payload.ClientPublicKey,
          ClientPrivateKey: action.payload.ClientPrivateKey
        });
      return Object.assign({}, state, {
        [action.payload.Hostname]: clientInfo1
      });
    },
    REGISTER_CLIENT_SUCCESS: (state, action) => {
      const clientInfo2 = Object.assign({}, state[action.payload.Hostname],
        {
          IsRegisterClientRequest: false,
          IsRegisterClientCompleted: true,
          IsRegisterClientSuccess: true,
          IsRegisterClientError: false,

          ServerPublicKey: action.payload.ServerPublicKey
        });
      return Object.assign({}, state, {
        [action.payload.Hostname]: clientInfo2
      });
    },
    REGISTER_CLIENT_FAILURE: (state, action) => {
      const clientInfo3 = Object.assign({}, state[action.payload.Hostname],
        {
          IsRegisterClientRequest: false,
          IsRegisterClientCompleted: true,
          IsRegisterClientSuccess: false,
          IsRegisterClientError: true,
          ErrorMessage: action.payload.ErrorMessage
        })

      return Object.assign({}, state, {
        [action.payload.Hostname]: clientInfo3
      });
    },
    REGISTER_CLIENT_LOAD_FROM_LOCAL: (state, action) => {
      const clientInfo4 = Object.assign({}, state[action.payload.Hostname],
        {
          IsRegisterClientRequest: action.payload.ClientInfo.IsRegisterClientRequest,
          IsRegisterClientCompleted: action.payload.ClientInfo.IsRegisterClientCompleted,
          IsRegisterClientSuccess: action.payload.ClientInfo.IsRegisterClientSuccess,
          IsRegisterClientError: action.payload.ClientInfo.IsRegisterClientError,

          ClientID: action.payload.ClientInfo.ClientID,
          ClientPublicKey: action.payload.ClientInfo.ClientPublicKey,
          ClientPrivateKey: action.payload.ClientInfo.ClientPrivateKey,
          ServerPublicKey: action.payload.ClientInfo.ServerPublicKey
        });
      return Object.assign({}, state, {
        [action.payload.Hostname]: clientInfo4
      });
    }
  }
})

const loginInfo = createSlice({
  name: "loginInfo",
  initialState: initialLoginInfoState,
  reducers: {
    LOGIN_REQUEST: (state, action) => {
      return Object.assign({}, state, {
        IsLoginRequest: true,
        IsLoginSuccess: false,
        IsLoginCompleted: false,
        IsLoginError: false,
        IsRelogin: false,
        Username: action.payload.Username,
        Password: action.payload.Password
      });
    },
    LOGIN_SUCCESS: (state, action) => {
      return Object.assign({}, state, {
        IsLoginRequest: false,
        IsLoginCompleted: true,
        IsLoginSuccess: true,
        IsLoginError: false,
        IsRelogin: false,
        LoginUserInfo: action.payload.LoginUserInfo,
        TokenString: action.payload.TokenString,
        Username: action.payload.LoginUserInfo.UserName,
        Password: action.payload.Password
      })
    },
    LOGIN_FAILURE: (state, action) => {
      return Object.assign({}, state, {
        IsLoginRequest: false,
        IsLoginCompleted: true,
        IsLoginSuccess: false,
        IsLoginError: true,
        IsRelogin: false,
        ErrorMessage: action.payload.ErrorMessage
      })
    },
    LOGOUT: (state, action) => {
      return Object.assign({}, state, {
        IsLoginCompleted: false,
        IsLoginSuccess: false,
        IsLogout: true,
        IsRelogin: false,
        LoginUserInfo: {},
        TokenString: ""
      })
    },
    LOGIN_RELOGIN: (state, action) => {
      return Object.assign({}, state, {
        IsLoginCompleted: false,
        IsLoginSuccess: false,
        IsLogout: false,
        IsRelogin: true,
        LoginUserInfo: {},
        TokenString: ""
      })
    }
  }
})

const fetchAPIInfo = createSlice({
  name: "fetchAPIInfo",
  initialState: initialFetchAPIInfoState,
  reducers: {
    FETCH_API_REQUEST: (state, action) => {
      return Object.assign({}, state, {
        IsFetchAPIRequest: true,
        IsFetchAPICompleted: false,
        IsFetchAPISuccess: false,
        IsFetchAPIError: false,
        Hostname: action.payload.Hostname,
        HostURL: action.payload.HostURL,
        PostData: action.payload.PostData
      })
    },
    FETCH_API_SUCCESS: (state, action) => {
      return Object.assign({}, state, {
        IsFetchAPIRequest: false,
        IsFetchAPICompleted: true,
        IsFetchAPISuccess: true,
        IsFetchAPIError: false,
        ResultMessage: action.payload.ResultMessage,
        ResultObject: action.payload.ResultObject
      })
    },
    FETCH_API_FAILURE: (state, action) => {
      return Object.assign({}, state, {
        IsFetchAPIRequest: false,
        IsFetchAPICompleted: true,
        IsFetchAPISuccess: false,
        IsFetchAPIError: true,
        ErrorStatus: action.payload.ErrorStatus,
        ResultMessage: action.payload.ResultMessage
      })
    },
    CHECK_PERMISSION_SUCCESS: (state, action) => {
      return Object.assign({}, state, {
        IsFetchAPIRequest: false,
        IsFetchAPICompleted: true,
        IsFetchAPISuccess: false,
        IsFetchAPIError: true,
        ErrorStatus: action.payload.ErrorStatus,
        ResultMessage: action.payload.ResultMessage
      })
    }
  }
})

const getCacheInfo = createSlice({
  name: "getCacheInfo",
  initialState: initialGetCacheInfoState,
  reducers: {
    GET_CACHE_REQUEST: (state, action) => {
      return Object.assign({}, state, {
        IsGetCacheRequest: true,
        IsGetCacheCompleted: false,
        IsGetCacheError: false,
        CacheKeyID: action.payload.CacheKeyID
      })
    },
    GET_CACHE_SUCCESS: (state, action) => {
      return Object.assign({}, state, {
        IsGetCacheRequest: false,
        IsGetCacheCompleted: true,
        IsGetCacheError: false,
        ResultMessage: action.payload.ResultMessage,
        ResultObject: action.payload.ResultObject
      })
    },
    GET_CACHE_FAILURE: (state, action) => {
      return Object.assign({}, state, {
        IsGetCacheRequest: false,
        IsGetCacheCompleted: true,
        IsGetCacheError: true,
        ErrorStatus: action.payload.ErrorStatus,
        ResultMessage: action.payload.ResultMessage
      })
    },
    GET_CACHE_FROM_LOCAL: (state, action) => {
      return Object.assign({}, state, {
        IsGetCacheRequest: false,
        IsGetCacheCompleted: true,
        IsGetCacheError: false,
        ResultMessage: action.payload.ResultMessage,
        ResultObject: action.payload.ResultObject
      })
    }
  }
})

const pageInfo = createSlice({
  name: "pageInfo",
  initialState: initialPageInfoState,
  reducers: {
    PAGE_UPDATEPATH: (state, action) => {
      return Object.assign({}, state, { PagePath: action.PagePath })
    }
  }
})

const modalInfo = createSlice({
  name: "modalInfo",
  initialState: initialModal,
  reducers: {
    SHOW_MODAL: (state, action) => {
      return Object.assign({}, state, {
        type: action.payload.type,
        props: action.payload.props
      })
    },
    HIDE_MODAL: (state, action) => {
      return {
        type: null,
        props: {
          modalID: action.modalID
        }
      }
    }
  }
})

export const { REGISTER_CLIENT_REQUEST, REGISTER_CLIENT_SUCCESS, REGISTER_CLIENT_FAILURE, REGISTER_CLIENT_LOAD_FROM_LOCAL, REGISTER_CLIENT_LOADING } = registerClientInfo.actions
export const { LOGIN_REQUEST, LOGIN_RELOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } = loginInfo.actions
export const { CHECK_PERMISSION_SUCCESS, FETCH_API_FAILURE, FETCH_API_REQUEST, FETCH_API_SUCCESS } = fetchAPIInfo.actions
export const { GET_CACHE_FAILURE, GET_CACHE_FROM_LOCAL, GET_CACHE_REQUEST, GET_CACHE_SUCCESS } = getCacheInfo.actions
export const { PAGE_UPDATEPATH } = pageInfo.actions
export const { HIDE_MODAL, SHOW_MODAL } = modalInfo.actions

export const registerClientInfoSlice = registerClientInfo.reducer
export const loginInfoSlice = loginInfo.reducer
export const fetchAPIInfoSlice = fetchAPIInfo.reducer
export const getCacheInfoSlice = getCacheInfo.reducer
export const pageInfoSlice = pageInfo.reducer
export const modalInfoSlide = modalInfo.reducer