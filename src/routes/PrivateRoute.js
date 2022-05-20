import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute(props) {
  const LoginInfo = useSelector(state => state.LoginInfo)
  const auth = () => {
    if (LoginInfo.IsLoginCompleted && LoginInfo.IsLoginSuccess) return true
    return false
  }

  return auth() ? props.children : <Navigate to="/login" replace />
}