import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CustomizedAvatar from "components/Chat/Avatar";
import React from "react";

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.primary.main,
  },
  paper: {
    margin: "3rem auto",
    height: "80%",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
    outline: "none",
    borderRadius: "0.4rem",
    overflowY: "scroll",
  },
  memberCard: {
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
  },
  membersContainer: {
    "&:last-child": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    },
    "&:first-child": {
      borderTop: "none",
    },
  },
  greyColor: {
    color: theme.palette.common.grey1,
  },
}));

export default function SimpleModal({ open, handleClose, members }) {
  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <Typography variant="h5" className={classes.heading}>
        Group Members
      </Typography>
      <Box height="0.5rem"></Box>
      <Box className={classes.membersContainer}>
        {Object.keys(members).map((memberId, index) => {
          const member = members[memberId];
          const isOnline = member.status === "online";
          return (
            <Box
              key={memberId}
              p="1rem 0 1rem 1rem"
              className={classes.memberCard}
              textAlign="start"
              alignItems="center"
              display="flex"
            >
              <CustomizedAvatar
                value={member.username[0].toUpperCase()}
                withBadge={isOnline}
              />
              <Box width="0.6rem"></Box>
              <Box display="flex" flexDirection="column">
                <Typography variant="subtitle1">
                  {truncate(member.name, 30)}
                </Typography>
                <Typography variant="caption">{member.status}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
