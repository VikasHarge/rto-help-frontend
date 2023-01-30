import "./complain.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Loader from  '../../utils/loader/Loader'


import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerComplain } from "../../feature/complain/complainRegisterSlice";
import Recorder from "./component/Recorder";

function Complain() {

  const { loading, isSuccess , data, error } = useSelector((state)=> state.registerComplain )

  const dispatch = useDispatch()



  //To make referance with camera
  const mainCamRef = useRef(null);
  const frontCamRef = useRef(null);

  const [registerComplainData, setRegisterComplainData] = useState({
    name: "",
    vehicleNumber: "",
    phone: "",
    description: "",
    cord: {
      latitude: "",
      longitude: "",
    },
  });

  const [url1, set1] = useState("");
  const [url2, set2] = useState("");
  const [isReadyToSubmit, setReady] = useState(false);


  const mediaRecorderRef = useRef(null);
  const frontMediaRecorderRef = useRef(null);

  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [frontRecordedChunks, setFrontRecordedChunks] = React.useState([]);

  const [duration, setDucration] = useState(0);
  const [length, setLength] = useState(0);
  const [date, setDate] = useState(new Date().toLocaleString());
  const [isVideoInfo, SetIsVideoInfo] = React.useState(false);

  var durInterval = null;
  var timeoutId = null;

  useEffect(() => {
    setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000);
  }, []);
  

  useEffect(()=>{
    if(isSuccess){
      console.log(data);
    }
    if(error){
      console.log(error.message);
    }
  },[isSuccess, error])


  const handleStartCaptureClick = useCallback(() => {

    setCapturing(true);
    SetIsVideoInfo(false);
    setDucration(0);

    durInterval = setInterval(() => {
      setDucration((prev) => prev + 1);
    }, 1000);

    mediaRecorderRef.current = new MediaRecorder(mainCamRef.current.stream, {
      mimeType: "video/webm",
    });

    frontMediaRecorderRef.current = new MediaRecorder(
      frontCamRef.current.stream,
      {
        mimeType: "video/webm",
      }
    );

    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    frontMediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleFrontDataAvailable
    );

    mediaRecorderRef.current.start();
    frontMediaRecorderRef.current.start();

    timeoutId = setTimeout(() => {
      handleStopCapture();
    }, 40000);
  }, [mainCamRef, setCapturing, mediaRecorderRef]);

  //Data Concat Function
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

  const handleStopCapture = useCallback(async () => {
    console.log("stoped capturing");
    mediaRecorderRef.current.stop();
    frontMediaRecorderRef.current.stop();
    setCapturing(false);
    SetIsVideoInfo(true);
    clearInterval(durInterval);
    clearTimeout(timeoutId);
  }, [mediaRecorderRef, setCapturing]);

  const samplesubmit = async () => {
    console.log("sample sumbit clicked");
    console.log(recordedChunks.length);
    console.log(frontRecordedChunks.length);

    if (frontRecordedChunks.length) {
      const frontBlob = new Blob(frontRecordedChunks, {
        type: "video/webm",
      });
      let data3 = await new Promise((resolve, reject) => {
        var frontBase64;
        var frontReader = new FileReader();
        frontReader.readAsDataURL(frontBlob);
        frontReader.onload = () => {
          frontBase64 = frontReader.result;
          console.log("front", frontBase64);
          setRegisterComplainData({
            ...registerComplainData,
            frontVideoUrl: frontBase64,
          });
          set2(frontBase64);
        };
        resolve(frontBase64);
      });
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm",
        });

        let data2 = await new Promise((resolve, reject) => {
          let mainBase64;
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            mainBase64 = reader.result;
            console.log("main", mainBase64);
            setRegisterComplainData({
              ...registerComplainData,
              mainVideoUrl: mainBase64,
            });
            set1(mainBase64);
          };
          resolve(mainBase64);
        });
      }
    }

    setRecordedChunks([]);
    setFrontRecordedChunks([]);

    setReady(true);
    console.log(registerComplainData);
  };

  const submitNow = () => {

    if(!url1 || !url2 || !registerComplainData.description  || !registerComplainData.name || !registerComplainData.vehicleNumber || !registerComplainData.phone){
      alert("Please Fill All Details")
      return
    }

    console.log(url1);
    console.log(url2);

    const registerComplainObj = {
      ...registerComplainData,
      frontVideoUrl: url1,
      mainVideoUrl: url2,
    };

    console.log(registerComplainObj);

    dispatch(registerComplain(registerComplainObj))



    setRegisterComplainData({
      name: "",
      vehicleNumber: "",
      phone: "",
      description: "",
      cord: {
        latitude: "",
        longitude: "",
      },
    });

    set1("");
    set2("");


    setReady(false);
  };


  useEffect(() => {
    setLength(() => duration);
  }, [duration]);

  useEffect( () => {

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.longitude);
      console.log(position.coords.latitude);
      setRegisterComplainData({
        ...registerComplainData,
        cord: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        },
      });
    console.log(registerComplainData);

    });

  }, []);

  return (
    <>{
      loading ? <Loader/> : <>
      <div className="App">

       <div className="container">
         <div className="video-container">
         <Recorder />
           {/* <Webcam
             imageSmoothing={true}
             ref={mainCamRef}
             audio={false}
             videoConstraints={{
               width: 500,
               facingMode: "environment",
             }}
           /> */}
           <div className="sc_cam">
             {/* <Webcam
               ref={frontCamRef}
               audio={false}
               videoConstraints={{
                 width: 100,
                 facingMode: "user",
               }}
             /> */}
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
             "& > :not(style)": { m: 1, width: "35ch" },
           }}
           noValidate
           autoComplete="off"
         >
           <TextField
             id="outlined-basic"
             label="Enter Full Name"
             variant="outlined"
             value={registerComplainData.name}
             onChange={(e) =>
               setRegisterComplainData({
                 ...registerComplainData,
                 name: e.target.value,
               })
             }
           />
           <TextField
             id="outlined-basic"
             label="Enter Mobile Number"
             variant="outlined"
             type="number"
             value={registerComplainData.phone}
             onChange={(e) =>
               setRegisterComplainData({
                 ...registerComplainData,
                 phone: e.target.value,
               })
             }
           />
           <TextField
             id="outlined-basic"
             label="Enter Vehicle Number"
             variant="outlined"
             value={registerComplainData.vehicleNumber}
             onChange={(e) =>
               setRegisterComplainData({
                 ...registerComplainData,
                 vehicleNumber: e.target.value,
               })
             }
           />
           <TextField
             id="outlined-multiline-flexible"
             label="Complaint Discription"
             variant="outlined"
             multiline
             maxRows={4}
             value={registerComplainData.description}
             onChange={(e) =>
               setRegisterComplainData({
                 ...registerComplainData,
                 description: e.target.value,
               })
             }
           />
           <div className="complain-submit-btn-div">
             <Button
               onClick={samplesubmit}
               color="success"
               variant="contained"
               disabled={!recordedChunks.length}
             >
               verify details
             </Button>
             <Button
               onClick={submitNow}
               color="success"
               variant="contained"
               disabled={!isReadyToSubmit}
             >
               Submit Complain
             </Button>
           </div>
         </Box>
       </div>
     </div>
     </>
    }
    </>
  )}

export default Complain;
