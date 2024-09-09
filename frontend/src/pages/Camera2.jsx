import React from "react";
import Camera from "../components/Camera";

function Camera2() {
  return (
    <div className="w-ful h-full p-2">
      <div className="project-title w-full h-[40px] mb-1 flex justify-center align-middle items-center">
        <h1>Camera 2</h1>
      </div>
      <Camera source="http://127.0.0.1:8000/video_feed"/>
    </div>
  );
}

export default Camera2;
