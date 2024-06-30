import {
  InputAdornment,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useCallback, useRef, useState } from "react";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Message, postBody } from "../interfaces/types";
import axios from "axios";

const ChatField = () => {
  const [input, setInput] = useState<string>("");

  const [messages, setMessages] = useState<Message[]>([]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  async function callApi(): Promise<Message> {
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const postBody: postBody = {
        message: input,
      };
      const response = await axios.post(apiUrl, postBody);

      const data: any = await response.data;

      console.log(data);

      // Map the partial data to Post objects
      const answer: Message = {
        id: messages.length + 2,
        sender: "bot",
        content: data.answer,
      };

      return answer;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClick();
      event.preventDefault();
    }
  };

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);
  }, []);

  async function onClick() {
    if (!input.trim().length) {
      return;
    }
    try {
      const answer = await callApi();
      setInput("");
      console.log(input);
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "user",
        content: input,
      };

      setMessages([...messages, newMessage, answer]);
      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Box
        sx={{
          // p: 2,
          mb: 4,
          mt: 2,
          height: "70vh",
          overflowY: "auto",
          width: "90vw",
          // border: "1px solid #ddd",
          // borderRadius: "4px",
          // backgroundColor: "#f9f9f9",
        }}
      >
        <List>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                display: "flex",
                justifyContent:
                  message.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                sx={{
                  p: 1,
                  maxWidth: "75%",
                  backgroundColor:
                    message.sender === "user" ? "#d1e7dd" : "#f8d7da",
                }}
              >
                <Typography variant="body1">{message.content}</Typography>
              </Paper>
            </ListItem>
          ))}
        </List>
        <div ref={scrollRef} /> {/* Reference for scrolling */}
      </Box>
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
          onKeyDown={handleKeyPress}
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
    </>
  );
};

export default ChatField;
