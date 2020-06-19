import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Fallback() {
  return (
    <Box height="80vh" textAlign="center">
      <Box height="20vh"></Box>

      <Typography variant="h1" color="primary">
        OOPS!
      </Typography>
      <Box heigh="2rem"></Box>
      <Typography variant="h4" color="primary">
        Something went wrong
      </Typography>
      <Box height="1rem"></Box>
      <Link to="/" style={{ textDecoration: "None" }}>
        <Button variant="outlined" color="primary">
          Go To Login
        </Button>
      </Link>
    </Box>
  );
}
