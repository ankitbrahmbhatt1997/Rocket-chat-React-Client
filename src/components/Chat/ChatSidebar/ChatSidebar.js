import React, { useContext } from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import { Box } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import GroupDisplay from "components/Chat/GroupDisplay";
import classNames from "classnames";

import ListItemText from "@material-ui/core/ListItemText";

const renderGroups = (groups, classes, selected, setSelected, setStep) => {
  return groups.map((group, index) => {
    const listClasses = classNames({
      [classes.item]: true,
      [classes.selected]: selected === index,
    });
    return (
      <React.Fragment>
        <ListItem
          button
          key={group.name}
          index={index}
          className={listClasses}
          onClick={(e) => {
            setSelected(index);
            setStep(1);
          }}
        >
          <GroupDisplay group={group} caption={true} />
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  });
};

export default function ChatSidebar({
  classes,
  selected,
  setSelected,
  setStep,
}) {
  const groups = useSelector((state) => state.groups.groups);
  const theme = useTheme();
  return (
    <Box>
      <Box className={classes.drawer}>
        <div className={classes.toolbar} />
        <List style={{ padding: "0" }}>
          <ListItem
            style={{
              height: "5rem",
              borderBottom: `0.1rem solid ${theme.palette.border}`,
            }}
          >
            <Typography variant="h5">Chat</Typography>
          </ListItem>
          {renderGroups(groups, classes, selected, setSelected, setStep)}
          {/* <Divider style={{ background: "#fff" }} /> */}
        </List>
      </Box>
    </Box>
  );
}
