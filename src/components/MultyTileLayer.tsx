import React, { useState } from "react";
import LayersIcon from "@mui/icons-material/Layers";
import { TileLayer } from "react-leaflet";

export default function MultyTileLayer() {
  const [mapNumber, setMapNumber] = useState("1");
  const [hover, setHover] = useState(false);
  const [more, setMore] = useState(false);

  const layers = {
    google: "https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",

    open: "https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}",

    dark: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  };

  const togleMap = () => {
    if (mapNumber === "1") {
      setMapNumber("2");
    } else {
      setMapNumber("1");
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
  };

  const items = [
    {
      url: "https://cdn.shopify.com/s/files/1/0384/0233/files/topographic-map-example.png",
      title: " Terrain ",
      link: "#a",
      funk: alarm,
    },
    {
      url: "https://www.arcgis.com/sharing/rest/content/items/bbdcd78953e5439985004023c8eda03d/info/screenshots/traffic_rio.jpg",
      title: "Teraffic ",
      link: "#b",
      funk: alarm,
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Hermes_1279-III.jpg/640px-Hermes_1279-III.jpg",
      title: " Transit ",
      link: "#c",
      funk: alarm,
    },
    {
      url: "https://i.pinimg.com/736x/fd/d2/53/fdd25311ed3e5010c87bf643b53bd504.jpg",
      title: "Biking",
      link: "#d",
      funk: alarm,
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUpJTpd0c51OCliwq1n2NIWX5NjHyx0jpBhomwUyDrdA&s",
      title: "More",
      link: "#e",
      funk: togleMore,
    },
  ];

  const satelliteStyle = {
    width: "80px",
    height: "80px",
    zIndex: "1",
    border: "2px solid black",
    borderRadius: "10%",
    backgroundImage:
      "url(https://assets-global.website-files.com/609ed46055e27a02ffc0749b/63e283046102e525aae4fcc1_Mapbox%20satellite%20image%20-%20Sutter%20Buttes%2C%20California.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  };

  const openStreetStyle = {
    width: "80px",
    height: "80px",
    zIndex: "1",
    border: "2px solid black",
    borderRadius: "10%",
    backgroundImage:
      "url(https://upload.wikimedia.org/wikipedia/commons/b/bb/Open_Street_Map.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  };
  return (
    <>
      <div
        onClick={togleMap}
        onMouseOver={onMouseOver}
        onMouseOut={onHoverOut}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "80px",
          width: "80px",
          height: "80px",
          zIndex: "99999",
          borderRadius: "10%",
        }}
      >
        {mapNumber === "1" ? (
          <div style={satelliteStyle}>
            <center
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                width: "80px",
                height: "80px",
                borderRadius: "10%",
              }}
            >
              <TileLayer url={layers.google} />
              {hover === false ? (
                <>
                  <LayersIcon
                    style={{
                      position: "absolute",
                      top: "25px",
                      left: "30px",
                      borderRadius: "10%",
                    }}
                  />
                  layers
                </>
              ) : (
                " change layer to : satellite "
              )}
            </center>
          </div>
        ) : (
          <div style={openStreetStyle}>
            <center
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                width: "80px",
                height: "80px",
              }}
            >
              <TileLayer url={layers.open} />
              {hover === false ? (
                <>
                  <LayersIcon
                    style={{
                      position: "absolute",
                      top: "25px",
                      left: "30px",
                    }}
                  />
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
          onMouseOver={onMouseOver}
          onMouseOut={onHoverOut}
          style={{
            width: "470px",
            height: "80px",
            position: "absolute",
            bottom: "40px",
            left: "80px",
            transition: "width 5s",
            zIndex: "10000",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "0",
              width: "380px",
              height: "83px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            {items.map((item) => {
              return (
                <>
                  <div
                    style={{
                      width: "20px",
                      height: "80px",
                      display: "inline-block",
                    }}
                  ></div>

                  <div
                    onClick={item.funk}
                    style={{
                      width: "50px",
                      height: "70px",
                      display: "inline-block",
                    }}
                  >
                    <a target={item.link}>
                      <img
                        src={item.url}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "5px",
                        }}
                      />
                      <h4>{item.title}</h4>
                    </a>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      ) : null}

      {more === true ? (
        <>
          <div
            style={{
              position: "absolute",
              width: "250px",
              height: "500px",
              bottom: "30px",
              left: "30px",
              backgroundColor: "white",
              zIndex: "100000",
            }}
          ></div>
        </>
      ) : null}
    </>
  );
}
