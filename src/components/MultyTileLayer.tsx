import React, { useState } from "react";
import LayersIcon from "@mui/icons-material/Layers";
import { TileLayer } from "react-leaflet";
import "./css/MultyTileLayer.css";
import { ClassNames } from "@emotion/react";

export default function MultyTileLayer() {
  const [mapNumber, setMapNumber] = useState<number>(1);
  const [hover, setHover] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(false);
  const [satActive, setSatActive] = useState<string>("inactive");
  const [openActive, setOpenActive] = useState<string>("active");

  const togleToSatMap = () => {
    setMapNumber(2);
    setSatActive("active");
    setOpenActive("inactive");
  };
  const togleToOpenMap = () => {
    setMapNumber(1);
    setSatActive("inactive");
    setOpenActive("active");
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

  const alarm = () => {
    alert(" My Alarm ");
  };

  const togleMore = () => {
    if (more === true) {
      setMore(false);
    } else {
      setMore(true);
    }
    setHover(false);
  };

  const layers = {
    google: "https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",

    open: "https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}",

    dark: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  };
  const items = [
    {
      url: "https://upload.wikimedia.org/wikipedia/fa/thumb/0/0f/%D9%86%D9%82%D8%B4%D9%87_%D8%AA%D9%88%D9%BE%D9%88%DA%AF%D8%B1%D8%A7%D9%81%DB%8C.png/250px-%D9%86%D9%82%D8%B4%D9%87_%D8%AA%D9%88%D9%BE%D9%88%DA%AF%D8%B1%D8%A7%D9%81%DB%8C.png",
      title: " Terrain ",
      link: "#a",
      quickAccess: true,
      funk: alarm,
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUd01fggb9t8iNx-wZwZiUIMjC6uGd6OQeFA&s",
      title: "Teraffic ",
      link: "#b",
      quickAccess: true,

      funk: alarm,
    },
    {
      url: "https://www.labege.fr/wp-content/uploads/2018/08/bus-scolaire.jpg",
      title: " Transit ",
      link: "#c",
      quickAccess: true,

      funk: alarm,
    },
    {
      url: "https://cdn.prod.website-files.com/5b44edefca321a1e2d0c2aa6/5f61480845b551637e3c3969_Dimensions-Transport-Bicycles-Fixed-Gear-Bicycle-Fixie-Icon.svg",
      title: "Biking",
      link: "#d",
      quickAccess: true,

      funk: alarm,
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUpJTpd0c51OCliwq1n2NIWX5NjHyx0jpBhomwUyDrdA&s",
      title: "More",
      link: "#e",
      quickAccess: true,

      funk: togleMore,
    },
    {
      url: "https://cdn.prod.website-files.com/5b44edefca321a1e2d0c2aa6/5f61480845b551637e3c3969_Dimensions-Transport-Bicycles-Fixed-Gear-Bicycle-Fixie-Icon.svg",
      title: "Biking",
      link: "#d",
      quickAccess: false,
      funk: alarm,
    },
    {
      url: "https://cdn.prod.website-files.com/5b44edefca321a1e2d0c2aa6/5f61480845b551637e3c3969_Dimensions-Transport-Bicycles-Fixed-Gear-Bicycle-Fixie-Icon.svg",
      title: "Biking",
      link: "#d",
      quickAccess: false,
      funk: alarm,
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
        {props.a.map((item) => {
          return (
            <>
              <div onClick={item.funk} className="hoverItems" key={item.title}>
                <a target={item.link} key={item.link}>
                  <img
                    className="hoverItemImages"
                    src={item.url}
                    key={item.src}
                  />
                  <h4 id="hoverItemText">{item.title}</h4>
                </a>
              </div>
            </>
          );
        })}
      </>
    );
  }

  return (
    <>
      <div
        id="baseDiv"
        onClick={togleMap}
        onMouseOver={onMouseOver}
        onMouseOut={onHoverOut}
      >
        {mapNumber === 1 ? (
          <div id="satelliteStyle">
            <center className="center">
              <TileLayer url={layers.google} />
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
              <TileLayer url={layers.open} />
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
        <div
          id="hoverBaseDiv"
          onMouseOver={onMouseOver}
          onMouseOut={onHoverOut}
        >
          <div id="hoverVisibleDiv">
            <DisplayMoreItems a={quickAccessItems} />
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

            {/* 














 */}

            <div className={satActive} onClick={togleToSatMap}>
              <div id="satelliteMoreStyle"></div>
              <h4 className={` baseMapSubtitle `}> satellite</h4>
            </div>

            <div className={openActive} onClick={togleToOpenMap}>
              <div id="openStreetMoreStyle"></div>
              <h4 className={` baseMapSubtitle `}>open-street</h4>
            </div>

            {/* 























 */}

            <span className="span"></span>

            <h4 className="moretext"> MORE MAPS LAYERS : </h4>
            <DisplayMoreItems a={moreDivItems} />
          </div>
        </>
      ) : null}
    </>
  );
}
