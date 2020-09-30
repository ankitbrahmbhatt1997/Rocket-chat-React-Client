import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { withStyles, Badge } from "@material-ui/core";
import {
  red,
  green,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
} from "@material-ui/core/colors";

const colors = {
  A: red[500],
  B: green[500],
  C: red[200],
  D: pink[500],
  E: purple[500],
  F: deepPurple[500],
  G: indigo[500],
  H: blue[500],
  I: lightBlue[500],
  J: cyan[500],
  K: teal[500],
  L: green[500],
  M: lightGreen[500],
  N: lime[700],
  O: yellow[500],
  P: amber[500],
  Q: orange[500],
  R: deepOrange[500],
  S: deepPurple[800],

  T: amber[800],
  U: lime[800],

  V: orange[800],

  W: purple[700],
  X: yellow[700],
  Y: lightGreen[800],
  Z: red[800],
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export default function CustomizedAvatar({ value, large, withBadge }) {
  return withBadge ? (
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
    >
      <Avatar
        style={
          large
            ? {
                background: colors[value.toUpperCase()],
                height: "4rem",
                width: "4rem",
              }
            : { background: colors[value.toUpperCase()] }
        }
      >
        {value.toUpperCase()}
      </Avatar>
    </StyledBadge>
  ) : (
    <Avatar
      style={
        large
          ? {
              background: colors[value.toUpperCase()],
              height: "4rem",
              width: "4rem",
            }
          : { background: colors[value.toUpperCase()] }
      }
    >
      {value.toUpperCase()}
    </Avatar>
  );
}
