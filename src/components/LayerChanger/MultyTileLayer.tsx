import React, { LegacyRef, useState } from "react";
import LayersIcon from "@mui/icons-material/Layers";
import { TileLayer } from "react-leaflet";
import "../../Assets/Styles/MultyTileLayer.css";
import L from "leaflet";

export default function MultyTileLayer() {
 const layers = {
  google: "https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",

  open: "https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}",

  dark:
   "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",

  terrian: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",

  transit: "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png",
 };
 const vectorLayer = {
  blackRoad: "https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
 };

 const [mapNumber, setMapNumber] = useState<number>(1);
 const [layerUrl, setLayerUrl] = useState(layers.google);
 const [vectorLayerUrl, setVectorLayerUrl] = useState<string | null>(null);

 const [hover, setHover] = useState<boolean>(false);
 const [more, setMore] = useState<boolean>(false);
 const [satActive, setSatActive] = useState<string>("inactive");
 const [openActive, setOpenActive] = useState<string>("active");

 const divRef: LegacyRef<HTMLDivElement> | undefined = React.useRef(null);
 React.useEffect(() => {
  L.DomEvent.disableClickPropagation(divRef.current!);
  L.DomEvent.disableScrollPropagation(divRef.current!);
 });

 const togleToSatMap = () => {
  setMapNumber(2);
  setSatActive("active");
  setOpenActive("inactive");
  setLayerUrl(layers.open);
 };
 const togleToOpenMap = () => {
  setMapNumber(1);
  setSatActive("inactive");
  setOpenActive("active");
  setLayerUrl(layers.google);
 };

 const togleMap = () => {
  if (mapNumber === 1) {
   togleToSatMap();
  } else {
   togleToOpenMap();
  }
 };

 let myTimeOut;

 const onMouseOver = () => {
  clearTimeout(myTimeOut);
  setHover(true);
 };
 const onHoverOut = () => {
  myTimeOut = setTimeout(() => {
   setHover(false);
  }, 1000);
 };
 const togleMore = () => {
  if (more === true) {
   setMore(false);
  } else {
   setMore(true);
  }
  setHover(false);
 };
 const items = [
  {
   key: 1,
   url: "https://upload.wikimedia.org/wikipedia/fa/thumb/0/0f/%D9%86%D9%82%D8%B4%D9%87_%D8%AA%D9%88%D9%BE%D9%88%DA%AF%D8%B1%D8%A7%D9%81%DB%8C.png/250px-%D9%86%D9%82%D8%B4%D9%87_%D8%AA%D9%88%D9%BE%D9%88%DA%AF%D8%B1%D8%A7%D9%81%DB%8C.png",
   title: " Topography ",
   link: "#a",
   quickAccess: true,
   funk: () => {
    setLayerUrl(layers.terrian);
   },
  },
  {
   key: 2,
   url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVHSutzc9_Y8hdNk5KdRUA7ofFleYrrYHzrw&s",
   title: "train",
   link: "#b",
   quickAccess: true,
   funk: () => {
    setVectorLayerUrl(vectorLayer.blackRoad);
   },
  },
  {
   key: 3,
   url: "https://www.labege.fr/wp-content/uploads/2018/08/bus-scolaire.jpg",
   title: " Transit ",
   link: "#c",
   quickAccess: true,
   funk: () => {
    setLayerUrl(layers.transit);
   },
  },
  {
   key: 4,
   url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnWD5JG36hXD349vgUn0dPfl7MPMGni1dalA&s",
   title: "dark",
   link: "#d",
   quickAccess: true,
   funk: () => {
    setLayerUrl(layers.dark);
   },
  },
  {
   key: 5,
   url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUpJTpd0c51OCliwq1n2NIWX5NjHyx0jpBhomwUyDrdA&s",
   title: "More",
   link: "#e",
   quickAccess: true,
   funk: togleMore,
  },
  {
   key: 6,
   url: "https://cdn.prod.website-files.com/5b44edefca321a1e2d0c2aa6/5f61480845b551637e3c3969_Dimensions-Transport-Bicycles-Fixed-Gear-Bicycle-Fixie-Icon.svg",
   title: "cycling",
   link: "#g",
   quickAccess: false,
   funk: () => {
    alert(" My Alarm ");
   },
  },
  {
   key: 7,
   url: "https://imageio.forbes.com/specials-images/imageserve/5c0aa5554bbe6f0f2aa19644/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
   title: "motoring",
   link: "#h",
   quickAccess: false,
   funk: () => {
    alert(" My Alarm ");
   },
  },
 ];

 const quickAccessItems = items.filter((item) => {
  return item.quickAccess === true;
 });
 const moreDivItems = items.filter((item) => {
  return item.title !== "More";
 });
 function DisplayMoreItems(props) {
  return (
   <>
    {props.options.map((item) => {
     return (
      <>
       <div onClick={item.funk} className="hoverItems" key={item.key}>
        <a target={item.link} key={item.link}>
         <img className="hoverItemImages" src={item.url} key={item.url} />
         <h4 id="hoverItemText" key={item.title}>
          {item.title}
         </h4>
        </a>
       </div>
      </>
     );
    })}
   </>
  );
 }

 return (
  <div ref={divRef}>
   <div
    id="baseDiv"
    onClick={togleMap}
    onMouseOver={onMouseOver}
    onMouseOut={onHoverOut}
   >
    <TileLayer url={layerUrl} />
    {vectorLayerUrl ? <TileLayer url={vectorLayerUrl} /> : null}

    {mapNumber === 1 ? (
     <div id="satelliteStyle">
      <center className="center">
       {hover === false ? (
        <>
         <LayersIcon className="LayersIcon" />
         layers
        </>
       ) : (
        " change layer to : satellite "
       )}
      </center>
     </div>
    ) : (
     <div id="openStreetStyle">
      <center className="center">
       {hover === false ? (
        <>
         <LayersIcon className="LayersIcon" />
         layers
        </>
       ) : (
        "change layer to  :  open street map "
       )}
      </center>
     </div>
    )}
   </div>
   {hover === true ? (
    <div id="hoverBaseDiv" onMouseOver={onMouseOver} onMouseOut={onHoverOut}>
     <div id="hoverVisibleDiv">
      <DisplayMoreItems options={quickAccessItems} />
     </div>
    </div>
   ) : null}

   {more === true ? (
    <>
     <div id="moreDiv">
      <h4 className="moretext"> BASE MAPS : </h4>
      <div onClick={togleMore} id="closeMoreDiv">
       X
      </div>

      <div className={satActive} onClick={togleToSatMap}>
       <div id="satelliteMoreStyle"></div>
       <h4 className={` baseMapSubtitle `}> satellite</h4>
      </div>

      <div className={openActive} onClick={togleToOpenMap}>
       <div id="openStreetMoreStyle"></div>
       <h4 className={` baseMapSubtitle `}>open-street</h4>
      </div>

      <span className="span"></span>

      <h4 className="moretext"> MORE MAPS LAYERS : </h4>
      <DisplayMoreItems options={moreDivItems} />

      <span className="span"></span>
      <h4 className="moretext"> MAP POINTS : </h4>
     </div>
    </>
   ) : null}
  </div>
 );
}
