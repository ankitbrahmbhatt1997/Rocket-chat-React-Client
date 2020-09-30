import React, { useContext } from "react";
import { Box, Typography } from "@material-ui/core";
import Avatar from "components/Chat/Avatar";

export default function GroupDisplay({
  group: { name, lastMessage: { msg = "Hi there..." } = {} },
  fontSize,
  caption,
  rightDocOpen,
  setStep,
}) {
  const onClick = () => {
    setStep && setStep(2);
  };

  return (
    <Box display="flex" onClick={onClick} style={{ cursor: "pointer" }}>
      <Avatar value={name[0].toUpperCase()} />
      <Box width="1rem"></Box>
      <div>
        <Typography
          variant="subtitle2"
          style={fontSize === "large" ? { fontSize: "1.3rem" } : null}
        >
          {name}
        </Typography>
        {caption && <Typography variant="caption">{msg}</Typography>}
      </div>
    </Box>
  );
}
