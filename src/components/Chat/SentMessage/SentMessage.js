import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "10px 10px 0 10px",
    background: "#fff",
    border: "1px solid rgba(112, 124, 151, 0.25)",
    boxShadow:
      "15px 15px 35px rgba(112, 124, 151, 0.05), 10px 10px 25px rgba(112, 124, 151, 0.05)",
  },
}));

export default function SentMessage({ content, domId }) {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="flex-end" m="2rem 0" id={domId}>
      <Box color="#fff" className={classes.root} p="0.7rem" maxWidth="70%">
        <Typography variant="subtitle1">{content}</Typography>
      </Box>
    </Box>
  );
}
