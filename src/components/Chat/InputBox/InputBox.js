import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { DropzoneDialog } from "material-ui-dropzone";
import { groupContext } from "contexts";

const useStyles = makeStyles((theme) => ({
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

export default function InputBox({ sendMessage, groupId }) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState("");
  const { uploadFile } = useContext(groupContext);
  const classes = useStyles();

  const onUploadClick = () => {
    setOpen(true);
  };

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  const onSendClick = () => {
    sendMessage(message, groupId);
    setMessage("");
  };
  return (
    <React.Fragment>
      <Box display="flex">
        <IconButton onClick={onUploadClick}>
          <AttachFileIcon />
        </IconButton>
        <Box flexGrow={1}>
          <TextField
            style={{ width: "100%", borderRadius: "1rem" }}
            id="filled-basic"
            variant="filled"
            placeholder="type a message"
            inputProps={{ className: classes.root }}
            value={message}
            onChange={onChange}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={onSendClick}
        >
          Send
        </Button>
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
          uploadFile({ file: files[0], groupId });
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
