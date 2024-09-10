import React from "react";
import Camera from "../components/Camera";

function Camera2() {
  return (
    <div className="w-ful h-full p-2">
      <Camera source="http://localhost:8000/video_feed"/>
    </div>
  );
}

export default Camera2;
