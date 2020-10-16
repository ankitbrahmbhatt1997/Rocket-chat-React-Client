import { Box, Divider, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Search from "components/Chat/Search";
import React from "react";
import FilesModal from "components/Chat/ChatDoc/FilesModal";
import Files from "components/Chat/ChatDoc/Files";

export default function ChatDoc({
  classes,
  setStep,
  smallScreen,
  handleFileModalOpen,
  fileModalOpen,
  handleFileModalClose,
}) {
  return (
    <Box className={classes.rightDoc}>
      <Box m="0 0 0 0" textAlign="center">
        {/* //TODO group creating and other options in place of this box */}
        <Box height="5rem"></Box>
        <Divider />

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

        <Search setStep={setStep} smallScreen={smallScreen} />
        <Divider />
        <Box height="4rem"></Box>
        <Files
          handleOpen={handleFileModalOpen}
          // filterAudioFiles={filterAudioFiles}
        />

        <FilesModal open={fileModalOpen} handleClose={handleFileModalClose} />
      </Box>
    </Box>
  );
}
