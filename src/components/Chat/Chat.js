import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import ChatBody from "components/Chat/ChatBody";
import ChatDoc from "components/Chat/ChatDoc";
import ChatSideBar from "components/Chat/ChatSidebar";
import React, { Fragment, useState } from "react";

const drawerWidth = 300;
const docWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100vh",
    borderRadius: "1rem",
    flexDirection: (props) => (props.isSmallScreen ? "column" : "row"),
  },
  drawer: {
    width: (props) => (props.isSmallScreen ? "100%" : drawerWidth),
    borderRight: `0.1rem solid ${theme.palette.border}`,
    height: "100%",
    overflow: "scroll",
  },

  content: {
    flexGrow: 1,
    padding: "0",
    overflow: "hidden",
  },
  rightDoc: {
    borderLeft: `0.1rem solid ${theme.palette.border}`,
    height: "100%",
    minWidth: 300,
    width: (props) => (props.isSmallScreen ? "100%" : 300),
    overflow: "scroll",
  },
}));

const getMobileStepContent = (
  step,
  classes,
  selected,
  setSelected,
  setStep,
  isSmallScreen,
  openDoc
) => {
  switch (step) {
    case 0:
      return (
        <ChatSideBar
          classes={classes}
          selected={selected}
          setSelected={setSelected}
          setStep={setStep}
        />
      );
    case 1:
      return (
        <ChatBody
          selected={selected}
          classes={classes}
          rightDocOpen={openDoc}
          smallScreen={isSmallScreen}
          setStep={setStep}
        />
      );
    case 2:
      return (
        <ChatDoc
          classes={classes}
          setStep={setStep}
          selected={selected}
          smallScreen={isSmallScreen}
        />
      );
  }
};

const DesktopChat = ({
  classes,
  selected,
  setSelected,
  setStep,
  openDoc,
  isSmallScreen,
}) => {
  return (
    <Fragment>
      <ChatSideBar
        classes={classes}
        selected={selected}
        setSelected={setSelected}
        setStep={setStep}
      />
      <ChatBody
        selected={selected}
        classes={classes}
        rightDocOpen={openDoc}
        smallScreen={isSmallScreen}
        setStep={setStep}
      />
      <ChatDoc
        classes={classes}
        setStep={setStep}
        selected={selected}
        smallScreen={isSmallScreen}
      />
    </Fragment>
  );
};

const MobileChat = ({
  step,
  classes,
  selected,
  setSelected,
  setStep,
  screenWidth,
  openDoc,
}) => {
  return (
    <Fragment>
      {getMobileStepContent(
        step,
        classes,
        selected,
        setSelected,
        setStep,
        screenWidth,
        openDoc
      )}
    </Fragment>
  );
};

{
}

export default function Chat({ isSmallScreen }) {
  const [docOpen, setOpen] = useState(true);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(0);
  const classes = useStyles({
    docOpen,
    isSmallScreen,
  });

  const openDoc = () => {
    setOpen((prevState) => !prevState);
  };

  const childProps = {
    step,
    classes,
    selected,
    setSelected,
    setStep,
    openDoc,
    isSmallScreen,
  };

  let VisibleChat;

  if (isSmallScreen) {
    VisibleChat = <MobileChat {...childProps} />;
  } else {
    VisibleChat = <DesktopChat {...childProps} />;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      {VisibleChat}
    </div>
  );
}

//TODO To be used when vc is live

// return (
//   <div className={classes.root}>
//     <CssBaseline />

//     {!showVC ? (
//       isSmallScreen ? (
//         <MobileChat {...childProps} />
//       ) : (
//         <DesktopChat {...childProps} />
//       )
//     ) : (
//       <Fragment>
//         <Vc />
//         <ChatBody
//           selected={selected}
//           classes={classes}
//           rightDocOpen={openDoc}
//           smallScreen={isSmallScreen}
//           setStep={setStep}
//         />
//       </Fragment>
//     )}
//   </div>
// );
