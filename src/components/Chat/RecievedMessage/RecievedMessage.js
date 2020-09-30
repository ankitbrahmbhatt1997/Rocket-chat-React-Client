import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import Avatar from "components/Chat/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "0 10px 10px 10px",
    boxShadow:
      "10px 10px 50px rgba(42, 139, 242, 0.1), 15px 15px 35px rgba(42, 139, 242, 0.05), 10px 10px 25px rgba(42, 139, 242, 0.1)",
  },
}));

export default function RecievedMessage({ content, from, domId }) {
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        margin: "2rem 0",
        maxWidth: "70%",
      }}
      id={domId}
    >
      <Avatar value={from[0].toUpperCase()} />
      <Box width="1rem"></Box>
      <Box p="0.7rem" bgcolor="secondary.main" className={classes.root}>
        <Typography variant="subtitle1">{content}</Typography>
      </Box>
    </div>
  );
}
