import React from 'react'

function Camera(props) {
  return (
    <div className="camera-container  w-[640px] h-[360px] ">
        <img src={props.source} alt="image" />
      </div>
  )
}

export default Camera