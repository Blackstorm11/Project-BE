import React from "react";
import { useState } from "react";
import { Formik, Form, Field } from 'formik';
import "./attendance_log.css";
import Navbar from "../Navbar/Navbar";

function InteractWAttendance(){

   const [editRowIndex, setEditRowIndex] = useState(null);
    //form data for month and year
    const [attendanceData, setAttendanceData] = useState([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newData, setNewData] = useState({ name: '', person: '', Status: '', created_at: '' });
   
    const [updatedData, setUpdatedData] = useState({
      index: null,
      Status: '',
    });

  const handleSubmit = async (values) => {
    const { month, year } = values;

    try {
      const response = await fetch(
        `http://localhost:3001/attendanceLog/month/${year}/${month}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAttendanceData(data);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (index) => {
   setEditRowIndex(index);
 };
  
 const handleOptionChange = (option) => {
   setUpdatedData((prevData) => ({
     ...prevData,
     Status: option,
   }));
 };
 
 const handleUpdate = async (index) => {
   const selectedData = attendanceData[index];
   const { person } = selectedData;
   const { Status } = updatedData;
 
   try {
     const response = await fetch(`http://localhost:3001/attendanceLog/rollNo/update-Status/${person}`, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('token')}`,
       },
       body: JSON.stringify({ Status }),
     });
 
     // Handle the response as needed
     console.log(response);
   } catch (error) {
     // Handle any errors
     console.error(error);
   }
 };
 

 const handleDelete = async (person) => {
   const response = await fetch(`http://localhost:3001/attendanceLog/rollNo/delete-user/${person}`, {
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json',
       Authorization: `Bearer ${localStorage.getItem('token')}`,
     },
   });
 
   // Handle the response as needed
 };

 const handleCreate = async() => {
   
   const response = await fetch("http://localhost:3001/attendanceLog/addlogs", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(newData)
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
   console.log('Create new data:', newData);
   // Reset the form
   setNewData({ name: '', person: '', Status: '', created_at: '',subject:'' });
   // Close the create form
   setIsCreateOpen(false);
 };
      return(
         <>
         <Navbar/>
      
            <Formik initialValues={{ month: '', year: '' }} onSubmit={handleSubmit}>
               <Form>
                  <label htmlFor="month">Choose a month:</label>
                  <Field as="select" name="month" id="month">
                     <option value="">Select</option>
                     <option value="1">01</option>
                     <option value="2">02</option>
                     <option value="3">03</option>
                     <option value="4">04</option>
                     <option value="5">05</option>
                     <option value="6">06</option>
                     <option value="7">07</option>
                  </Field>

                  <label htmlFor="year">Choose a year:</label>
                  <Field as="select" name="year" id="year">
                     <option value="">Select</option>
                     <option value="2022">2022</option>
                     <option value="2023">2023</option>
                     <option value="2024">2024</option>
                     {/* Add options for other years */}
                  </Field>

                  <button type="submit">Submit</button>
               </Form>
            </Formik>

            <div className="container3">
            <div className="box4">
            <button onClick={() => setIsCreateOpen(true)}>Create</button>
      {isCreateOpen && (
        <div>
          <h3>Create New Data</h3>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={newData.name} onChange={(e) => setNewData({ ...newData, name: e.target.value })} />

            <label htmlFor="person">RollNO:</label>
            <input type="text" id="person" value={newData.person} onChange={(e) => setNewData({ ...newData, person: e.target.value })} />

            <label htmlFor="status">Status:</label>
            <input type="text" id="status" value={newData.Status} onChange={(e) => setNewData({ ...newData, Status: e.target.value })} />
            <label htmlFor="status">subject:</label>
            <input type="text" id="status" value={newData.subject} onChange={(e) => setNewData({ ...newData, subject: e.target.value })} />

            <label htmlFor="created_at">Created At:</label>
            <input type="text" id="created_at" value={newData.created_at} onChange={(e) => setNewData({ ...newData, created_at: e.target.value })} />

            <button type="button" onClick={handleCreate}>Submit</button>
          </form>
        </div>
      )} 
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
              {attendanceData.map((data, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{data.name}</td>
    <td>{data.person}</td>
    <td>{data.Status}</td>
    <td>{data.created_at}</td>
    <td>
  {editRowIndex === index ? (
    <div>
      {editRowIndex === index ? (
        <div>
          <label>
            <input
              type="radio"
              name={`option_${index}`}
              value="Present"
              checked={updatedData.Status === 'Present'}
              onChange={() => handleOptionChange('Present')}
            />
            Present
          </label>
          <label>
            <input
              type="radio"
              name={`option_${index}`}
              value="Absent"
              checked={updatedData.Status === 'Absent'}
              onChange={() => handleOptionChange('Absent')}
            />
            Absent
          </label>
          <button onClick={() => handleUpdate(index,data.person)}>Update</button>
        </div>
      ) : null}
      <button onClick={() => handleDelete(data.person)}>Delete</button>
    </div>
  ) : (
    <button onClick={() => handleEdit(index)}>Edit</button>
  )}
</td>

  </tr>
))}

              </tbody>
            </table>
            </div></div></>
          
      )
}
export default InteractWAttendance;