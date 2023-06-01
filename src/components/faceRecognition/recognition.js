import React, { useEffect, useRef, useState,useContext } from "react";
import * as faceapi from "face-api.js";
import './face.css'
import { ResponsiveCalendar } from "react-responsive-calendar";
import { FinalLabelsContext } from "./finallabelContext"
import { useNavigate } from "react-router-dom";
import Schedule from "./shadule.json"
import {FinalSubjectContext} from "./finalSubjectContext"

function FaceRecognition() {
  const nevigate=useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { setFinalLabels } = useContext(FinalLabelsContext);
  const {setSubject}=useContext(FinalSubjectContext)



  useEffect(() => {
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    ])
      .then(startWebcam)
      .catch((error) => console.error(error));

    return () => {
      stopWebcam();
    };
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error(error);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const trainFaceRecognition = async () => {
    const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5);

    return faceMatcher;
  };

  const getLabeledFaceDescriptions = async () => {
    const labels = [
      'c19-01', 'c19-02', 'c19-04', 'c19-05', 'c19-07', 'c19-10',
      'c19-11', 'c19-12', 'c19-28', 'c19-29', 'c19-33', 
      'dc20-43', 'dc20-47', 'dc20-52'
    ];
    // const response=await fetch('http://localhost:3001/track/rollNo',{
    //   method:"GET",
    //   headers:{
    //     "content-type":"application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   }
    // });
    // if(response.ok){
    //   const labels=await response.json()
    

    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`/labeled_images/${label}/${i}.jpg`);
          const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          descriptions.push(detections.descriptor);
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      }))
    // ;}
    // else {
    //       console.error('Failed to fetch names:', response.status);
    //     }
  };

  const handleRecognizeFaces = async () => {
    const faceMatcher = await trainFaceRecognition();
  
    const displaySize = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    };
  
    faceapi.matchDimensions(canvasRef.current, displaySize);
  
    const recognizedLabels = []; // Array to store recognized labels
    const final_labels=[];
    const intervalId = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptors();
  
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
      canvasRef.current.getContext("2d").clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
  
      const results = resizedDetections.map((d) => {
        return faceMatcher.findBestMatch(d.descriptor);
      });
  
      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: result.toString().split(" ")[0],
        });
        drawBox.draw(canvasRef.current);
  
        if (result.distance <= 0.55) { // Add recognized label to the array if the distance is below or equal to the threshold
          recognizedLabels.push(result.toString().split(" ")[0]);

          const count = recognizedLabels.filter((label) => label === result.toString().split(" ")[0]).length;
          if (count > 40 && !final_labels.includes(result.toString().split(" ")[0])) {
            final_labels.push(result.toString().split(" ")[0]);
          }
        }
        
      });
    }, 500);
    
//     const sendLabelsToOneByOne = async (persons) => {
//      console.log(sendLabelsToOneByOne)
//         if (persons && persons.length > 0) {
//           for (let i = 0; i < persons.length; i++) {
            
//         const person = persons[i];
//         try {
//           const currentTime = new Date(); // Fetch the current date and time

// // Format the current time as a human-readable string
// const formattedDateTime = currentTime.toLocaleString("en-US", {
//   weekday: "long",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
//   hour: "numeric",
//   minute: "numeric",
//   second: "numeric",
// });
         
//           // Create the data object with the label and other data
//           const data = {
//             person: person,
//             created_at:currentTime
//             // Add any additional data you want to include
//           };
//           console.log(data)
//           // Make the API request to the endpoint with the data
//           const response = await fetch("http://localhost:3001/attendanceLog/logs", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//             body: JSON.stringify({person:person,created_at:formattedDateTime}),
//           });
    
//           // Handle the response from the API request
//           if (response.ok) {
//             // Request succeeded
//             const responseData = await response.json();
//             // Process the response data if needed
//             console.log("Request succeeded:", responseData);
//           } else {
//             // Request failed
//             console.log("Request failed:", response.status, response.statusText);
//           }
//         } catch (error) {
//           console.error("Error sending label:", error);
//         }
//       }}
//     };
    
    // Usage in handleRecognizeFaces function
    setTimeout(() => {
      clearInterval(intervalId);
      stopWebcam();
      console.log(recognizedLabels); // Output the recognized labels to the console
      console.log(final_labels);
      setFinalLabels(final_labels);
      // Send final_labels to endpoint one by one
      // sendLabelsToOneByOne(final_labels);
      
      nevigate('/attendance_log')
    }, 60 * 1000); // Stop after 2 minutes
  };
  //time interval which checks the shaduled time and current time if they are matched , end start the function based on result
  useEffect(() => {
    const checkScheduledTime = () => {
      const currentTime = new Date();
      const currentDay = currentTime.toLocaleString("en-US", { weekday: "long" });
      const currentTimeString = currentTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
  
      if (currentDay in Schedule) {
        const subjects = Schedule[currentDay];
  
        for (const [scheduledSubject, time] of Object.entries(subjects)) {
          const scheduledTime = new Date(`01/01/2023 ${time}`).getTime();
          const currentTime = new Date(`01/01/2023 ${currentTimeString}`).getTime();
  
          if (scheduledTime === currentTime) {
            console.log("done");
            handleRecognizeFaces();
            clearInterval(intervalId); // Stop further checks
            setSubject(scheduledSubject);
            console.log(scheduledSubject);
            console.log('done')
            break; // Stop checking further subjects
          } else {
            console.log("error");
          }
        }
      }
    };
  
    const intervalId = setInterval(checkScheduledTime, 60000); // Check every minute
  
    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [setSubject]);
  
  
  return (
    <>
      <div className="spaceForreco">
        <video ref={videoRef} autoPlay muted />
        <canvas ref={canvasRef} />
      </div>
      <div>
        <button onClick={handleRecognizeFaces}>Recognize</button>
      </div>
    </>
  );
}

export default FaceRecognition;
