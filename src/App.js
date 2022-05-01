
import {
  Routes,
  Route,
} from "react-router-dom";

import 'antd/dist/antd.css'

import Dashboard from "./ui-component/dashboard/Dashboard"
import Login from "./ui-component/login/Login"
import PrivateRoute from "./routes/PrivateRoute"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
