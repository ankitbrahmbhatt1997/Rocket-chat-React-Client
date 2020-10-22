import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import { filterAudioFiles } from "components/Chat/ChatDoc/ChatDoc.utils";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getFiles } from "slices/groupSlice";
// import { downloadDoc } from "utils/apituils";
import useDeepCompareEffect from "use-deep-compare-effect";

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

const useStyles = makeStyles((theme) => ({
  fileCard: {
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    cursor: "pointer",
  },
  filesContainer: {
    "&:last-child": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    },
  },
  greyColor: {
    color: theme.palette.common.grey1,
  },
}));

export default function Files({ handleOpen }) {
  const { activeGroup, files: allFiles } = useSelector(
    (state) => state.groups,
    shallowEqual
  );
  let files = filterAudioFiles(allFiles);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const classes = useStyles();

  const messagesWithFiles = messages.filter((message) => message.file);

  //TODO identify whether deep compare is even necessary .... also learn about difference with normal useffect
  useDeepCompareEffect(() => {
    activeGroup && dispatch(getFiles(activeGroup));
  }, [activeGroup, messagesWithFiles]);

  return (
    <Box>
      <Box display="flex" className={classes.greyColor} p="0 0 0 1rem">
        <PermMediaIcon />
        <Box width="0.4rem"></Box>
        <Typography variant="subtitle1">Group Media</Typography>
      </Box>
      <Box height="1rem"></Box>
      <Box className={classes.filesContainer}>
        {files.length > 0 &&
          files.map((file, index) => {
            return (
              <React.Fragment>
                {index < 4 && (
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
                )}
              </React.Fragment>
            );
          })}
      </Box>
      <Box height="0.5rem"></Box>
      {files.length > 4 && (
        <Box display="flex" justifyContent="center">
          <Button color="primary" onClick={handleOpen}>
            View More
          </Button>
        </Box>
      )}
    </Box>
  );
}
