import { Box, makeStyles, Typography } from "@material-ui/core";
import Avatar from "components/Chat/Avatar";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "flex-start",
    maxWidth: "70%",
  },
  root: {
    borderRadius: "0 10px 10px 10px",

    background: theme.palette.primary.mainGradient,
    boxShadow:
      "10px 10px 50px rgba(42, 139, 242, 0.1), 15px 15px 35px rgba(42, 139, 242, 0.05), 10px 10px 25px rgba(42, 139, 242, 0.1)",
    color: "#fff",
  },
  text: {
    color: "white",
  },
  time: {
    color: "rgba(112, 124, 151, 0.7)",
  },
}));

export default function RecievedMessage({
  content,
  from,
  domId,
  parsedTimestamp,
}) {
  const classes = useStyles();
  return (
    <Box m="2rem 0">
      <div className={classes.container} id={domId}>
        <Avatar value={from[0].toUpperCase()} />
        <Box width="1rem"></Box>
        <Box textAlign="end">
          <Box p="0.7rem" className={classes.root}>
            <Typography className={classes.text} variant="subtitle1">
              {content}
            </Typography>
          </Box>
          <Typography variant="caption" className={classes.time}>
            {parsedTimestamp}
          </Typography>
        </Box>
      </div>
    </Box>
  );
}
