import "./complain.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Complain() {
  const mainCamRef = useRef(null);
  const frontCamRef = useRef(null);

  const [urls, setUrls] = useState("");

  const [name, setName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [number, setNumber] = useState("");
  const [complain, setComplain] = useState("");
  const [long, setLong] = useState(null);
  const [lati, setLati] = useState(null);

  const mediaRecorderRef = useRef(null);
  const frontMediaRecorderRef = useRef(null);

  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [frontRecordedChunks, setFrontRecordedChunks] = React.useState([]);

  const [duration, setDucration] = useState(0);
  const [length, setLength] = useState(0);
  const [date, setDate] = useState(new Date().toLocaleString());
  const [isVideoInfo, SetIsVideoInfo] = React.useState(false);

  useEffect(() => {
    setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000);
  }, []);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    SetIsVideoInfo(false);
    setDucration(0);
    durInterval = setInterval(() => {
      setDucration((prev) => prev + 1);
    }, 1000);
    mediaRecorderRef.current = new MediaRecorder(mainCamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();

    frontMediaRecorderRef.current = new MediaRecorder(
      frontCamRef.current.stream,
      {
        mimeType: "video/webm"
      }
    );
    frontMediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleFrontDataAvailable
    );
    frontMediaRecorderRef.current.start();
  }, [mainCamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
  const handleFrontDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setFrontRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setFrontRecordedChunks]
  );

  var durInterval = null;

  const handleStopCapture = useCallback(() => {
    mediaRecorderRef.current.stop();
    frontMediaRecorderRef.current.stop();
    setCapturing(false);
    SetIsVideoInfo(true);
    clearInterval(durInterval);
  }, [mediaRecorderRef, setCapturing]);

  const handleSubmit = useCallback(() => {
    console.log(long);
    console.log(lati);

    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/mp4"
      });
      console.log(recordedChunks);

      const url = URL.createObjectURL(blob);

      setUrls(url);

      console.log(url);

      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display:none";
      a.href = url;
      a.download = "";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
    if (frontRecordedChunks.length) {
      const frontBlob = new Blob(frontRecordedChunks, {
        type: "video/webm"
      });
      const frontUrl = URL.createObjectURL(frontBlob);
      const b = document.createElement("a");
      document.body.appendChild(b);
      b.style = "display:none";
      b.href = frontUrl;
      b.download = "front_complainer";
      b.click();
      window.URL.revokeObjectURL(frontUrl);
      setFrontRecordedChunks([]);
    }
  }, [recordedChunks, frontRecordedChunks]);

  useEffect(() => {
    setLength(() => duration);
  }, [duration]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setLong(position.coords.latitude);
      setLati(position.coords.longitude);
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="video-container">
          <Webcam
            ref={mainCamRef}
            audio={false}
            videoConstraints={{
              width: 500,
              facingMode: "environment"
            }}
          />
          <div className="sc_cam">
            <Webcam
              ref={frontCamRef}
              audio={false}
              videoConstraints={{
                width: 100,
                facingMode: "user"
              }}
            />
          </div>
          <div className="timer">
            <p>{date}</p>
            <br />
            <p>Video Duration : {duration} Sec</p>
          </div>
          <div className="btn-container">
            {capturing ? (
              <button
                style={{ backgroundColor: "red" }}
                onClick={handleStopCapture}
              >
                Stop Recording
              </button>
            ) : (
              <button
                style={{ backgroundColor: "green" }}
                onClick={handleStartCaptureClick}
              >
                Start Recording
              </button>
            )}
          </div>
        </div>
        <div className="spacer"></div>
        {isVideoInfo && (
          <div className="videoInfo">
            <p>✅ Video Recorded - Length : {length} Sec </p>
          </div>
        )}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "35ch" }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Enter Full Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Enter Mobile Number"
            variant="outlined"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Enter Vehicle Number"
            variant="outlined"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Complaint Discription"
            variant="outlined"
            multiline
            maxRows={4}
            value={complain}
            onChange={(e) => setComplain(e.target.value)}
          />
          <Button onClick={handleSubmit} color="success" variant="contained">
            Submit Complain
          </Button>
        </Box>
      </div>
      {urls && <video src={urls} />}
    </div>
  );
}

export default Complain;
