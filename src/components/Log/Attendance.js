import React, { useState, useEffect } from "react";
import "./attendance_log.css";

const Attendance = () => {
  const [result, setResult] = useState([]);

  const getData = () => {
    fetch("http://localhost:3001/attendanceLog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((res) => setResult(res))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    getData();
  }, []);

  // Toggle Content
  const [show, setShow] = useState(false);

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
              <button onClick={() => setShow(!show)}>Click </button>
            </div>
          </div>
          <br />
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
                {result.map((res,index) => (
                  <tr key={res._id}>
                  <td>{index + 1}</td>
                    {/* <td>{res._id}</td> */}
                    <td>{res.person}</td>
                    <td>{res.Status}</td>
                    <td>{res.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Attendance;
