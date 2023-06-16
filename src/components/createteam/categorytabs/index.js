import styled from "@emotion/styled";
import {
  CheckBoxOutlineBlankTwoTone,
  SettingsSystemDaydream,
} from "@mui/icons-material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { URL } from "../../../constants/userConstants";
import { playedlm } from "../../../utils/createteams";
import {
  checkar,
  checkwk,
  getImgurl,
  isUnAnnounced,
} from "../../../utils/img_url";

const ContestsContainer = styled(Grid)``;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 10px 0;
`;
const Contest = styled.div`
  .MuiTabs-indicator {
    background-color: #ec1801 !important;
    padding: 1px 0;
  }
  .Mui-selected {
    color: #000000 !important;
    text-transform: capitalize;
    font-weight: 600;
  }
  .MuiTab-root {
    text-transform: capitalize;
    font-family: "Open Sans";
  }
  .MuiTabs-flexContainer {
    justify-content: space-between !important;
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

const CreateTeam = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #000000;
  color: #ffffff;
  width: 200px;
  margin: 0 auto;
  height: 35px;
  border-radius: 5px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;
`;

const PlayersList = styled.div`
  padding: 0 0;
`;

const EachPlayer = styled.div`
  img {
    width: 50px !important;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 18px;
    font-family: "Open Sans";
    font-weight: bold;
    text-transform: capitalize;
  }
  border-bottom: 1px solid #e7e7e7;
  border-left: none;
  border-right: none;
  padding: 0px 0;
`;

const AddButton = styled.button`
  color: green;
  background-color: #fff;
  border: none;
  outline: none;
  margin-right: 15px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  color: #df5f1f;
  background-color: #fef4de;
  border: none;
  outline: none;
  margin-right: 15px;
  cursor: pointer;
`;

const NoLineups = styled.h3`
  color: #ec1801;
  padding: 0 10px;
  text-align: center;
  height: 100px;
  margin-top: 15px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin-top: 5px;
    font-size: 10px;
    color: #060667;
  }
  align-items: flex-start;
  justify-content: center;
  width: 150px;
  h1 {
    font-size: 14px !important;
    line-height: 1;
  }
`;

const BlueDot = styled.span`
  background-color: #060667 !important;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-right: 5px;
  display: inline-block;
`;

const Points = styled.h5`
  font-size: 14px;
  font-weight: 600;
`;

const ImgContainer = styled.div`
  padding-top: 10px;
  img {
    display: block;
  }
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

