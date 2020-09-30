import React, { useState, useContext } from "react";
import { containerContext } from "components/Chat/ChatContainer";
import { Typography, Box, useTheme, Chip } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

const slots = [
  "9:30am",
  "10:30am",
  "11:00am",
  "12:30pm",
  "3:30pm",
  "6:00pm",
  "7:00pm",
];

const renderSlots = (slots) => {
  return slots.map((slot) => {
    return (
      <Box p="0.5rem">
        <Chip label={slot} />
      </Box>
    );
  });
};

export default function Schedule() {
  const [expand, setExpand] = React.useState(false);
  const [selectedDate, handleDateChange] = useState();

  const { setShowVC } = useContext(containerContext);
  return (
    <Box textAlign="start" p="0 0 0 1rem">
      <Typography
        style={{ color: "#949DB1", cursor: "pointer" }}
        variant="subtitle1"
        onClick={() => {
          // setExpand((prevState) => !prevState);
          setShowVC((prevState) => !prevState);
        }}
      >
        Schedule a call
      </Typography>

      {expand && (
        <Box p="1rem 0">
          <DatePicker
            InputProps={{
              disableUnderline: true,
            }}
            value={selectedDate}
            onChange={handleDateChange}
          />
          <Box height="1rem"></Box>
          <Box display="flex" flexWrap="wrap">
            {renderSlots(slots)}
          </Box>
        </Box>
      )}
    </Box>
  );
}
