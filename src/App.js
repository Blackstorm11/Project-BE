import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Adminlogin from "./pages/Adminlogin";
import ProtectRoute from "./ProtectRoute"
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

function App() {
  // const user = useUser();
  return (
    <>
    
   
      {/* {user == null ? 
        <div className="taxt-center">
				
					<h1>LIFE</h1>
					
					<p>Sign in with Google to use the app.</p>
				</div>
				
				: */}
        <ToastContainer autoClose={3000} position={"top-left"}/>
        <Routes>
        <Route path="/" exact element={<Adminlogin />} />
          {/* <Route path="/add" element={<Adduser />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pass" element={<Fpass />} />
         
          <Route path="/reset" element={<Resetpw />} />
          <Route path="/logout" element={<Logout />} />
  
          <Route path="/register" element={<Register />} />
          <Route path="/time_table" element={<Timetable_log />} />
          <Route path="/attendance_log" element={<Attendance_log />} />
          <Route path="/face" element={<FaceRecognition />} />
        </Routes>
      
    </>
  );
}


export default App;
