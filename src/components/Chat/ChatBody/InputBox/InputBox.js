import {
  Box,
  Icon,
  IconButton,
  makeStyles,
  TextField,
  useTheme,
} from "@material-ui/core";
import { containerContext } from "components/Chat/ChatContainer";
import { DropzoneDialog } from "material-ui-dropzone";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "slices/groupSlice";
import { sendMessage, typingIndicator } from "utils/chatUtils";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "2.5rem",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    background: theme.palette.secondPrimary,
  },

  container: {
    borderTop: `0.2rem solid ${theme.palette.border}`,
    paddingTop: "0.5rem",
  },
  root: {
    background: "#fff",
    padding: "1rem .5rem",
  },
  underline: {
    "&:before": {
      borderBottom: "2px solid green",
    },
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderBottom: "2px solid blue",
    },
    "&:after": {
      borderBottom: "3px solid purple",
    },
  },
}));

export default function InputBox({ groupId }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState("");
  const { ws } = useContext(containerContext);

  const username = useSelector((state) => state.auth.user.username);
  const classes = useStyles();
  const theme = useTheme();

  let timer,
    timeoutVal = 1000;

  // logic for sending typing indicator only when user stops typing
  const onKeyUp = () => {
    window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
    timer = window.setTimeout(() => {
      typingIndicator(ws, groupId, username, false);
    }, timeoutVal);
  };

  const onKeyPress = () => {
    window.clearTimeout(timer);
    typingIndicator(ws, groupId, username, true);
  };

  // send messages on  Enter
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSendClick();
    }
  };

  // handler for file upload
  const onUploadClick = () => {
    setOpen(true);
  };

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSendClick = () => {
    sendMessage(ws, message, groupId);
    setMessage("");
  };
  return (
    <React.Fragment>
      <Box display="flex" className={classes.container}>
        <IconButton onClick={onUploadClick}>
          <Icon className={classes.icon}>add_circle</Icon>
        </IconButton>
        <Box flexGrow={1}>
          <TextField
            style={{ width: "100%", borderRadius: "1rem" }}
            id="filled-basic"
            variant="filled"
            placeholder="Type a message here"
            inputProps={{ className: classes.root }}
            value={message}
            onChange={onChange}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
          />
        </Box>
        <IconButton onClick={onSendClick}>
          <Icon className={classes.icon}>send_Circle</Icon>
        </IconButton>
      </Box>
      <DropzoneDialog
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSave={async (files) => {
          console.log("Files:", files);
          dispatch(uploadFile({ file: files[0], groupId }));
          setOpen(false);
        }}
        showPreviews={true}
        filesLimit={1}
        showFileNamesInPreview={true}
        acceptedFiles={[
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ]}
      />
    </React.Fragment>
  );
}
