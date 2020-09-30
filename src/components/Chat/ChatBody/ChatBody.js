import React, { useContext, Fragment } from "react";
import {
  makeStyles,
  Box,
  Typography,
  Input,
  IconButton,
} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import Message from "components/Chat/Message";
import InputBox from "components/Chat/InputBox";
import ScrollTo from "components/Chat/ScrollTo";
import GroupDisplay from "components/Chat/GroupDisplay";
import CustomizedAvatar from "components/Chat/Avatar";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import VC from "components/Chat/Vc";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",

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
          <Box display="flex">
            {!smallScreen &&
              Object.keys(members).length > 0 &&
              Object.keys(members).map((member) => {
                return (
                  <Fragment>
                    <CustomizedAvatar
                      value={members[member]["username"][0].toUpperCase()}
                      key={member}
                    />
                    <Box width="0.2rem"></Box>
                  </Fragment>
                );
              })}
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
    </Box>
  );
}
