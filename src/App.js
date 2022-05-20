import { Route, Routes } from 'react-router-dom'
import Dashboard from '~/ui-component/dashboard/Dashboard'
import Login from '~/ui-component/login/Login'
import NotFound from './ui-component/not-found/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
