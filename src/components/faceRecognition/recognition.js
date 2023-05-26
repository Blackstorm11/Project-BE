import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import './face.css'

function FaceRecognition() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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
    
    setTimeout(() => {
      clearInterval(intervalId);
      stopWebcam();
      console.log(recognizedLabels); // Output the recognized labels to the console
      console.log(final_labels)
    }, 60 * 1000); // Stop after 2 minutes
  };
  
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
