import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { filterAudioFiles } from "components/Chat/ChatDoc/ChatDoc.utils";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";

// import { downloadDoc } from "utils/apituils";

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "3rem auto",
    height: "80%",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
    outline: "none",
    borderRadius: "0.4rem",
    overflowY: "scroll",
  },
  fileCard: {
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    cursor: "pointer",
  },
  filesContainer: {
    "&:last-child": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    },
    "&:first-child": {
      borderTop: "none",
    },
  },
  greyColor: {
    color: theme.palette.common.grey1,
  },
}));

export default function FilesModal({ open, handleClose }) {
  const classes = useStyles();

  const { files: allFiles } = useSelector(
    (state) => state.groups,
    shallowEqual
  );
  let files = filterAudioFiles(allFiles);
  const body = (
    <div className={classes.paper}>
      <Typography variant="h5">Group Media</Typography>
      <Box height="0.5rem"></Box>
      <Box className={classes.filesContainer}>
        {files.length > 0 &&
          files.map((file, index) => {
            return (
              <Box
                onClick={() => {
                  // downloadDoc(file.path);
                }}
                key={file._id}
                p="1rem 0 1rem 1rem"
                className={classes.fileCard}
                textAlign="start"
              >
                <Typography variant="subtitle1">
                  {truncate(file.name, 30)}
                </Typography>
                <Typography variant="caption">{file.user.name}</Typography>
              </Box>
            );
          })}
      </Box>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
