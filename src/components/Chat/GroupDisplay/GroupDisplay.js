import React from "react";
import { Box, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

export default function GroupDisplay({
  group: { name, lastMessage: { msg = "Hi there..." } = {} },
}) {
  return (
    <Box display="flex">
      <Avatar>{name[0]}</Avatar>
      <Box width="1rem"></Box>
      <div>
        <Typography variant="subtitle2">{name}</Typography>
        <Typography variant="caption">{msg}</Typography>
      </div>
    </Box>
  );
}
