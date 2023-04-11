import React, { useState ,useEffect} from 'react';
import { Link} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import "./timetable.css"
import Subjects from './data.json'

function Timetables  ({handleRowClick}) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // console.log(Subjects)
  const currentDay = selectedDate.toLocaleString("en-us", { weekday: "long" });
  const subjectsForCurrentDay = Subjects[0][currentDay];
   console.log(currentDay)

  return (



   <>   

    <div className="container5">

       <div class="box5">
        <br></br>  <br></br>
        
        <div class="t_users">
        <div class="t_card">
          
          
      
          
          <h4>Semester VII</h4>
          
          <button>TimeTable</button>
        </div>

        <div class="t_card">
          
          <h4>Semester VIII</h4>
          
              <button > TimeTable</button>  
{/* hello */}

      </div>
      </div>
      <br></br>  <br></br>  <br></br>
                       {/* BE time table */}
{/* <table border="2" cellspacing="3" align="center">
<tr>
 <td align="center"> </td>
 <td>9:15-10:15 </td>
 <td>910:15-11:15 </td>
 <td>11:15-12:15 </td>
 <td>12:15-1:15 </td>
 <td>1:15-2:00 </td>
 <td>2:00-3:00 </td>
 <td>3:00-4:00 </td>
 <td>4:00-5:00 </td>
</tr>
<tr>
 <td align="center">MON</td>
 <td align="center">MSA</td>
 <td align="center">CTNS</td>
 <td align="center">NPTEL</td>
 <td align="center">MSA</td>
 <td rowspan="5"align="center">L<br></br>U<br></br>N<br></br>C<br></br>H</td>
 <td align="center">CTNS</td>
 <td align="center"></td>
 <td align="center"></td>
</tr>
<tr>
 <td align="center">TUE </td>
 <td colspan="4"align="center">PROJECT </td>
 <td colspan="3"align="center">PROJECT </td>
</tr> 
<tr>
 <td align="center">WED </td>
 <td align="center">MSA<br></br> </td>
 <td align="center">NPTEL<br></br> </td>
 <td align="center">CTNS<br></br> </td>
 <td align="center">MSA </td>
 <td colspan="3" align="center">NPTEL </td>
</tr>
<tr>
 <td align="center">THU </td>
 <td colspan="4"align="center">PROJECT </td>
 <td colspan="3"align="center">PROJECT </td>
</tr>
<tr>
 <td align="center">FRI </td>
 <td colspan="4"align="center">PROJECT </td>
 <td colspan="3"align="center">PROJECT </td>
</tr>
</table> */}
           

<div>
        <h2>Timetable</h2>
        <p>Select a date:</p>
        <input
          type="date"
          value={selectedDate.toISOString().substr(0, 10)}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(subjectsForCurrentDay).map((timeslot) => (
            <tr key={timeslot}>
              <td>{timeslot}</td>
              <td>{subjectsForCurrentDay[timeslot]}</td>
            </tr>
          ))}
        </tbody>
      </table>   
       

        <br></br>


       </div>
    </div>
    </> 
  );
}


export default Timetables;