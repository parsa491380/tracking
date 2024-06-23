import React, { useState } from "react";
import GetLocByClick from "./GetLocByClick.tsx";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsIcon from "@mui/icons-material/Directions";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import "./css/RouteFindingMenu.css";
import { useMap } from "react-leaflet";
export default function RouteFindingMenu() {
  const [openLocMenu, setOpenLocMenu] = useState(false);
  const map = useMap();

  const handleOpen = () => setOpenLocMenu(true);

  const handleClose = () => {
    setOpenLocMenu(false);
  };

  const goTOLocation = () => {
    map.locate();
    map.once("locationfound", (location) => {
      map.flyTo(location.latlng);
    });
  };

  // I WANT TO STOP THE DIV FROM CLICKING THE MAP :
  // I CREATED THE NEEDED STATE IN APP.JS
  // I CREATED THE EVENT LISTENERS AND FUNCTIONS FOR THE div element
  // but passing the context and the logic of the functions remained .

  const mouseOver = () => {
    console.log("over");
  };
  const mouseOut = () => {
    console.log("out");
  };

  return (
    <>
      <div id="iconDiv" title="Routing" onClick={handleOpen}>
        <DirectionsIcon id="DirectionsIcon" />
      </div>
      {openLocMenu === true ? (
        <div id="locMenuDiv" onMouseOver={mouseOver} onMouseOut={mouseOut}>
          <div id="iconGroupContainer">
            <DirectionsSubwayIcon id="iconGroup" />
            <DirectionsCarIcon id="iconGroup" />
            <DirectionsWalkIcon id="iconGroup" />
            <DirectionsBikeIcon id="iconGroup" />
            <AirplanemodeActiveIcon id="iconGroup" />
            <CloseIcon onClick={handleClose} id="iconGroup" />
            <div className="inputDiv">
              <PlaceIcon />
              <h3> . . . . . </h3>
              <input
                type="text"
                className="adressInput"
                placeholder="START INPUT"
              />
            </div>
            <div className="inputDiv">
              <PlaceIcon />
              <h3> . . . . . </h3>
              <input
                type="text"
                className="adressInput"
                placeholder="DESTINATION INPUT"
              />
            </div>
            <div id="goTOLocation" onClick={goTOLocation}>
              <PersonPinCircleIcon id="goTOLocationIcon" />
              <h3>GO TO YOUR LOCATION</h3>
            </div>
          </div>
        </div>
      ) : null}
      {openLocMenu === true ? <GetLocByClick /> : null}
    </>
  );
}
