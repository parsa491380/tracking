import * as React from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import RouteFindingMenu from "./RouteFindingMenu.tsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function AdressTextField() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 370,
          height: "45px",
          zIndex: 9999,
          position: "absolute",
          left: "17px",
          top: "13px",
          borderRadius: "50px",
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu" onClick={handleOpen}>
          <MenuIcon titleAccess=" Open Menu" />
        </IconButton>
        <input
          type="text"
          style={{
            width: "240px",
            height: "30px",
            border: "1px solid white",
            borderRadius: "5px",
          }}
          placeholder="Search Google Maps"
        />

        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <RouteFindingMenu />
      </Paper>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              backgroundColor: "white ",
              width: "400px",
              height: "100vh",
              boxShadow: "100",
            }}
          ></div>
        </Modal>
      </div>
    </>
  );
}
