import React from 'react'
import VideoRecorder from 'react-video-recorder'

const Recorder = () => {
  return (
    <div>
        <h1>New Recorder new</h1>
        <VideoRecorder 
            onRecordingComplete = {(videoBlob)=>{
                console.log(videoBlob);
            }}
        />
    </div>
  )
}

export default Recorder