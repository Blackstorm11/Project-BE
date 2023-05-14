import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
// import onvif from "node-onvif";
import './face.css'

function FaceRecognition() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);


  useEffect(() => {
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models")
    ])
      .then(startWebcam)
      // .then(faceRecognition)
      .catch((error) => console.error(error));

    return () => {
      // Stop the webcam stream when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());  
        videoRef.current.srcObject = null;
      }
    };
  }, []);


  async function startWebcam() {
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error(error);
    }
  }

  async function getLabeledFaceDescriptions() {
    const labels = ['hrithik_kantak','lachlan_disilva','omkar_redkar','prajakta_kolambkar'];
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
      })
    );
  }
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    
    await faceRecognition();
    setIsLoading(false);
  };

  const recognizedPersons = [];

  // async function faceRecognition() {
  //   const labeledFaceDescriptors = await getLabeledFaceDescriptions();
  //   const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
  //   const threshold = 0.5;
  //   const recognizedPersons = [];
  
  //   videoRef.current.addEventListener("play", () => {
  //     const canvas = faceapi.createCanvasFromMedia(videoRef.current);
  //     document.body.append(canvas);
  //   });
  
  //   const displaySize = {
  //     width: videoRef.current.videoWidth,
  //     height: videoRef.current.videoHeight,
  //   };
  
  //   faceapi.matchDimensions(canvasRef.current, displaySize);
  
  //   let bestMatchLabel = null;
  
  //   setInterval(async () => {
  //     const detections = await faceapi
  //       .detectAllFaces(videoRef.current)
  //       .withFaceLandmarks()
  //       .withFaceDescriptors();
  
  //     const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
  //     canvasRef.current.getContext("2d").clearRect(
  //       0,
  //       0,
  //       canvasRef.current.width,
  //       canvasRef.current.height
  //     );
  
  //     const results = resizedDetections.map((d) => {
  //       return faceMatcher.findBestMatch(d.descriptor);
  //     });
  
  //     const bestMatchLabels = results.map((result) => {
  //       return result.label;
  //     });
  
      
  //     // else if (bestMatchLabel) {
  //     //   const bestMatchDiv = document.createElement("div");
  //     //   bestMatchDiv.textContent = `Best match: ${bestMatchLabel}`;
  //     //   document.body.append(bestMatchDiv);
  //     // }
  
  //     results.forEach((result, i) => {
  //       const box = resizedDetections[i].detection.box;
  //       const drawBox = new faceapi.draw.DrawBox(box, {
  //         label: result.toString().split(" ")[0],
  //       });
  //       drawBox.draw(canvasRef.current);
  
  //       if (result.distance > threshold) {
  //         bestMatchLabel = result.label;
  //       }
  //     });
  //   }, 100);
  
   
  // }  

  // async function faceRecognition() {
  //   const labeledFaceDescriptors = await getLabeledFaceDescriptions();
  //   const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
  //   const threshold = 0.2;
  //   const recognizedPersons = [];
  
  //   const displaySize = {
  //     width: videoRef.current.videoWidth,
  //     height: videoRef.current.videoHeight,
  //   };
  
  //   faceapi.matchDimensions(canvasRef.current, displaySize);
  
  //   let bestMatchLabel = null;
  
  //   setInterval(async () => {
  //     const detections = await faceapi
  //       .detectAllFaces(videoRef.current)
  //       .withFaceLandmarks()
  //       .withFaceDescriptors();
  
  //     const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
  //     canvasRef.current.getContext("2d").clearRect(
  //       0,
  //       0,
  //       canvasRef.current.width,
  //       canvasRef.current.height
  //     );
  
  //     const results = resizedDetections.map((d) => {
  //       return faceMatcher.findBestMatch(d.descriptor);
  //     });
  
  //     const bestMatchLabels = results.map((result) => {
  //       return result.label;
  //     });
  
  //     results.forEach((result, i) => {
  //       const box = resizedDetections[i].detection.box;
  //       const drawBox = new faceapi.draw.DrawBox(box, {
  //         label: result.toString().split(" ")[0],
  //       });
  //       drawBox.draw(canvasRef.current);
       
  //       if (result.distance > threshold) {
  //         bestMatchLabel = result.label;
  //         if (!recognizedPersons.includes(bestMatchLabel)) {
  //           recognizedPersons.push(bestMatchLabel);
  //         }
  //       }
        
  //     });
  //   }, 500
  //   );
  //  console.log(recognizedPersons)
  //   // Send the recognizedPersons array to the backend
  //   if (recognizedPersons) {
  //     fetch("http://localhost:3001/attendanceLog/logs", {
  //       method: "POST",
  //       body: JSON.stringify({ person: recognizedPersons }),
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${localStorage.getItem("token")}`
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Recognition result:", data);
  //       })
  //       .catch((error) => {
  //         console.error("Error sending recognition data:", error);
  //       });
  //   } else {
  //     console.error("Recognized persons is null.");
  //   }
    
  async function faceRecognition() {
    const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
    const threshold = 0.2;
    const recognizedPersons = [];
  
    const displaySize = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    };
  
    faceapi.matchDimensions(canvasRef.current, displaySize);
  
    let bestMatchLabel = null;
  
    const startTime = new Date().getTime();
    const endTime = startTime + 2 * 60 * 1000; // 2 minutes
  
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
  
        if (result.distance > threshold) {
          bestMatchLabel = result.label;
          if (!recognizedPersons.includes(bestMatchLabel)) {
            recognizedPersons.push(bestMatchLabel);
          }
        }
      });
  
      const currentTime = new Date().getTime();
      if (currentTime > endTime) {
        clearInterval(intervalId);
  
        console.log(recognizedPersons);
        // Send the recognizedPersons array to the backend
      //   if (recognizedPersons.length > 0) {
      //     fetch("http://localhost:3001/attendanceLog/logs", {
      //       method: "POST",
      //       body: JSON.stringify({ person: recognizedPersons }),
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${localStorage.getItem("token")}`,
      //       },
      //     })
      //       .then((response) => response.json())
      //       .then((data) => {
      //         console.log("Recognition result:", data);
      //       })
      //       .catch((error) => {
      //         console.error("Error sending recognition data:", error);
      //       });
      //   } else {
      //     console.error("No recognized persons found.");
      //   }
      // }
      if (recognizedPersons.length > 0) {
        recognizedPersons.forEach(person => {
          fetch("http://localhost:3001/attendanceLog/logs", {
            method: "POST",
            body: JSON.stringify({ person: [person] }), // Send the person in an array
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => response.json())
          .then((data) => {
            console.log(`Recognition result for ${person}:`, data);
          })
          .catch((error) => {
            console.error(`Error sending recognition data for ${person}:`, error);
          });
        });
      } else {
        console.error("No recognized persons found.");
      }
    }
    }, 500);
  }
  
    

  
  





  return (
    <>
    {/* <button onClick={switchCamera}>switch</button> */}
        <div className="spaceForreco">
      <video ref={videoRef} autoPlay muted />
      <canvas ref={canvasRef} />
      </div>
      <div>
      <button onClick={handleClick}>
        {isLoading ? "Loading...." : "Recognize"}
      </button>
    </div>
    </>
  );
}

export default FaceRecognition;
