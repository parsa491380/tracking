import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Typography } from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
 display: "flex",
 alignItems: "center",
 padding: theme.spacing(0, 1),
 // necessary for content to be below app bar
 ...theme.mixins.toolbar,
 justifyContent: "flex-end",
}));

export default function SideMenu(open) {
 const theme = useTheme();
 const openSideMenu = open.open.openSideMenu;
 const setOpenSideMenu = (bool) => {
  open.open.setOpenSideMenu(bool);
 };

 const handleDrawerOpen = () => {
  setOpenSideMenu(true);
 };

 const handleDrawerClose = () => {
  setOpenSideMenu(false);
 };

 return (
  <Box sx={{ display: "inline-block", width: 55, zIndex: 9999999 }}>
   <Toolbar>
    <IconButton
     color="inherit"
     aria-label="open drawer"
     onClick={handleDrawerOpen}
     edge="start"
     sx={{
      mr: 2,
     }}
    >
     <MenuIcon />
    </IconButton>
   </Toolbar>
   <Drawer
    sx={{
     width: 300,
     flexShrink: 0,
     "& .MuiDrawer-paper": {
      width: 300,
      boxSizing: "border-box",
     },
    }}
    variant="persistent"
    anchor="left"
    open={openSideMenu}
   >
    <DrawerHeader sx={{ borderRight: "4px solid   #005792" }}>
     <Typography variant="h5" sx={{ color: "#005792" }}>
      ROUTING PROJECT
     </Typography>
     <IconButton onClick={handleDrawerClose}>
      {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
     </IconButton>
    </DrawerHeader>
    <Divider />
    <List sx={{ borderRight: "4px solid   #005792" }}>
     {[
      "Search Histiry",
      "Saved Locations",
      "Add location to the map ",
      "Acount info",
     ].map((text, index) => (
      <ListItem key={text} disablePadding>
       <ListItemButton>
        <ListItemIcon>
         {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
       </ListItemButton>
      </ListItem>
     ))}
    </List>
    <Divider />
    <List sx={{ borderRight: "4px solid   #005792" }}>
     {["Terms of Service ", "Contact us", "Settings "].map((text, index) => (
      <ListItem key={text} disablePadding>
       <ListItemButton>
        <ListItemIcon>
         {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
       </ListItemButton>
      </ListItem>
     ))}
    </List>
   </Drawer>
  </Box>
 );
}
