import { InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

const ChatField = () => {
  const [input, setInput] = useState<string>("");

  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onClick = () => {
    setInput("");
    console.log(input);
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      //   alignItems="center"
      //   minHeight="100vh" // Full viewport height
    >
      <TextField
        id="outlined-basic"
        label="Message Chatbot"
        variant="outlined"
        value={input} // Bind the state to the input field
        onChange={updateInput} // Update state on input change
        sx={{ borderRadius: 4, width: "90%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="start"
              onClick={onClick}
              style={{ cursor: "pointer" }}
            >
              <ArrowCircleRightOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default ChatField;
