import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

function FApp() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentCamera, setCurrentCamera] = useState("user");

  useEffect(() => {
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    ]).then(startVideo);
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId: currentCamera === "user" ? undefined : currentCamera,
        },
        audio: false,
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const switchCamera = () => {
    setCurrentCamera((prevCamera) => {
      return prevCamera === "user" ? "environment" : "user";
    });
  };

  const loadLabeledImages = async () => {
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
  };

  const startRecognition = async () => {
    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

    videoRef.current.addEventListener("play", () => {
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      canvasRef.current.append(canvas);

      const displaySize = {
        width: videoRef.current.width,
        height: videoRef.current.height,
      };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
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

        canvas.getContext("2d").clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

        const results = resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });

        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: result.toString(),
          });
          drawBox.draw(canvas);
        });
      }, 100);
    });
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      <div ref={canvasRef} />
      <button onClick={switchCamera}>Switch camera</button>
      <button onClick={startRecognition}>Start recognition</button>
    </div>
  );
}

export default FApp;