export default function CategoryTabs({
  id,
  players,
  match,
  setPlayers,
  lmPlayers,
}) {
  const [value, setValue] = React.useState(0);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [team, setTeam] = React.useState(null);
  const [contest, setContest] = React.useState([]);
  const [modal, setModal] = React.useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function getplayers() {
      if (user?._id) {
        const data = await axios.get(
          `${URL}/getteam/?matchId=${id}&userid=${user._id}`
        );
        setTeam(data.data.team);
        const contestdata = await axios.get(
          `${URL}/getcontestsofuser/${id}?userid=${user._id}`
        );
        setContest(contestdata.data.contests);
      }
    }
    getplayers();
  }, [user]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = (i) => {
    setModal(i);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (i) => {
    const po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = true;
      }
      return p;
    });
    setPlayers([...po]);
  };

  const handleRemove = (i) => {
    const po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = false;
      }
      return p;
    });
    setPlayers([...po]);
  };

  return (
    <Contest>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={`WK(${
                players.filter((p) => checkwk(p.position) && p.isSelected)
                  .length
              })`}
              {...a11yProps(0)}
            />
            <Tab
              label={`BAT(${
                players.filter((p) => p.position === "batsman" && p.isSelected)
                  .length
              })`}
              {...a11yProps(1)}
            />
            <Tab
              label={`AR(${
                players.filter((p) => checkar(p.position) && p.isSelected)
                  .length
              })`}
              {...a11yProps(2)}
            />
            <Tab
              label={`BOW(${
                players.filter((p) => p.position === "bowler" && p.isSelected)
                  .length
              })`}
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <PlayersList>
            <>
              {players.length > 0 ? (
                players
                  .filter((p, index) => checkwk(p.position))
                  .map((p) => (
                    <EachPlayer
                      className={p.isSelected ? "selected" : "notselected"}
                    >
                      <ImgContainer>
                        <img src={getImgurl(p.image, p.playerName)} alt="" />
                      </ImgContainer>
                      <Center>
                        <h1>a{p.playerName}</h1>
                        {playedlm(lmPlayers, p) ? (
                          <p>
                            {" "}
                            <BlueDot />
                            played last matche
                          </p>
                        ) : null}
                      </Center>
                      <Points>9.0</Points>
                      {p.isSelected ? (
                        <RemoveButton onClick={() => handleRemove(p._id)}>
                          <RemoveCircleOutlineRoundedIcon />
                        </RemoveButton>
                      ) : (
                        <AddButton
                          onClick={() => handleClick(p._id)}
                          disabled={
                            players.filter((k) => k.isSelected === true)
                              .length >= 11
                          }
                          className={
                            players.filter((k) => k.isSelected === true)
                              .length >= 11
                              ? "disabled"
                              : "notdisabled"
                          }
                        >
                          <AddCircleOutlineRoundedIcon />
                        </AddButton>
                      )}
                    </EachPlayer>
                  ))
              ) : (
                <NoLineups>
                  Lineups not out yet,check 30 minutes before the game
                </NoLineups>
              )}
            </>
          </PlayersList>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PlayersList>
            <>
              {players.length > 0 ? (
                players
                  .filter(
                    (p, index) =>
                      p.position === "batsman" || p.position == "batsmen"
                  )
                  .map((p) => (
                    <EachPlayer
                      className={p.isSelected ? "selected" : "notselected"}
                    >
                      <ImgContainer>
                        <img src={getImgurl(p.image, p.playerName)} alt="" />
                      </ImgContainer>
                      <Center>
                        <h1>{p.playerName}</h1>
                        {playedlm(lmPlayers, p) ? (
                          <p>
                            {" "}
                            <BlueDot />
                            played last match
                          </p>
                        ) : null}
                      </Center>
                      <Points>9.0</Points>
                      {p.isSelected ? (
                        <RemoveButton onClick={() => handleRemove(p._id)}>
                          <RemoveCircleOutlineRoundedIcon />
                        </RemoveButton>
                      ) : (
                        <AddButton
                          onClick={() => handleClick(p._id)}
                          disabled={
                            players.filter((k) => k.isSelected === true)
                              .length >= 11
                          }
                          className={
                            players.filter((k) => k.isSelected === true)
                              .length >= 11
                              ? "disabled"
                              : "notdisabled"
                          }
                        >
                          <AddCircleOutlineRoundedIcon />
                        </AddButton>
                      )}
                    </EachPlayer>
                  ))
              ) : (
                <NoLineups>
                  Lineups not out yet,check 30 minutes before the game
                </NoLineups>
              )}
            </>
          </PlayersList>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PlayersList>
            <>
              {players.length > 0 ? (
                players
                  .filter((p) => checkar(p.position))
                  .map((p) => (
                    <EachPlayer
                      className={p.isSelected ? "selected" : "notselected"}
                    >
                      <ImgContainer>
                        <img src={getImgurl(p.image, p.playerName)} alt="" />
                      </ImgContainer>
                      <Center>
                        <h1>{p.playerName}</h1>
                        {playedlm(lmPlayers, p) ? (
                          <p>
                            {" "}
                            <BlueDot />
                            played last match
                          </p>
                        ) : null}
                      </Center>
                      <Points>9.0</Points>
                      {p.isSelected ? (
                        <RemoveButton onClick={() => handleRemove(p._id)}>
                          <RemoveCircleOutlineRoundedIcon />
                        </RemoveButton>
                      ) : (
                        <AddButton
                          onClick={() => handleClick(p._id)}
                          disabled={
                            players.filter((k) => k.isSelected === true)
                              .length >= 11
                          }
                          className={
                            players.filter((k) => k.isSelected === true)
                              .length >= 11
                              ? "disabled"
                              : "notdisabled"
                          }
                        >
                          <AddCircleOutlineRoundedIcon />
                        </AddButton>
                      )}
                    </EachPlayer>
                  ))
              ) : (
                <NoLineups>
                  Lineups not out yet,check 30 minutes before the game
                </NoLineups>
              )}
            </>
          </PlayersList>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <PlayersList>
            <>
              {players.length > 0 ? (
                players
                  .filter((p) => p.position === "bowler")
                  .map((p) => (
                    <EachPlayer
                      className={p.isSelected ? "selected" : "notselected"}
                    >
                      <ImgContainer>
                        <img src={getImgurl(p.image, p.playerName)} alt="" />
                      </ImgContainer>
                      <Center>
                        <h1>{p.playerName}</h1>
                        {playedlm(lmPlayers, p) ? (
                          <p>
                            {" "}
                            <BlueDot />
                            played last match
                          </p>
                        ) : null}
                      </Center>
                      <Points>9.0</Points>
                      {p.isSelected ? (
                        <RemoveButton onClick={() => handleRemove(p._id)}>
                          <RemoveCircleOutlineRoundedIcon />
                        </RemoveButton>
                      ) : (
                        <AddButton
                          onClick={() => handleClick(p._id)}
                          disabled={
                            players.filter((k) => k.isSelected === true)
                              .length >= 11
                          }
                          className={
                            players.filter((k) => k.isSelected === true)
                              .length >= 11
                              ? "disabled"
                              : "notdisabled"
                          }
                        >
                          <AddCircleOutlineRoundedIcon />
                        </AddButton>
                      )}
                    </EachPlayer>
                  ))
              ) : (
                <NoLineups>
                  Lineups not out yet,check 30 minutes before the game
                </NoLineups>
              )}
            </>
          </PlayersList>
        </TabPanel>
      </Box>
    </Contest>
  );
}