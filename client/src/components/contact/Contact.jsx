import { Box, styled, Typography, Link } from "@mui/material";
import { GitHub, LinkedIn, Instagram, Email } from "@mui/icons-material";
// import styled from "styled-components";
const Banner = styled(Box)`
  background-image: url(http://mrtaba.ir/image/bg2.jpg);
  width: 100%;
  height: 50vh;
  background-position: left 0px top -100px;
  background-size: cover;
`;

const Wrapper = styled(Box)`
  padding: 20px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
  margin-bottom: 40px;
`;
const StyledFooter = styled(Typography)`
  color: #878787;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  line-height: 1.2; /* Add spacing between lines */
`;

const Text = styled(Typography)`
  color: #878787;
`;

const Contact = () => {
  return (
    <Box>
      <Banner />
      <Wrapper>
        <Typography variant="h3">Getting in touch is easy!</Typography>
        <Text variant="h5">
          I'm Akhilesh Kumar Mishra, currently in the final year of BTech in
          Computer Science & Engineering from NIT Jamshedpur. I have a keen
          interest in web development and problem-solving, and I love combining
          both of these passions. In addition, I hold the position of Team
          Secretary of the Web Team at our college, where I am along with the
          team responsible for maintaining and updating our official website,{" "}
          <Link
            href="https://www.nitjsr.ac.in/Clubs/Webteam"
            color="inherit"
            target="_blank"
          >
            nitjsr.ac.in.
          </Link>
        </Text>
        <StyledFooter variant="h5">
          Reach out to me on
          {"\n"}
          <Link
            href="https://www.github.com/iamakhileshmishra"
            color="inherit"
            target="_blank"
          >
            <GitHub />
          </Link>
          <Link
            href="mailto:contactakhileshmishra@gmail.com?Subject=Hey! I wana connect with you regarding your DSA Clipper Project"
            target="_blank"
            color="inherit"
          >
            <Email />
          </Link>
          <Link
            href="https://www.linkedin.com/in/iamakhileshmishra"
            color="inherit"
            target="_blank"
          >
            <LinkedIn />
          </Link>
          <Link
            href="https://www.instagram.com/iamakhileshmishra/"
            color="inherit"
            target="_blank"
          >
            <Instagram />
          </Link>
        </StyledFooter>
      </Wrapper>
    </Box>
  );
};

export default Contact;
