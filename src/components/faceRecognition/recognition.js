import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import onvif from "onvif";
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
      .then(faceRecognition)
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

  // async function startWebcam() {
  //   try {
  //     const device = new onvif.OnvifDevice({
  //       xaddr: "http://192.168.1.108:80/onvif/device_service",
  //       user: "admin",
  //       pass: "Admin@123"
  //     });
  //     await device.init();
  //     const profiles = await device.getProfiles();
  //     const profile = profiles[0];
  //     const streamUrl = device.getStreamUrl(profile.token);

  //     videoRef.current.src = streamUrl;
  //     videoRef.current.play();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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

  async function faceRecognition() {
    const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
    const threshold=0.5
    // const recognizedPersons=[]
    videoRef.current.addEventListener("play", () => {
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    document.body.append(canvas);
    });

    const displaySize = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight
    };

    faceapi.matchDimensions(canvasRef.current, displaySize);

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

  //     const results = resizedDetections.map((d) => {
  //       return faceMatcher.findBestMatch(d.descriptor);
  //     });
  
  //     let bestMatch = { label: "", distance: Number.MAX_SAFE_INTEGER };
  //     results.forEach((result, i) => {
  //       const box = resizedDetections[i].detection.box;
  //       const drawBox = new faceapi.draw.DrawBox(box, {
  //         label: result.toString().split(' ')[0]
  //       });
  //       drawBox.draw(canvasRef.current);
  //       if (result.distance < bestMatch.distance) {
  //         bestMatch.label = result.label;
  //         bestMatch.distance = result.distance;
  //       }
  //     });
  //     const bestMatchLabel = document.createElement('div');
  //     bestMatchLabel.textContent = `Best Match: ${bestMatch.label}`;
  //     document.body.appendChild(bestMatchLabel);
  
  //   }, 200);
  
  // }
  const results = resizedDetections.map((d) => {
    return faceMatcher.findBestMatch(d.descriptor);
  });

//   results.forEach((result, i) => {
//     const box = resizedDetections[i].detection.box;
//     const drawBox = new faceapi.draw.DrawBox(box, {
//       label: result.toString().split(' ')[0]
//     });
//     drawBox.draw(canvasRef.current);

//     if (result.distance > threshold) {
//       const bestMatchLabel = result.label;
//       const bestMatchDiv = document.createElement("div");
//       bestMatchDiv.textContent = `Best match: ${bestMatchLabel}`;
//       document.body.append(bestMatchDiv);

      
//     }
//   });
// }, 100);
// }

const recognizedPerson = generateLabelResults(results, threshold);

results.forEach((result, i) => {
  const box = resizedDetections[i].detection.box;
  const drawBox = new faceapi.draw.DrawBox(box, {
    label: result.toString().split(" ")[0],
  });
  drawBox.draw(canvasRef.current);

  if (result.distance > threshold) {
    const bestMatchLabel = result.label;
    const bestMatchDiv = document.createElement("div");
    bestMatchDiv.textContent = `Best match: ${bestMatchLabel}`;
    document.body.append(bestMatchDiv);
  }
});
}, 100);
}
function generateLabelResults(results, threshold) {
  // Filter the results based on the threshold
  const filteredResults = results.filter((result) => result.distance > threshold);

  // Create an object to store the count for each recognized person
  const counts = {};

  // Loop through the filtered results and update the count for each recognized person
  filteredResults.forEach((result) => {
    const label = result.label;
    counts[label] = counts[label] ? counts[label] + 1 : 1;
  });

  // Get the person with the highest count
  const recognizedPerson = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

  // Create a single label output for each recognized person
  const labelResults = Object.keys(counts).map((label) => {
    const count = counts[label];
    return `${label}: ${count} time${count > 1 ? 's' : ''}`;
  });

  // Log the labeled results to the console
  console.log(labelResults.join(', '));

  // Return the recognized person
  return recognizedPerson;
}


  return (
    <>
    {/* <button onClick={switchCamera}>switch</button> */}
        <div className="spaceForreco">
      <video ref={videoRef} autoPlay muted />
      <canvas ref={canvasRef} />
      </div>
    </>
  );
}

export default FaceRecognition;
