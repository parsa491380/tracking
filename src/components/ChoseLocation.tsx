import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import MultyTileLayer from "./MultyTileLayer.tsx";
import { MapContainer, useMap } from "react-leaflet";
import { useEffect } from "react";
import MyContext from "../App.js";

import "./coordinates-of-the-center-of-the-visible-map.css";

const zoomLevel = 11;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const GetCoordinates = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    map.on("dragend  zoomend", () => {
      const { lat, lng } = map.getCenter();
      setData([lat, lng]);
    });
  }, [map]);

  return null;
};
export default function ChoseLocation({ carrier, button, title }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  // const { setData } = React.useContext(MyContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendData = () => {
    carrier(data);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ width: "33%", height: "5vh" }}
      >
        {button}{" "}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h2" component="div">
              {title}
            </Typography>
            <Button autoFocus color="inherit" onClick={sendData}>
              {button}{" "}
            </Button>
          </Toolbar>
        </AppBar>
        <MapContainer
          className={"center-of-map"}
          center={[35.62744237931978, 51.38374328613281]}
          zoom={zoomLevel}
          scrollWheelZoom={true}
          style={{
            width: "100%",
            height: "95vh",
          }}
        >
          <MultyTileLayer />
          <GetCoordinates setData={setData} data={data} />
        </MapContainer>
      </Dialog>
    </React.Fragment>
  );
}
