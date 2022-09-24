import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Signup = () => {

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    givenname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    postal: "",
  });

  const handleChange = (e, value) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,

      gender: value,
    }));
  };

  // const handleSubmit = async () => {
  //   console.log(inputs);
  //   await axios.post(process.env.REACT_APP_API_URL + "/user/signup", inputs);
  //   navigate("/signin");
  // };

  return (
    <>
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
            Signup
          </Typography>
          <TextField
            onChange={handleChange}
            name="givenname"
            value={inputs.givenname}
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Given Name"
          />
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

          <TextField
            onChange={handleChange}
            name="phone"
            value={inputs.phone}
            margin="normal"
            type={"phone"}
            variant="outlined"
            placeholder="12345678"
          />

          <TextField
            onChange={handleChange}
            name="address"
            value={inputs.address}
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Address"
          />

          <Box style={{ display: "flex", flexDirection: "row" }}>
            <Autocomplete
              sx={{ width: 110, marginTop: 2, marginBottom: 2 }}
              options={["male", "female"]}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Gender"
                  name="gender"
                  value={inputs.gender}
                />
              )}
            />
          </Box>

          <Button
            // onClick={handleSubmit}
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            style={{
              backgroundColor: "#3dccc7",
            }}
          >
            {"Signup"}
          </Button>
          <Button
            onClick={() => navigate("/signin")}
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            {"Change to Login"}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Signup;
