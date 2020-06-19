import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import grey from "@material-ui/core/colors/grey";
import { authContext } from "contexts";

const MessageTemplate = ({ content }) => {
  return (
    <Box display="flex" justifyContent="flex-end" m="2rem 0">
      <Box
        bgcolor="primary.main"
        color="#fff"
        style={{ borderRadius: "1rem 1rem 0 1rem" }}
        p="0.7rem"
      >
        <Typography variant="subtitle1">{content}</Typography>
      </Box>
    </Box>
  );
};

export default function Message({
  message: {
    msg: content,
    u: { username: from },
  },
}) {
  let {
    user: { username },
  } = React.useContext(authContext);
  return (
    <React.Fragment>
      {username === from ? (
        <MessageTemplate content={content} />
      ) : (
        <Box display="flex" alignItems="flex-start" m="2rem 0">
          <Avatar>{from[0]}</Avatar>
          <Box width="1rem"></Box>
          <Box
            p="0.7rem"
            bgcolor={grey[200]}
            style={{ borderRadius: "1rem 1rem 1rem 0" }}
          >
            <Typography variant="subtitle1">{content}</Typography>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
}
