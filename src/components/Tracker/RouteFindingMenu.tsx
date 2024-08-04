// default component imports
import React, {
 LegacyRef,
 createContext,
 useContext,
 useEffect,
 useRef,
 useState,
} from "react";
import GetLocByClick from "./GetLocByClick.tsx";
import { RouteContext } from "../../App.tsx";
import { useMap } from "react-leaflet";
import L from "leaflet";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import PolylineAnalizer from "./PolylineAnalizer.tsx";

// icons imports
import CloseIcon from "@mui/icons-material/Close";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsIcon from "@mui/icons-material/Directions";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import "../../Assets/Styles/RouteFindingMenu.css";

// main code
export default function RouteFindingMenu(prop) {
 const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
 const [reverser, setReverser] = useState<boolean>(true);

 const {
  openLocMenu,
  setOpenLocMenu,
  firstLoc,
  setFirstLoc,
  secondLoc,
  setSecondtLoc,
  data,
  setData,
  setRoutingType,
  routingType,
  setRoutingDetailEnable,
 } = useContext(RouteContext);

 const open = Boolean(anchorEl);
 const map = useMap();
 const divRef : LegacyRef<HTMLDivElement> | undefined = useRef(null);
 useEffect(() => {
  L.DomEvent.disableClickPropagation(divRef.current!);
  L.DomEvent.disableScrollPropagation(divRef.current!);
 }, [openLocMenu, firstLoc, data]);

 const handleOpen = () => {
  setOpenLocMenu(true);
  handlePopoverClose();
  prop.prop.setOpenSideMenu(false);
 };

 const handleClose = () => {
  setSecondtLoc(null);
  setFirstLoc(null);
  setData(null);
  setOpenLocMenu(false);
  setRoutingDetailEnable(false);
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
  setReverser(!reverser);
  setRoutingDetailEnable(false);
 };

 let startLocIcon = new L.Icon({
  iconUrl: "https://cdn.icon-icons.com/icons2/46/PNG/128/launch_9484.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -20],
 });
 const endLocIcon = new L.Icon({
  iconUrl:
   "https://cdn.icon-icons.com/icons2/2286/PNG/512/astronaut_flag_space_univers_galaxia_spaceman_rocketman_moon_icon_141226.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -20],
 });

 return (
  <div ref={divRef}>
   {openLocMenu === false ? (
    <>
     <div
      id="iconDiv"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      onClick={handleOpen}
     >
      <DirectionsIcon id="DirectionsIcon" />
     </div>
     <Popover
      id="mouse-over-popover"
      sx={{
       pointerEvents: "none",
       left: 6,
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
      <Typography sx={{ p: 1, color: "#0ab6ff", height: "40px" }}>
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
      bgcolor: "#005792",
     },
    }}
    variant="persistent"
    anchor="left"
    open={openLocMenu}
   >
    <div id="iconGroupContainer">
     <DirectionsSubwayIcon className="disabled" />
     <DirectionsCarIcon
      className={routingType === "car" ? "iconGroup active" : "iconGroup"}
      onClick={() => {
       setRoutingType("car");
       setRoutingDetailEnable(false);
      }}
     />
     <DirectionsWalkIcon
      className={routingType === "foot" ? "iconGroup active" : "iconGroup"}
      onClick={() => {
       setRoutingType("foot");
       setRoutingDetailEnable(false);
      }}
     />
     <DirectionsBikeIcon
      className={routingType === "bike" ? "iconGroup active" : "iconGroup"}
      onClick={() => {
       setRoutingType("bike");
       setRoutingDetailEnable(false);
      }}
     />
     <AirplanemodeActiveIcon className="disabled" />{" "}
     <CloseIcon
      onClick={handleClose}
      className="iconGroup "
      titleAccess="cancel and close routing"
     />
     <SwapVertIcon
      id="reverseLoc"
      onClick={reverseRoute}
      titleAccess="swap the start and destination"
     />
     <div className="inputDiv">
      <img
       className="img"
       src="https://cdn.icon-icons.com/icons2/46/PNG/128/launch_9484.png"
       alt="start location icon"
      />

      <h3> . . . . </h3>
      <input
       type="text"
       className="adressInput"
       placeholder={firstLoc === null ? "click the map" : `${firstLoc}`}
      />
     </div>
     <div className="inputDiv">
      <img
       className="img"
       src="https://cdn.icon-icons.com/icons2/2286/PNG/512/astronaut_flag_space_univers_galaxia_spaceman_rocketman_moon_icon_141226.png"
       alt="start location icon"
      />
      <h3> . . . . </h3>
      <input
       type="text"
       className="adressInput"
       placeholder={secondLoc === null ? "click the map" : `${secondLoc}`}
      />
     </div>
     <div id="goTOLocation" onClick={goTOLocation}>
      <PersonPinCircleIcon id="goTOLocationIcon" />
      <h3>GO TO YOUR LOCATION</h3>
     </div>
    </div>
    <PolylineAnalizer reverser={reverser} />
   </Drawer>
   {openLocMenu === true ? (
    <GetLocByClick prop={{ startLocIcon, endLocIcon }} />
   ) : null}
  </div>
 );
}
