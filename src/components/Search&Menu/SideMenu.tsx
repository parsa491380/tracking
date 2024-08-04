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
import HistoryIcon from "@mui/icons-material/History";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SettingsIcon from "@mui/icons-material/Settings";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/material";
import "../../Assets/Styles/SideMenu.css";

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

 const handleDrawerOpen = () => {
  open.open.setOpenSideMenu(!openSideMenu);
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
     <IconButton onClick={handleDrawerOpen}>
      {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
     </IconButton>
    </DrawerHeader>
    <Divider />
    <List sx={{ borderRight: "4px solid   #005792" }}>
     {[
      {
       text: "Search Histiry",
       icon: <HistoryIcon className="items" />,
      },
      { text: "Saved Locations", icon: <BookmarkIcon className="items" /> },
      {
       text: "Add location to the map ",
       icon: <AddBoxIcon className="items" />,
      },
      { text: "Acount info", icon: <AccountCircleIcon className="items" /> },
     ].map((text, index) => (
      <ListItem key={index} disablePadding>
       <ListItemButton>
        <ListItemIcon>{text.icon}</ListItemIcon>
        <ListItemText primary={text.text} className="items" />
       </ListItemButton>
      </ListItem>
     ))}
    </List>
    <Divider />
    <List sx={{ borderRight: "4px solid   #005792" }}>
     {[
      { text: "Terms of Service ", icon: <HowToRegIcon className="items" /> },
      { text: "Contact us", icon: <PermPhoneMsgIcon className="items" /> },
      { text: "Settings ", icon: <SettingsIcon className="items" /> },
     ].map((text, index) => (
      <ListItem key={index} disablePadding>
       <ListItemButton>
        <ListItemIcon>{text.icon}</ListItemIcon>
        <ListItemText primary={text.text} className="items" />
       </ListItemButton>
      </ListItem>
     ))}
    </List>
   </Drawer>
  </Box>
 );
}
