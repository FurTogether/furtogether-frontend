import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Signin = () => {

  const [inputs, setInputs] = useState({
    // name: "",
    email: "",
    password: "",
  });

  // // grab fields input from state
  // const { email, password } = inputs;

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {

    try {
      console.log(inputs);
      // const res = await axios.post(
      //   process.env.REACT_APP_API_URL + "/user/signin",
      //   inputs
      // );

      navigate("/profile");
    } catch (e) {
      console.log(e);
    }
  };

  const navigate = useNavigate();
  return (
    <div>
      <form>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={16}
          padding={3}
    
        >
          <Typography variant="h3" padding={3} textAlign="center">
            {"Login"}
          </Typography>

          <TextField
            onChange={handleChange}
            name="email"
            value={inputs.email}
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder="Email"
          />
          <TextField
            onChange={handleChange}
            name="password"
            value={inputs.password}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Password"
          />
          <Button
            onClick={handleSubmit}
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            // color="warning"
            style={{
              backgroundColor: "#3dccc7 ",
            }}
          >
            {"Login"}
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            Change to Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signin;
