import React from 'react';
import ReactPlayer from 'react-player';

const IpCamera = () => (
  <video controls>
  <source src="rtsp://192.168.1.108:554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif" type="application/x-rtsp" />
</video>

);

export default IpCamera;
