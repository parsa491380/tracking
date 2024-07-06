import * as React from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SideMenu from "./SideMenu.tsx";
import "./css/AdressTextField.css";

export default function AdressTextField() {
  return (
    <>
      <Paper component="form" id="paperStyle">
        <SideMenu />
        <input type="text" id="input" placeholder="Search Google Maps" />
        <IconButton
          type="button"
          sx={{ p: "10px", color: "#0ab6ff" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}
