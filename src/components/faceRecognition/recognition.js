import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './face.css'


function FaceRecognition() {
  const imageUploadRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    ]).then(start);
  }, []);

  const start = async () => {
    const container = containerRef.current;
    container.style.position = 'relative';
    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

    console.log('Loaded');
    imageUploadRef.current.addEventListener('change', async () => {
      // Clear the container of any previously appended elements
      container.innerHTML = '';
    
      // Create a new image and canvas
      const image = await faceapi.bufferToImage(imageUploadRef.current.files[0]);
      const canvas = faceapi.createCanvasFromMedia(image);
    
      // Append the image and canvas to the container
      container.append(image);
      container.append(canvas);
    
      const displaySize = { width: image.width, height: image.height };
      faceapi.matchDimensions(canvas, displaySize);
    
      const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));
    
      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
        drawBox.draw(canvas);
      });
    });imageUploadRef.current.addEventListener('change', async () => {
      const image = await faceapi.bufferToImage(imageUploadRef.current.files[0]);
    
      // Remove all existing children from the container
      container.innerHTML = '';
    
      // Create a new image element and append it to the container
      image.style.position = 'absolute';
      image.style.top = '0';
      image.style.left = '0';
      image.style.width='600px';
      image.style.height='auto'
      container.appendChild(image);

         // Create a new canvas and append it to the container
         const canvas = faceapi.createCanvasFromMedia(image);
         canvas.style.position = 'absolute';
         canvas.style.top = '0';
         canvas.style.left = '0';
         container.appendChild(canvas);
    
      // Set the display size of the canvas to match the image size
      const displaySize = { width: 600, height:image.height };
      faceapi.matchDimensions(canvas, displaySize);
    
      // Detect faces and draw face boxes on the canvas
      const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));
    
      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
        drawBox.draw(canvas);
      });
    });
    
    
  };  


// const start = async () => {
//    const container = containerRef.current;
//    container.style.position = 'relative';
//    const labeledFaceDescriptors = await loadLabeledImages();
//    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
 
//    console.log('Loaded');
//    container.innerHTML = '';
 
//    // Request access to the user's camera
//    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
 
//    // Create a video element and set its source to the camera stream
//    const video = document.createElement('video');
//    video.srcObject = stream;
//    video.autoplay = true;
 
//    // Wait for the video to load
//    await new Promise(resolve => {
//      video.addEventListener('loadeddata', () => {
//        resolve();
//      });
//    });
 
//    // Create a canvas element and append it to the container
//    const canvas = document.createElement('canvas');
//    container.appendChild(canvas);
 
//    // Set the canvas dimensions to match the video
//    canvas.width = video.videoWidth;
//    canvas.height = video.videoHeight;
 
//    // Draw the video frame onto the canvas every animation frame
//    const draw = () => {
//      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
//      faceapi.detectAllFaces(canvas).withFaceLandmarks().withFaceDescriptors().then(detections => {
//        const resizedDetections = faceapi.resizeResults(detections, { width: canvas.width, height: canvas.height });
//        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
 
//        results.forEach((result, i) => {
//          const box = resizedDetections[i].detection.box;
//          const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
//          drawBox.draw(canvas);
//        });
//      });
 
//      requestAnimationFrame(draw);
//    };
 
//    requestAnimationFrame(draw);
//  };
 

  const loadLabeledImages = async () => {
    const labels = ['hrithik_kantak','lachlan_disilva','omkar_redkar','prajakta_kolambkar'];
    const labeledDescriptors = [];

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const descriptors = [];

      for (let j = 1; j <= 2; j++) {
        const img = await faceapi.fetchImage(`/labeled_images/${label}/${j}.jpg`);
         
        const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        
        descriptors.push(detection.descriptor);
      }
      console.log(descriptors)
      labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(label, descriptors));
    }

    return labeledDescriptors;
  };

  return (
    <>
      <h1>Face Recognition App</h1>
      <input type="file" id="imageUpload" ref={imageUploadRef} />
      <div ref={containerRef}></div>
    </>
  );
}

export default FaceRecognition;
