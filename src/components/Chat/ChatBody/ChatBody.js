import React, { useContext } from "react";
import { makeStyles, Box, Typography, Input } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import Message from "components/Chat/Message";
import InputBox from "components/Chat/InputBox";
import ScrollTo from "components/Chat/ScrollTo";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",

      height: "90vh",
    },
    header: {
      borderRadius: "inherit",
      flexBasis: "5rem",
      minHeight: "5rem",
      width: "100%",
      padding: "0 3rem",
      boxShadow: "0px 1px 10px rgba(0,0,0,0.4)",
    },
    heading: {
      fontWeight: "bold",
    },
    messages: {
      overflow: "scroll",
      flexGrow: "1",
    },
    footer: {
      background: grey[200],
      padding: "1rem",
    },
  };
});

export default function ChatBody({
  group,
  classes: parentClasses,
  messages,
  sendMessage,
}) {
  const classes = useStyles();

  return (
    <Box className={parentClasses.content}>
      <Box className={classes.container}>
        <Box
          className={classes.header}
          bgcolor={grey["200"]}
          display="flex"
          alignItems="center"
        >
          <Typography variant="h5" color="primary" className={classes.heading}>
            {group.name}
          </Typography>
        </Box>
        <Box p="2rem" className={classes.messages}>
          {messages.map((message) => {
            return <Message message={message} />;
          })}
          <ScrollTo />
        </Box>
        <Box className={classes.footer}>
          <InputBox sendMessage={sendMessage} groupId={group._id} />
        </Box>
      </Box>
    </Box>
  );
}
