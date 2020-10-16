import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import InputBox from "components/Chat/ChatBody/InputBox";
import GroupDisplay from "components/Chat/GroupDisplay";
import MembersDisplay from "components/Chat/MembersDisplay";
import Message from "components/Chat/Message";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      flexDirection: "column",
      display: "flex",
      height: "100%",
    },
    header: {
      borderRadius: "inherit",
      flexBasis: "5rem",
      minHeight: "5rem",
      width: "100%",
      padding: "0 3rem",
      borderBottom: `1px solid ${theme.palette.border}`,
      background: theme.palette.common.grey,
    },
    heading: {
      fontWeight: "bold",
    },
    messages: {
      overflow: "scroll",
      flexGrow: "1",
    },
    footer: {
      padding: "0rem 2rem",
    },
  };
});

export default function ChatBody({
  group,
  classes: parentClasses,
  messages,
  members,
  rightDocOpen,
  typing,
  messageContainer,
  smallScreen,
  setStep,
}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box className={parentClasses.content}>
      <Box className={classes.container}>
        <Box
          className={classes.header}
          bgcolor={grey["200"]}
          display="flex"
          alignItems="center"
        >
          {smallScreen && (
            <IconButton
              onClick={() => {
                setStep(0);
              }}
            ></IconButton>
          )}

          <GroupDisplay
            group={group}
            fontSize="large"
            caption={false}
            rightDocOpen={rightDocOpen}
            setStep={setStep}
          />
          <Box flexGrow={1}></Box>
          <Box
            display="flex"
            onClick={handleOpen}
            style={{ cursor: "pointer" }}
          >
            {!smallScreen && Object.keys(members).length > 0 && (
              <PeopleAltOutlinedIcon fontSize="large" color="primary" />
            )}
          </Box>
        </Box>
        <Box p="0 3rem" className={classes.messages} ref={messageContainer}>
          {messages.map((message) => {
            return (
              <Message
                message={message}
                domId={message._id}
                key={message._id}
              />
            );
          })}
          <Box display="flex" justifyContent="flex-end" p="0.4rem 0">
            {typing.value && typing.groupId === group._id && (
              <Typography variant="caption">{`${typing.username} is typing...`}</Typography>
            )}
          </Box>
          {/* <ScrollTo /> */}
        </Box>
        <Box className={classes.footer}>
          <InputBox groupId={group._id} />
        </Box>
      </Box>
      <MembersDisplay members={members} open={open} handleClose={handleClose} />
    </Box>
  );
}
