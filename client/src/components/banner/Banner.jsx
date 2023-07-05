
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
  width: 100%;
  background: url(https://images.unsplash.com/photo-1616004667892-d348f7349d39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFyayUyMGNvZGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60)
    center/55% repeat-x #000;
  height: 50vh;
  display: flex;
  background-repeat: repeat-y;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled(Typography)`
  font-family: "Yellowtail", cursive;
  font-size: 70px;
  color: #ffffff;
  line-height: 1;
`;



const Banner = () => {
    
    return (
        <Image>
            <Heading>DSA Clipper</Heading>
        </Image>
    )
}

export default Banner;