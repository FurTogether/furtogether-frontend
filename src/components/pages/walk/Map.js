import React, { useState, useEffect } from "react";
// import { Box, Typography } from "@mui/material";
import { Box, Text } from "@chakra-ui/react";

import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";

// CENTER LOCATION FOR THE MAP?
const center = { lat: 1.2983000336922557, lng: 103.82741106870155 };
// MARKERS FOR THE POIs TO BE PULLED FROM AN API
// const markers = [
//   {
//     id: 1,
//     name: "ACSJ",
//     position: { lat: 1.3093241020015653, lng: 103.84158485336222 },
//     postal: "Singapore 227988",
//   },
//   {
//     id: 2,
//     name: "Teachers Network",
//     position: { lat: 1.298156613368654, lng: 103.82893366886304 },
//     postal: "Singapore 249564",
//   },
//   {
//     id: 3,
//     name: "Botanic Garden",
//     position: { lat: 1.3147701916083578, lng: 103.81571461383005 },
//     postal: "Singapore 257494",
//   },
//   {
//     id: 4,
//     name: "Irwell Bank",
//     position: { lat: 1.2977756658797466, lng: 103.83107536388265 },
//     postal: "Singapore 239200",
//   },
//   {
//     id: 5,
//     name: "Chatsworth Park",
//     position: { lat: 1.3001809922672687, lng: 103.82191579587575 },
//     postal: "Singapore 249767",
//   },
// ];

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  console.log("isLoaded", isLoaded);

  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [activeMarker, setActiveMarker] = useState(null);
  const [allMarkers, setAllMarkers] = useState(null);
  // const [everyMarker, setEveryMarker] = useState(null);

  const markers = async () => {
    try {
      const markersDetails = await axios.get(
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_API_URL + "walk/map"
      );
      console.log("markers info", markersDetails.data);
      // setEveryMarker(markers);
      setAllMarkers (markersDetails.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    markers();
  }, []);

  if (!isLoaded) {
    return <Text> Not Loading</Text>;
  }

  const getCount = async (markerIndex) => {
    // eslint-disable-next-line no-undef
    const headCount = await axios.get(
      process.env.REACT_APP_API_URL + `walk/${markerIndex}`
    );
    console.log("headCountResults", headCount.data);
    return headCount.data;
  };
  // ON CLICK HANDLER FOR THE POI MARKERS
  const handleActiveMarker = async (marker) => {
    if (marker === activeMarker) {
      return;
    }
    await getCount(marker);
    setActiveMarker(marker);
  };

  if(!allMarkers) {
    return (<div>Hello</div>)
  }

  return (
    <>
      <Box
        // sx={{
        //   width: "100vw",
        //   height: 800,
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "center",
        // }}
      >
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
          // onLoad={handleOnLoad}
          // onClick={() => setActiveMarker(null)}
        >
          <Marker
            position={center}
            icon="https://maps.gstatic.com/mapfiles/ms2/micons/lightblue.png"
          />
          {allMarkers.map(({ id, name, position, headCount }) => (
            <Marker
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
            >
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>
                    <div>{name}</div>
                    <div>Headcount {headCount}</div>
                    {/* <div>
                    <a
                      href={`${process.env.REACT_APP_API_URL}/walk/join/${id}`}
                    >
                      Joining
                    </a>
                  </div> */}
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      </Box>
    </>
  );
}

export default Map;
