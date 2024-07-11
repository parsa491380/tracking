import React, { useState } from "react";
import L from "leaflet";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import "./FullScreenBotton.css";
export default function FullScreenBotton() {
  const element = document.documentElement;
  const divRef = React.useRef(null);
  React.useEffect(() => {
    L.DomEvent.disableClickPropagation(divRef.current);
    L.DomEvent.disableScrollPropagation(divRef.current);
  });

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      element.requestFullscreen();
    }
  };
  return (
    <>
      <div onClick={toggleFullScreen} ref={divRef} id="fullScreen">
        <FullscreenIcon className="icon" />
      </div>
    </>
  );
}
