import React, { useState, useEffect ,useContext} from "react";
import "./attendance_log.css";
import { FinalLabelsContext } from "../faceRecognition/finallabelContext";

const Attendance = () => {
  const [results, setResult] = useState([]);
  const [fetchDateTime, setFetchDateTime] = useState(null);
  const { finalLabels } = useContext(FinalLabelsContext);
  console.log(finalLabels)
  const getData = () => {
    const fetchRollNo = fetch("http://localhost:3001/track/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => response.json());
    
    const currentDateTime = new Date(); // Fetch the current date and time
    setFetchDateTime(currentDateTime);

    const fetchAttendanceLog = fetch("http://localhost:3001/attendanceLog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => response.json());
  
    Promise.all([fetchRollNo, fetchAttendanceLog,finalLabels])
    .then(([res1, res2,res3]) => {
      // Extract the rollNo values from res1
      const rollNoArray = res1.map((item) => item.rollNo);
  
      // Extract the person values from res2
      const personArray = res2.map((item) => item.person);
     
      // Determine the result for each rollNo
      const results = rollNoArray.map((rollNo) => ({
        rollNo: rollNo,
        result: res3.includes(rollNo) ? "Present" : "Absent",
        
      }));
      console.log(results)
  
      setResult({ rollNoData: res1, attendanceLogData: res2, results });
    })
    .catch((error) => console.error("Error fetching data:", error));
  

  
  };
  
  useEffect(() => {
    getData();
  }, []);

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
                  {/* <th>Roll No</th> */}
                  <th>Status</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody>
              {results.rollNoData.map((data, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{data.rollNo}</td>
    <td>{results.results[index].result}</td>
    <td>{fetchDateTime.toLocaleString()}</td> {/* Display fetch date and time */}
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
                  <th>RollNo</th>
                  <th>Status</th>
                  <th>Date/time</th>
                  </tr>   
                  </thead>
                  <tbody>
                    {
                      results.attendanceLogData.map((res2,index)=>(
                        <tr ket={index}>
                          <td>{index+1}</td>
                          <td>{res2.person}</td>
                          <td>{res2.Status}</td>
                          <td>{res2.created_at}</td>
                        </tr>
                      ))
                    }
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
