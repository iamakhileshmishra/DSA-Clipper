import React, { useState, useEffect, useContext } from "react";
import { styled, Box, Button, InputBase, FormControl } from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import MonacoEditor from "react-monaco-editor"; // Import MonacoEditor
import "react-quill/dist/quill.snow.css";

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const initialPost = {
  title: "",
  description: "",
  code:"",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);

  const url =
    post.picture ||
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const savePost = async () => {
    await API.createPost(post);
    navigate("/");
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Image src={url} alt="post" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          onChange={(e) => handleChange(e)}
          name="title"
          placeholder="Title"
        />
      </StyledFormControl>

      <ReactQuill
        placeholder="Express your unique Approach..."
        value={post.description}
        height="300"
        onChange={(value) => setPost({ ...post, description: value })}
      />
      <br />
      <>Write your Code here </>
      <br />
      <br />
      <MonacoEditor
        placeholder="//Write your code here"
        height="300" // Set the desired height
        language="cpp" // Set the language (e.g., "javascript", "typescript")
        theme="vs-dark" // Set the theme ("vs-light" or "vs-dark")
        value={post.code} // Set the initial value
        onChange={(value) => setPost({ ...post, code: value })} // Handle value changes
      />
      <br />
      <Button onClick={() => savePost()} variant="contained" color="primary">
        Publish
      </Button>
    </Container>
  );
};

export default CreatePost;
