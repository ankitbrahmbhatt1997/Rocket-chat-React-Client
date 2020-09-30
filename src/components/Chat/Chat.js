import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Collapse } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import ChatSideBar from "components/Chat/ChatSidebar";
import ChatBody from "components/Chat/ChatBody";
import ChatDoc from "components/Chat/ChatDoc";
import blue from "@material-ui/core/colors/blue";
import { Transition } from "react-transition-group";
import Vc from "components/Chat/Vc";

const drawerWidth = 300;
const docWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100vh",
    borderRadius: "1rem",
    flexDirection: (props) => (props.smallScreen ? "column" : "row"),
  },
  // (props) => (props.smallScreen ? "block" : "flex"),
  drawer: {
    width: (props) => (props.smallScreen ? "100%" : drawerWidth),
    borderRight: `0.1rem solid ${theme.palette.border}`,
    height: "100%",
  },
  // selected: {
  //   background: blue["700"],
  // },
  // item: {
  //   "&:hover": {
  //     background: blue["700"],
  //   },
  // },
  //   // necessary for content to be below app bar
  //   toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: "0",
    overflow: "hidden",
  },
  rightDoc: {
    borderLeft: `0.1rem solid ${theme.palette.border}`,
    height: "100%",
    minWidth: 300,
    width: (props) => (props.smallScreen ? "100%" : 300),
  },
}));

// const defaultStyle = {
//   transition: `width 300ms ease-in-out`,
//   width: 0,
//   overflow: "hidden",
// };
const isSmallScreen = (width) => {
  return width < 1000;
};

// const transitionStyles = {
//   entering: { width: 300, opacity: 0.5 },
//   entered: { width: 300, opacity: 1 },
//   exiting: { width: 0, opacity: 0 },
//   exited: { width: 0, opacity: 0 },
// };

export default function Chat({ screenWidth, showVC }) {
  const [selected, setSelected] = useState(0);
  const [docOpen, setOpen] = useState(true);
  const [step, setStep] = useState(0);
  const classes = useStyles({
    docOpen,
    smallScreen: isSmallScreen(screenWidth),
  });

  const openDoc = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {!showVC ? (
        <Fragment>
          {isSmallScreen(screenWidth) ? (
            step !== 0 ? null : (
              <ChatSideBar
                classes={classes}
                selected={selected}
                setSelected={setSelected}
                setStep={setStep}
              />
            )
          ) : (
            <ChatSideBar
              classes={classes}
              selected={selected}
              setSelected={setSelected}
              setStep={setStep}
            />
          )}

          {isSmallScreen(screenWidth) ? (
            step !== 1 ? null : (
              <ChatBody
                selected={selected}
                classes={classes}
                rightDocOpen={openDoc}
                smallScreen={isSmallScreen(screenWidth)}
                setStep={setStep}
              />
            )
          ) : (
            <ChatBody
              selected={selected}
              classes={classes}
              rightDocOpen={openDoc}
              smallScreen={isSmallScreen(screenWidth)}
              setStep={setStep}
            />
          )}

          {isSmallScreen(screenWidth) ? (
            step !== 2 ? null : (
              <ChatDoc
                classes={classes}
                setStep={setStep}
                smallScreen={isSmallScreen(screenWidth)}
              />
            )
          ) : (
            <ChatDoc
              classes={classes}
              setStep={setStep}
              smallScreen={isSmallScreen(screenWidth)}
            />
          )}
        </Fragment>
      ) : (
        <Fragment>
          <Vc />
          <ChatBody
            selected={selected}
            classes={classes}
            rightDocOpen={openDoc}
            smallScreen={isSmallScreen(screenWidth)}
            setStep={setStep}
          />
        </Fragment>
      )}
    </div>
  );
}
