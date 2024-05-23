import * as React from "react";

import { RouteContext } from "../App";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useContext } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "70%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: "100px",
  bgcolor: "background.paper",
  border: "2px solid aqua",
  boxShadow: 24,
  p: 4,
};

export default function RouteFindingMenu() {
  const {
    setStartLocGeter,
    setOpenLocMenu,
    openLocMenu,
    setDestinationLocGeter,
  } = useContext(RouteContext);
  const handleOpen = () => setOpenLocMenu(true);
  const handleClose = () => setOpenLocMenu(false);

  const startPicker = () => {
    setOpenLocMenu(false);
    setStartLocGeter(true);
  };
  const destinationPicker = () => {
    setOpenLocMenu(false);
    setDestinationLocGeter(true);
  };

  return (
    <div title="Routing">
      <div
        onClick={handleOpen}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "9px",
          padding: "0",
          paddingTop: "2px",
          zIndex: "9999999999",
          width: "27px",
          height: "27px",
          backgroundColor: "white",
          borderRadius: "50%",
          textAlign: "center",
        }}
      >
        <DirectionsIcon
          style={{
            margin: "0",
            top: "5px",
            padding: "0",
            color: "#0ab6ff",
          }}
        />
      </div>
    </div>
  );
}
