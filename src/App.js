import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Adminlogin from "./pages/Adminlogin";
// import ProtectedRoute from "./ProtectRoute";
import { Navigate } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import Fpass from "./components/Cards/Forgot_pass/Fpass";
import 'react-toastify/dist/ReactToastify.css';
import Resetpw from "./components/Cards/Reset_password/Resetpw";
import Logout from "./pages/Logout";
import { ToastContainer, toast } from 'react-toastify';
import Register from "./components/Cards/Register_page/Register";
import Timetable from "./components/Cards/Time_Tables/Timetables";
import Attendance_log from "./pages/Attendance_log";
import Timetable_log from "./pages/Timetable_log";
import FaceRecognition from "./components/faceRecognition/recognition";
import useUser from "./hooks/useUser";
import Header from "./components/Header";
import Login from "./components/Cards/Login/Login";
import FApp from "./components/faceRecognition/switchCam";
import { FinalLabelsProvider } from "./components/faceRecognition/finallabelContext"
import Upload from "./components/Cards/Register_page/upload";
import {FinalSubjectProvider} from "./components/faceRecognition/finalSubjectContext"
import InteractWAttendance from "./components/Log/InteractWAttendance"
import Main_register from "./components/Cards/Register_page/Main_register"
import T_register from './components/Cards/Register_page/T_register'

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "Admin") {
    return <Navigate to="/" />;
  }

  return <>{element}</>
};
function App() {
  // const user = useUser();
  return (
    <>
        <ToastContainer autoClose={3000} position={"top-left"}/>
        <FinalLabelsProvider>
        <FinalSubjectProvider>
        <Routes> 
        <Route path="/" exact element={<Adminlogin />} />
          {/* <Route path="/add" element={<Adduser />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pass" element={<Fpass />} />
         
          <Route path="/reset" element={<Resetpw />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/register" element={<Register />} />
          <Route path="/m_register" element={<Main_register/>} />
          <Route path="/t_register" element={<T_register/>} />
          <Route path="/time_table" element={<Timetable_log />} />
          
          <Route path="/attendance_log" element={<Attendance_log />} />
          <Route path="/interact" element={<InteractWAttendance/>}/>
          
          <Route path="/secondFace" element={<FApp/>}/> 
          <Route path="/upload" element={<Upload/>}/>
           
          <Route
              path="/face"
              element={
                <ProtectedRoute element={<FaceRecognition />} />
              }
            />
          </Routes>
        </FinalSubjectProvider>
        </FinalLabelsProvider>
    </>
  );
}


export default App;
