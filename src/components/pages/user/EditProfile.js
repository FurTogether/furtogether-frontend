import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import {FormFont} from "../../theme"
import { useNavigate } from "react-router-dom";

const user = {};

const EditProfile = () => {
  const [info, setInfo] = useState({
    // avatar: user.avatar,
    name: "",
    email: "",
    gender:"",
    phone: "",
    address: "",
    postal:"",
  });

  useEffect(() => {
    findInfo();
  }, []);

  const handleChange = (e) => {
    console.log("on change =>>> :", e.target.name, e.target.value);
    setInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log("existing info", info);
  };

  const handleSelectChange = (value, fieldName) => {
    console.log("on change =>>> :", value, fieldName);
    setInfo((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    console.log("existing info", info);
  };

  const findInfo = async () => {
    try {
      // const curr_user = await axios.get(
      //   process.env.REACT_APP_API_URL + "/user/profile"
      // );
      // const user = curr_user.data;
      console.log("user in profile is", user);
      setInfo(user);
    } catch (e) {
      console.log(e);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent a new http request upon submit
    console.log(`can i submit`, info);
    // const result = await axios.put(
    //   process.env.REACT_APP_API_URL + "/user/edit-profile",
    //   info
    // );
    // console.log("result of post", result);
    navigate("/profile");
  };


  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection={"column"}
        maxWidth={600}
        // alignItems="left"
        justifyContent={"left"}
        margin="auto"
        marginTop={10}
        padding={3}
      >
        <Avatar
          variant="circular"
          alt="avartar"
          sx={{ width: 156, height: 156, marginBottom: 8 }}
          src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png"
        />
        <Box display="flex" flexDirection={"row"} ml={2} mt={1}>
          <Box width={100} mt={3}>
            {" "}
            <Typography>Name: </Typography>
          </Box>

          <Box ml={10}>
            <TextField
              onChange={handleChange}
              name="Name"
              // value={
              //   info?.name.charAt(0).toUpperCase() +
              //   info?.name.slice(1)
              // }
              margin="normal"
              type={"text"}
              variant="outlined"
              placeholder={"rEGINA"} //{info?.Name}
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection={"row"} ml={2} mt={1}>
          <Box width={100} mt={3}>
            {" "}
            <Typography>Email: </Typography>
          </Box>
          <Box ml={10}>
            {" "}
            <TextField
              onChange={handleChange}
              name="email"
              value={info?.email}
              margin="normal"
              type={"email"}
              variant="outlined"
              placeholder={"a@Gmail"} //{info?.email}
            />
          </Box>
        </Box>

        <Box display="flex" flexDirection={"row"} ml={2} mt={1}>
          <Box width={100} mt={3}>
            {" "}
            <Typography>Gender: </Typography>
          </Box>
          <Box ml={10}>
            <FormFont>
              <Autocomplete
                sx={{ width: 110, marginTop: 2, marginBottom: 2 }}
                options={["male", "female"]}
                onChange={(e, value) => handleSelectChange(value, "gender")}
                renderInput={(params) => (
                  <TextField
                    // onChange={handleChange}
                    {...params}
                    // label={info?.gender}
                    name="gender"
                    value={info?.gender}
                    placeholder={info?.gender}
                  />
                )}
              />
            </FormFont>
          </Box>
        </Box>
        <Box display="flex" flexDirection={"row"} ml={2} mt={1}>
          <Box width={100} mt={3}>
            {" "}
            <Typography>Phone: </Typography>
          </Box>
          <Box ml={10}>
            {" "}
            <TextField
              onChange={handleChange}
              name="phone"
              value={info?.phone}
              margin="normal"
              type={"text"}
              variant="outlined"
              placeholder={"12345645"} //{info?.phone}
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection={"row"} ml={2} mt={1}>
          <Box width={100} mt={3}>
            <Typography>Address: </Typography>
          </Box>
          <Box ml={10}>
            <TextField
              onChange={handleChange}
              name="address"
              // value={
              //   "kallang Bahru" // info?.address.charAt(0).toUpperCase() + info?.address.slice(1)
              // }
              margin="normal"
              type={"text"}
              variant="outlined"
              placeholder={"kallang bagru"} //{info?.address}
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection={"row"} ml={2} mt={1}>
          <Box width={100} mt={3}>
            <Typography>Postal: </Typography>
          </Box>
          <Box ml={10}>
            <TextField
              onChange={handleChange}
              name="postal"
              // value={
              //   "kallang Bahru" // info?.postal.charAt(0).toUpperCase() + info?.postal.slice(1)
              // }
              margin="normal"
              type={"text"}
              variant="outlined"
              placeholder={"888888"} //{info?.postal}
            />
          </Box>
        </Box>
        <Box
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={6}
          padding={3}
        >
          <Button
            type="submit"
            onSubmit={handleSubmit}
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            // color="warning"
            style={{
              backgroundColor: "#3dccc7",
            }}
          >
            {"Save Changes"}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default EditProfile;
