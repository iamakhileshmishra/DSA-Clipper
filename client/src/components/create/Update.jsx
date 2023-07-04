import React, { useState, useEffect } from "react";
import { Box, styled, InputBase, Button } from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const StyledFormControl = styled(Box)`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const StyledReactQuill = styled(ReactQuill)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  .ql-editor {
    min-height: 200px;
  }
  .ql-toolbar {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "codeforinterview",
  categories: "Tech",
  createdDate: new Date(),
};

const Update = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();

  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
        setDescription(response.data.description);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        if (response.isSuccess) {
          post.picture = response.data;
          setImageURL(response.data);
        }
      }
    };
    getImage();
  }, [file]);

  const updateBlogPost = async () => {
    await API.updatePost(post);
    navigate(`/details/${id}`);
  };

  const handleChange = (value) => {
    setDescription(value);
    setPost({ ...post, description: value });
  };

  return (
    <Container>
      <Image src={post.picture || url} alt="post" />

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
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          value={post.title}
          name="title"
          placeholder="Title"
        />
        <Button
          onClick={() => updateBlogPost()}
          variant="contained"
          color="primary"
        >
          Update
        </Button>
      </StyledFormControl>

      <StyledReactQuill
        value={description}
        onChange={handleChange}
        placeholder="Tell your story..."
      />
    </Container>
  );
};

export default Update;
