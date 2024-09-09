import './App.css'
import VideoPlayer from './Player'
import { useRef } from 'react'
import videojs from 'video.js'

function Player() {
  const playerRef = useRef(null)
  const videoLink = "http://localhost:8000/stream/b7dcf672-b340-49c3-a9d1-a57865de59f0/index.m3u8"

  const videoPlayerOptions = {
    controls : true,
    responsive : true,
    fluid : true,
    sources : [
      {
        src : videoLink,
        type : "application/x-mpegURL"
      }
    ]
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <>
      <div>
        <h1>Video Streaming🔴</h1>
      </div>
      <VideoPlayer
      options={videoPlayerOptions}
      onReady={handlePlayerReady}
      />
    </>
  )
}

export default Player
