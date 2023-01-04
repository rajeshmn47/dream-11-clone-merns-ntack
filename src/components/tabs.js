import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { Grid } from "@mui/material";
import Slider from "@mui/material/Slider";

const ContestsContainer = styled(Grid)``;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 10px 0;
`;
const Contest = styled.div`
  padding: 20px 20px;
  border-radius: 5px;
  .MuiSlider-thumb {
    display: none !important;
  }
  .MuiSlider-track {
    border: none;
    background-color: #ec1801;
    border-radius: inherit;
  }
  .MuiSlider-root {
    color: #f25640;
  }
`;

const First = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 19px;
    text-transform: capitalize;
  }
  del {
    margin-right: 10px;
  }
`;

const FreeButton = styled.button`
  background-color: #008a36;
  text-transform: uppercase;
  color: #ffffff;
  padding: 10px 30px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const SliderContainer = styled.div``;
const SpotsLeft = styled.div``;

const SpotsRight = styled.div``;

const Last = styled.div`
  background-color: #f6f6f6;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  color: #888;
`;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ tabs }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Contests" {...a11yProps(0)} />
          <Tab label="My Contests(0)" {...a11yProps(1)} />
          <Tab label="My Teams(0)" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ContestsContainer container item sm={12} xs={12}>
          <ContestContainer>
            <Contest>
              <First>
                <p>Prize Pool</p>
                <p>Entry</p>
              </First>
              <First>
                <h1>2.50 lacks</h1>
                <First>
                  <del>₹ 19</del>
                  <FreeButton>Free</FreeButton>
                </First>
              </First>
              <SliderContainer>
                <Slider />
              </SliderContainer>
              <First>
                <SpotsLeft>2 spots left</SpotsLeft>
                <SpotsRight>3 spots</SpotsRight>
              </First>
            </Contest>
            <Last>
              ₹66
              <EmojiEventsOutlinedIcon
                style={{ margin: "0 15px", marginBottom: "3px" }}
              />
              25% Single
            </Last>
          </ContestContainer>
          <ContestContainer>
            <Contest>
              <First>
                <p>Prize Pool</p>
                <p>Entry</p>
              </First>
              <First>
                <h1>2.50 lacks</h1>
                <First>
                  <del>₹ 19</del>
                  <FreeButton>Free</FreeButton>
                </First>
              </First>
              <SliderContainer>
                <Slider />
              </SliderContainer>
              <First>
                <SpotsLeft>2 spots left</SpotsLeft>
                <SpotsRight>3 spots</SpotsRight>
              </First>
            </Contest>
            <Last>
              ₹66
              <EmojiEventsOutlinedIcon
                style={{ margin: "0 15px", marginBottom: "3px" }}
              />
              25% Single
            </Last>
          </ContestContainer>
          <ContestContainer>
            <Contest>
              <First>
                <p>Prize Pool</p>
                <p>Entry</p>
              </First>
              <First>
                <h1>2.50 lacks</h1>
                <First>
                  <del>₹ 19</del>
                  <FreeButton>Free</FreeButton>
                </First>
              </First>
              <SliderContainer>
                <Slider />
              </SliderContainer>
              <First>
                <SpotsLeft>2 spots left</SpotsLeft>
                <SpotsRight>3 spots</SpotsRight>
              </First>
            </Contest>
            <Last>
              ₹66
              <EmojiEventsOutlinedIcon
                style={{ margin: "0 15px", marginBottom: "3px" }}
              />
              25% Single
            </Last>
          </ContestContainer>
        </ContestsContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}