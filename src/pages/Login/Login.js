import React, { useState } from "react";
import "./login.css";
import bigLogo from "../../media/biglogo.jpg";
import { borderColor, Box } from "@mui/system";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const [loginId, setLoginId] = useState("")
    const [loginPassword, setLoginPassword] = useState("")


    const handleLoginSubmit = (e)=>{
        e.preventDefault();

        navigate('/admin/dashboard')
    }

    


  return (
    <>
      <div className="login-container">
        <div className="login-landing">
          <img className="biglogo-img" src={bigLogo} alt="logo" />
        </div>
        <div className="login-panel">
          <div className="login-div">
            <div className="login-heading">
              <h2>Admin Login</h2>
            </div>
            <Box
              className="mui_box"
              component="form"
              onSubmit={handleLoginSubmit}
              sx={
                    {
                        "& .MuiTextField-root": { m: 1, width: "30ch" },
                    }
                }
              noValidate
              autoComplete = 'off'
            >

                <TextField
                  onChange = {(e)=>{setLoginId(e.target.value)}}
                  value = {loginId}
                  className="login-input"
                  label="Admin Login Id"
                  variant="filled"
                  id="filled-basic"
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps = { {className : 'textfiels__input'}}
                />

                <TextField
                  value={loginPassword}
                  onChange = {(e)=>{setLoginPassword(e.target.value)}}
                  className="login-input"
                  label="Admin Password"
                  variant="filled"
                  id="filled-basic"
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps = { {className : 'textfiels__input'}}
                  type = "password"
                />
                <Button 
                    variant="contained" 
                    color="success" 
                    type="submit"
                    onClick={handleLoginSubmit}
                >
                    Login
                </Button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
