import React, { useState } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import "./css/FullScreenBotton.css";
export default function FullScreenBotton() {
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  const element = document.documentElement;

  const toggleFullScreen = () => {
    if (fullScreen === false) {
      setFullScreen(true);
      element.requestFullscreen();
    } else {
      setFullScreen(false);

      document.exitFullscreen();
    }
  };
  return (
    <>
      <div onClick={toggleFullScreen} id="fullScreen">
        {fullScreen === false ? (
          <FullscreenIcon className="icon" />
        ) : (
          <FullscreenExitIcon className="icon" />
        )}
      </div>
    </>
  );
}
