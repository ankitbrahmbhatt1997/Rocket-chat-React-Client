import React, { useContext } from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { groupContext } from "contexts";
import GroupDisplay from "components/Chat/GroupDisplay";
import classNames from "classnames";

import ListItemText from "@material-ui/core/ListItemText";

const renderGroups = (groups, classes, selected, setSelected) => {
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
          }}
        >
          <GroupDisplay group={group} />
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  });
};

export default function ChatSidebar({ classes, selected, setSelected }) {
  const { groups } = useContext(groupContext);

  //   const classes = useStyles();
  return (
    <Box>
      <Box className={classes.drawer}>
        <div className={classes.toolbar} />
        <List style={{ padding: "0" }}>
          <ListItem
            style={{
              boxShadow: "0 3px 6px -6px black",
              height: "5rem",
            }}
          >
            <Typography style={{ color: "#fff" }} variant="h4">
              Webnyay talk
            </Typography>
          </ListItem>
          {renderGroups(groups, classes, selected, setSelected)}
          {/* <Divider style={{ background: "#fff" }} /> */}
        </List>
      </Box>
    </Box>
  );
}
