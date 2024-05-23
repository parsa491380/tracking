import React, { useCallback, useMemo, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import location from "./img/location.png";
import target from "./img/target.png";
import { Icon } from "leaflet";

const center = [35.5386, 51.5026];

export default function DragableMarker(type) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={new Icon({ iconUrl: type, iconSize: [30, 35] })}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable} style={{ Align: "center" }}>
          {draggable
            ? " اکنون با جابجایی نشانگر موقعیت مبدا خود را مشخص کنید و در پایان دوباره روی این متن کلیک کنید تا موقعیت تایید شود "
            : "لطفا برای جابجایی مبدا روی این متن کلیک کنید "}
          {console.log(position)}
        </span>
      </Popup>
    </Marker>
  );
}
