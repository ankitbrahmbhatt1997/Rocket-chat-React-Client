import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import { downloadDoc } from "utils/apiUtils";
import Avatar from "components/Chat/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "10px 10px 0 10px",
    background: theme.palette.primary.mainGradient,
    border: "1px solid rgba(112, 124, 151, 0.25)",
    boxShadow:
      "15px 15px 35px rgba(112, 124, 151, 0.05), 10px 10px 25px rgba(112, 124, 151, 0.05)",
    cursor: "pointer",
  },
  iconContainer: {
    background: "rgba(255,255,255,0.25)",
    borderRadius: "6px",
  },
}));

export default function DocTemplate({
  file: { title, title_link },
  position,
  from,
  domId,
}) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent={position ? position : "flex-end"}
      m="2rem 0"
      id={domId}
    >
      {from && (
        <React.Fragment>
          <Avatar value={from[0].toUpperCase()} />
          <Box width="1rem"></Box>
        </React.Fragment>
      )}

      <Box
        display="flex"
        color="#fff"
        className={classes.root}
        p="2rem 1rem"
        onClick={() => {
          downloadDoc(title_link);
        }}
      >
        <Box p="0.25rem 0.3rem" className={classes.iconContainer}>
          <InsertDriveFileOutlinedIcon style={{ fontSize: "1.5rem" }} />
        </Box>
        <Box width="1rem"></Box>
        <Typography variant="subtitle1" style={{ color: "#fff" }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
