import React, { useState } from "react";
import GetLocByClick from "./GetLocByClick.tsx";
import "./css/RouteFindingMenu.css";
//
//
//
//

import FullScreenBotton from "./FullScreenBotton.tsx";

//
//
//
//
//

import SideMenu from "./SideMenu.tsx";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

import DirectionsIcon from "@mui/icons-material/Directions";
export default function RouteFindingMenu() {
  const [openLocMenu, setOpenLocMenu] = useState(false);

  // const {
  //   setStartLocGeter,
  //   setOpenLocMenu,
  //   openLocMenu,
  //   setDestinationLocGeter,
  // } = useContext(RouteContext);

  const handleOpen = () => setOpenLocMenu(true);

  const handleClose = () => setOpenLocMenu(false);

  return (
    <>
      <div id="iconDiv" title="Routing" onClick={handleOpen}>
        <DirectionsIcon id="DirectionsIcon" />
      </div>
      {/* 







       */}
      {openLocMenu === true ? (
        <div id="locMenuDiv">
          {/* 














           */}
          <div id="icons">
            <DirectionsSubwayIcon />
            <DirectionsCarIcon />
            <DirectionsWalkIcon />
            <DirectionsBikeIcon />
            <AirplanemodeActiveIcon />
            <CloseIcon id="close" onClick={handleClose} />
            <SideMenu />
          </div>

          {/* 






















           */}
          <div id="inputs"></div>

          {/* 




















 */}

          <div id="generatedRoutes">
            <FullScreenBotton />
          </div>
        </div>
      ) : null}
      {openLocMenu === true ? <GetLocByClick /> : null}
    </>
  );
}
