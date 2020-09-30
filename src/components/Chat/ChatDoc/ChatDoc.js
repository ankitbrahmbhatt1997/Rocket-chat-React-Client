import React from "react";
import { Box, Typography, Divider, IconButton } from "@material-ui/core";
import ActiveUsers from "components/Chat/ActiveUsers";
import Scheduler from "components/Chat/Scheduler";
import Search from "components/Chat/Search";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function ChatDoc({ classes, setStep, smallScreen }) {
  return (
    <Box p="0 0.5rem" className={classes.rightDoc}>
      <Box m="4rem 0 0 0" textAlign="center">
        <Box display="flex" justifyContent="flex-start">
          {" "}
          {smallScreen && (
            <IconButton
              onClick={() => {
                setStep(1);
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          )}
        </Box>
        <ActiveUsers />
        <Box height="0.6rem"></Box>
        <Typography variant="caption">Active Users</Typography>
        <Box height="2rem"></Box>
        <Divider />

        <Search setStep={setStep} smallScreen={smallScreen} />
        <Divider />
        <Box height="1rem"></Box>
        <Scheduler />
        <Box height="1rem"></Box>
        <Divider />
        <Box height="1rem"></Box>

        <Box p="0 0 0 1rem" display="flex">
          <Box width="0.4rem"></Box>

          <Box justifySelf="flex-end">
            <VisibilityIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
