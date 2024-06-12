import React, { useState } from "react";
import GetLocByClick from "./GetLocByClick.tsx";
import "./css/RouteFindingMenu.css";

import { RouteContext } from "../App";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useContext } from "react";

export default function RouteFindingMenu() {
  const [openLocMenu, setOpenLocMenu] = useState(false);

  // const {
  //   setStartLocGeter,
  //   setOpenLocMenu,
  //   openLocMenu,
  //   setDestinationLocGeter,
  // } = useContext(RouteContext);

  const handleOpen = () => setOpenLocMenu(true);

  return (
    <>
      <div id="iconDiv" title="Routing" onClick={handleOpen}>
        <DirectionsIcon id="DirectionsIcon" />
      </div>
      {openLocMenu === true ? <div id="locMenuDiv"></div> : null}
      {openLocMenu === true ? <GetLocByClick /> : null}
    </>
  );
}
