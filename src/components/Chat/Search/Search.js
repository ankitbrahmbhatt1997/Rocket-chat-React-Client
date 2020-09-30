import React, { useContext, Fragment } from "react";
import { useDebouncedValue } from "hooks";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withStyles, Typography, Box } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import axios from "config/axios";
import { useSelector, useDispatch } from "react-redux";
import { setAnchorMessage } from "slices/chatSlice";
import { scrollToMessage } from "utils/chatUtils";
import { containerContext } from "components/Chat/ChatContainer";

const CssTextField = withStyles({
  root: {
    "& MuiSvgIcon-root": {
      color: "red",
    },
    "& label.Mui-focused": {
      color: "transparent",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "transparent",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
    },
  },
})(TextField);

const Search = ({ setStep, smallScreen }) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [input, setInput] = React.useState("");
  const loading = open && options.length === 0;
  const debouncedInput = useDebouncedValue(input, 500);
  const activeGroup = useSelector((state) => state.groups.activeGroup);
  const { messageContainer } = useContext(containerContext);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const input = event.target.value;
    // console.log(event.target.value);
    setInput(input);
    setOptions([]);
  };

  const getOptionSelected = (option, value) => {
    return option._id == value._id;
  };

  const removeAnchorMessage = () => {
    dispatch(setAnchorMessage(null));
  };

  const onChange = (event, value) => {
    setStep(1);

    if (value) {
      !smallScreen
        ? scrollToMessage(messageContainer, value._id, removeAnchorMessage)
        : dispatch(setAnchorMessage(value._id));

      // dispatch(setAnchorMessage(value._id));
    }
  };

  React.useEffect(() => {
    let active = true;
    // console.log(loading);
    if (!loading) {
      return undefined;
    }

    (async () => {
      let response = await axios({
        method: "get",
        url: "/api/v1/chat.search",
        params: {
          roomId: activeGroup,
          searchText: input,
          count: 5,
        },
      });
      let {
        data: { messages },
      } = response;
      console.log(response);
      if (active) {
        setOptions(messages);
      }
    })();

    return () => {
      active = false;
    };
  }, [debouncedInput]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  return (
    <Autocomplete
      id="message-search"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onChange={onChange}
      onInputChange={handleChange}
      onClose={() => {
        setOpen(false);
      }}
      filterOptions={(x) => x}
      includeInputInList
      getOptionSelected={getOptionSelected}
      getOptionLabel={(option) => {
        return (
          <Fragment>
            {option.msg}
            <Box display="inline-block" width="1rem"></Box>
            <Typography variant="caption">by {option.u.username}</Typography>
          </Fragment>
        );
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <CssTextField
          {...params}
          placeholder="Search in Conversation"
          fullWidth
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {/* {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null} */}
                <SearchOutlinedIcon style={{ color: "#707C97" }} />
                {/* {params.InputProps.endAdornment} */}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default Search;
