import React, { useContext, useState } from "react";
import ChoseLocation from "./ChoseLocation.tsx";
import Button from "@mui/material/Button";
import MyContext from "../App.js";
export default function LocationGeter() {
  ////
  // const { startLoc } = useContext(MyContext);

  //////
  const startLocLifter = (variable) => {
    if (startLoc.length > 0) {
      alert(
        ". در شما قبلا یک مبدا انتخاب  کرده اید در صورت تمایل به تغییر آن باید صفحه را تازه سازی کنید"
      );
      return false;
    }
    const data = startLoc;
    data.push(variable);
    setStartLoc(data);
    console.log(startLoc);
  };

  const destinationLifter = (variable) => {
    const data = destination;
    data.push(variable);
    setDestination(data);
    console.log(destination);
    alert(
      "در صورت وجود بیش از یک مقصد می توانید مقصد های بیشتری را از طریق همین بخش تعیین کنید اما به ترتیب آن ها دقت کنید "
    );
  };

  const send = () => {
    carrier(startLoc, destination);
    // console.log(startLoc);
    // console.log(destination);
  };

  return (
    <div>
      <ChoseLocation
        carrier={startLocLifter}
        title={"لطفا مبدا را انتخاب کنید "}
        button={"انتخاب مبدا"}
      />
      <ChoseLocation
        carrier={destinationLifter}
        title={"لطفا مقصد را انتخاب کنید "}
        button={"انتخاب مقصد"}
      />
      <Button
        variant="outlined"
        onClick={send}
        style={{ width: "34%", height: "5vh" }}
      >
        مسیر یابی
      </Button>
    </div>
  );
}

// Endpoints:
// http://localhost:8000/data
