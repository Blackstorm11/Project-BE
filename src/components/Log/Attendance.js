import React, { useState, useEffect ,useContext} from "react";
import "./attendance_log.css";
import { FinalLabelsContext } from "../faceRecognition/finallabelContext";
import { FinalSubjectContext } from "../faceRecognition/finalSubjectContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const Attendance = () => {
  const [results, setResult] = useState([]);
  const nevigate=useNavigate()
  const [formattedDateTime, setFormattedDateTime] = useState(null);
  const { finalLabels } = useContext(FinalLabelsContext);
  const {scheduledSubject}=useContext(FinalSubjectContext)
  console.log(scheduledSubject)
  console.log(finalLabels)

  

  useEffect(() => {
    const currentTime = new Date();
    const formattedDateTime = currentTime.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    setFormattedDateTime(formattedDateTime);
    getData(formattedDateTime);
  }, [formattedDateTime]);
  const getData = () => {
    const fetchRollNo = fetch("http://localhost:3001/track/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => response.json());
    
    const attendanceDATA = () => {
      return new Promise((resolve, reject) => {
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");
        if (role !== "Admin") {
          console.log("faculty");
          fetch(`http://localhost:3001/faculty-m/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((response) => response.json())
            .then((userData) => {
              const subject = userData.subject;
              fetch(`http://localhost:3001/faculty-m/get/${subject}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data); // Resolve the promise with the fetched data
                  const attendanceLog=data.attendanceLog;
                  resolve(attendanceLog)
                })
                .catch((error) => {
                  console.error(error);
                  reject(error); // Reject the promise with the error
                });
            })
            .catch((error) => {
              console.error(error);
              reject(error); // Reject the promise with the error
            });
        } else {
          console.log("admin");
          fetch("http://localhost:3001/attendanceLog", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              const attendanceLog=data
              resolve(attendanceLog); // Resolve the promise with the fetched data
            })
            .catch((error) => {
              console.error(error);
              reject(error); // Reject the promise with the error
            });
        }
      });
    };
    Promise.all([fetchRollNo, attendanceDATA(),finalLabels,scheduledSubject])
    .then(([res1, res2,res3]) => {
      // Extract the rollNo values from res1
      const rollNoArray = res1.map((item) => item.rollNo);
      // const nameArray=res1.map((item)=> item.name)
      const attendanceLog=res2
      // Extract the person values from res2
      // const personArray = res2.map((item) => item.person);
     
      // Determine the result for each rollNo
      const results = rollNoArray.map((rollNo) => ({
        rollNo: rollNo,
        result: res3.includes(rollNo) ? "Present" : "Absent",
        
      }));
      console.log(formattedDateTime)
      console.log(results)
      if (finalLabels !== null && finalLabels.length !== 0) {
      const sendResults = async (results) => {
        try {
          for (const { rollNo, result } of results) {
            const data = {
              person: rollNo,
              Status: result,
              created_at:formattedDateTime,
              subject:scheduledSubject
            };
              console.log(data)
            const response = await fetch("http://localhost:3001/attendanceLog/addlogs", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(data)
            });
      
            if (response.ok) {
              // Request succeeded
              const responseData = await response.json();
              // Process the response data if needed
              console.log("Request succeeded:", responseData);
            } else {
              // Request failed
              console.log("Request failed:", response.status, response.statusText);
            }
          }
        } catch (error) {
          console.error("Error sending results:", error);
        }
      };
      
      // Usage
      sendResults(results);
    }
      setResult({ rollNoData: res1,attendanceLog,  results });
    })
    .catch((error) => console.error("Error fetching data:", error));
  

  
  };
  
  useEffect(() => {
    getData();
  }, []);
  const handleChange=()=>{
    const role = localStorage.getItem("role");
    if(role == "Reader"){
      toast.error("Unauthorized")
    }
    else{
      nevigate('/interact')
    }
   
  }


  // Toggle Content
  const [show, setShow] = useState(false);
  const [show1,setShow1]=useState(false)
  const handleClick=()=>{
    if(show){
      setShow(false);
      setShow1(true);
    }
    else{
      setShow1(true);
      setShow(false)
    }
  }
  const handleClick1=()=>{
    if (show){
      setShow1(false)
      setShow(true)

    }else{
      setShow(true)
      setShow1(false
        )
    }
  }

  return (
    <>
      <div className="container3">
        <div className="box4">
          <br />
          <center>
            <h1>Attendance Log</h1>
          </center>
          <br />
          <div className="a_users">
            <div className="a_card">
              <h4>FY</h4>
              <button>Click </button>
            </div>

            <div className="a_card">
              <h4>SY</h4>
              <button>Click</button>
            </div>

            <div className="a_card">
              <h4>TY</h4>
              <button>Click</button>
            </div>

            <div className="a_card">
              <h4>BE</h4>
              <button onClick={handleClick1}>Click </button>
            </div>
          </div>
          <br />
          <button type="toggle" onClick={handleClick}>HIstory</button>
          <br />
           
          
          {/* Toggle Content */}
          {show && (
            
            <table>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>Status</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody>
              {results.rollNoData.map((data, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{data.name}</td>
    <td>{data.rollNo}</td>
    <td>{results.results[index].result}</td>
    <td>{formattedDateTime}</td> {/* Display fetch date and time */}
  </tr>
))}

              </tbody>
            </table>
          )}
          {
            show1 &&(
             
              <table>
                <thead>
                  <tr>
                  <th>Sr.No</th>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>Status</th>
                  <th>Date/Time</th>
                  </tr>   
                  </thead>
                  <tbody onClick={handleChange}>
                  {results.attendanceLog && results.attendanceLog.map((data, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{data.name}</td>
    <td>{data.person}</td>
    
    <td>{data.Status}</td>
    <td>{data.created_at}</td>
  </tr>
))}
                  </tbody>
             
              </table>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Attendance;
