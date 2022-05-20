import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { COOKIELOGIN } from '~/app/constants/systemVars';
import { LOGIN_SUCCESS } from '~/app/registerClient/registerClientSlice';
import { getCookie } from '~/library/CommonLib';

const PrivateRoute = ({ children }) => {
  let sessionLogin = getCookie(COOKIELOGIN)
  const location = useLocation()

  if (sessionLogin) {
    return children
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}

PrivateRoute.displayName = 'PrivateRoute'

export default PrivateRoute