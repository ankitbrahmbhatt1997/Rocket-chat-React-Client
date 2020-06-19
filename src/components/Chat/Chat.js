import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import ChatSideBar from "./ChatSidebar";
import ChatBody from "./ChatBody";

import blue from "@material-ui/core/colors/blue";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  container: {
    background: "linear-gradient(to right, #57c1eb 0%, #246fa8 100%)",
    height: "100vh",
  },
  root: {
    display: "flex",
    width: "70%",
    borderRadius: "1rem",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: "90vh",
    background: theme.palette.primary.main,
    color: "#fff",
    borderRadius: "1rem 0 0 1rem",
  },
  selected: {
    background: blue["700"],
  },
  item: {
    "&:hover": {
      background: blue["700"],
    },
  },
  //   // necessary for content to be below app bar
  //   toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: "0",
    overflow: "hidden",
    borderRadius: "0 1rem 1rem 0",
  },
}));

export default function Chat() {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  return (
    <Box
      className={classes.container}
      display="flex"
      justifyContent="center"
      alignItems="center"
      // p="2rem 0"
    >
      <div className={classes.root}>
        <CssBaseline />
        <ChatSideBar
          classes={classes}
          selected={selected}
          setSelected={setSelected}
        />
        <ChatBody selected={selected} classes={classes} />
      </div>
    </Box>
  );
}
