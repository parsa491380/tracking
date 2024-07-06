// default component imports
import React, { useContext, useState } from "react";
import GetLocByClick from "./GetLocByClick.tsx";
import { RouteContext } from "../App.js";
import { useMap } from "react-leaflet";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
// icons imports
import CloseIcon from "@mui/icons-material/Close";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsIcon from "@mui/icons-material/Directions";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import SwapVertIcon from "@mui/icons-material/SwapVert";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "./css/RouteFindingMenu.css";

// main code
export default function RouteFindingMenu() {
  const [openLocMenu, setOpenLocMenu] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { setActiveOnclick, firstLoc, setFirstLoc, secondLoc, setSecondtLoc } =
    useContext(RouteContext);

  const open = Boolean(anchorEl);
  const map = useMap();

  const handleOpen = () => {
    setOpenLocMenu(true);
    handlePopoverClose();
  };

  const handleClose = () => {
    setSecondtLoc(null);
    setFirstLoc(null);
    setOpenLocMenu(false);
  };
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const goTOLocation = () => {
    map.locate();
    map.once("locationfound", (location) => {
      map.flyTo(location.latlng);
    });
  };
  let swap;
  const reverseRoute = () => {
    swap = firstLoc;
    setFirstLoc(secondLoc);
    setSecondtLoc(swap);
  };
  const mouseOut = () => {
    setActiveOnclick(true);
  };

  return (
    <>
      {openLocMenu === false ? (
        <>
          <div
            id="iconDiv"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            onClick={handleOpen}
          >
            <DirectionsIcon id="DirectionsIcon" />
          </div>{" "}
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
              left: 6,
              borderRadius: "50%",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1, color: "#0ab6ff", borderRadius: "200px" }}>
              ROUTING
            </Typography>
          </Popover>
        </>
      ) : null}

      <Drawer
        sx={{
          width: 401,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 401,
            height: "100%",
            zIndex: 999999,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openLocMenu}
        onMouseOver={() => setActiveOnclick(false)}
        onMouseOut={() => setActiveOnclick(true)}
      >
        <div id="iconGroupContainer">
          <DirectionsSubwayIcon id="iconGroup" />
          <DirectionsCarIcon id="iconGroup" />
          <DirectionsWalkIcon id="iconGroup" />
          <DirectionsBikeIcon id="iconGroup" />
          <AirplanemodeActiveIcon id="iconGroup" />
          <CloseIcon
            onClick={handleClose}
            id="iconGroup"
            titleAccess="cancel and close routing"
          />
          <SwapVertIcon
            id="reverseLoc"
            onClick={reverseRoute}
            titleAccess="swap the start and destination"
          />
          <div className="inputDiv">
            <PlaceIcon />
            <h3> . . . . . </h3>
            <input
              type="text"
              className="adressInput"
              placeholder={
                firstLoc === null
                  ? "click the map or type your start adress"
                  : firstLoc
              }
            />
          </div>
          <div className="inputDiv">
            <PlaceIcon />
            <h3> . . . . . </h3>
            <input
              type="text"
              className="adressInput"
              placeholder={
                secondLoc === null
                  ? "click the map or type your destination adress"
                  : secondLoc
              }
            />
          </div>
          <div id="goTOLocation" onClick={goTOLocation}>
            <PersonPinCircleIcon id="goTOLocationIcon" />
            <h3>GO TO YOUR LOCATION</h3>
          </div>
        </div>
      </Drawer>
      {openLocMenu === true ? <GetLocByClick /> : null}
    </>
  );
}
