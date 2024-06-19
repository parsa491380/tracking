import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import "./css/SideMenu.css";
export default function SideMenu() {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <IconButton
        sx={{ p: "10px", display: "inline" }}
        aria-label="menu"
        onClick={handleOpen}
      >
        <MenuIcon titleAccess=" Open Menu" />
      </IconButton>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div id="div">
            <h4 className="title"> SALMAN MAPS </h4>

            <div id="closer" onClick={handleClose}>
              X
            </div>
            <span className="span"></span>
          </div>
        </Modal>
      </div>
    </>
  );
}
