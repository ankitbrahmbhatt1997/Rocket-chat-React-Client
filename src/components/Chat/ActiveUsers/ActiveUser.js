import React, { useContext, Fragment } from "react";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import Avatar from "components/Chat/Avatar";
// import {members} from "slices/groupSlice"

export default function ActiveUser() {
  // const { members } = useContext(groupContext);
  const members = useSelector((state) => state.groups.members);
  return (
    <Box display="flex" justifyContent="center">
      {Object.keys(members).map((member) => {
        return members[member].status === "online" ? (
          <Fragment>
            <Box>
              <Avatar
                value={members[member].username[0]}
                large={true}
                withBadge={true}
              />
            </Box>
            <Box width="0.2rem"></Box>
          </Fragment>
        ) : null;
      })}
    </Box>
  );
}
