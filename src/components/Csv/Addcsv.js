import { useState } from "react";
import { Data } from "./Data";
import * as XLSX from "xlsx";
import "./csv.css";

function Addcsv() {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    const fileType = [
      ".csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          console.log(e.target.result);
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel or csv file types");
        setExcelFile(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      console.log(data)
    }
    else{
      setExcelData(null);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
    
            <h5 style={{color:'white'}}>Upload Excel file</h5>
      
          <br></br>
          <input
            type="file"
            className="form-control"
            onChange={handleFile}
            required
          ></input>
          <br />
          <div className="text-danger">{excelFileError}</div>
          <button  type="submit" className="btn1 btn-success">
            Submit
          </button>
          &nbsp;&nbsp;
          <button type="submit" className="btn1 btn-success">
            Add Users
          </button>
        </form>
      </div>

      <br></br>
      <hr></hr>

        <h5 style={{color:'white'}}>View Excel file</h5>
      <div className="viewer">
        <h6 style={{color:'white'}}>{excelData === null && <> No file selected</>}</h6>
        {excelData !== null && (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Github Username</th>
                  <th scope="col">Office Email</th>
                </tr>
              </thead>
              <tbody>
                <Data excelData={excelData} />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Addcsv;
