import React from "react";
import Camera from "../components/Camera";

function Camera1() {
  return (
    <div className="w-ful h-full p-2">
      <div className="project-title w-full h-[40px] mb-1 flex justify-center align-middle items-center">
        <h1>Camera 1</h1>
      </div>
      <Camera source="https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725753600&semt=ais_hybrid"/>
    </div>
  );
}

export default Camera1;
