import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "10px 10px 0 10px",
    background: "#fff",
    border: "1px solid rgba(112, 124, 151, 0.25)",
    boxShadow:
      "15px 15px 35px rgba(112, 124, 151, 0.05), 10px 10px 25px rgba(112, 124, 151, 0.05)",
  },
  time: {
    color: "rgba(112, 124, 151, 0.7)",
  },
}));

export default function SentMessage({ content, domId, parsedTimestamp }) {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="flex-end" m="2rem 0" id={domId}>
      <Box maxWidth="70%">
        <Box p="0.7rem" className={classes.root}>
          <Typography variant="subtitle1">{content}</Typography>
        </Box>
        <Box textAlign="end">
          <Typography variant="caption" className={classes.time}>
            {parsedTimestamp}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
