import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import "./home.css";
import "./create.css";
import Steppr from "./stepper";
import { useEffect, useState } from "react";
import axios from "axios";
import Bottomnav from "./bottomnavbar";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";
import { style } from "@mui/system";
import styled from "@emotion/styled";
import SavedTeam from "./savedteam";

const CaptainSelector = styled.div``;
const Player = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 0;
  h1 {
    font-size: 16px;
    font-family: "Open Sans";
    width: 100px;
    text-transform: capitalize;
  }
`;

const CaptainC = styled.button`
  border: 2px solid #cccccc;
  border-radius: 50%;
  background-color: #ffffff;
  font-weight: 700;
  color: #cccccc;
  width: 30px;
  font-size: 16px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ViceCaptain = styled.button`
  border: 2px solid #cccccc;
  border-radius: 50%;
  background-color: #ffffff;
  color: #cccccc;
  font-weight: 700;
  font-size: 16px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Name = styled.div`
  display: flex;
  width: 200px;
  align-items: center;
  img {
    width: 50px !important;
    height: 50px !important;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
  }
  h1 {
    white-space: nowrap;
  }
`;

const NextButtonContainer = styled.div`
  position: fixed;
  bottom: 8%;
  left: 0%;
  z-index: 1000000000000000000000000;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const NextButton = styled.button`
  background-color: #008a36;
  color: #ffffff;
  border: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px 20px;
  border: none;
  outline: none;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 1000000000000000000000000;
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
`;

const PrevButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px 10px;
  border: none;
  outline: none;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 1000000000000000000000000;
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  display: flex;
  align-items: center;
  width: 230px;
  justify-content: space-evenly;
  white-space: nowrap;
`;
export const Captain = ({ players }) => {
  const [upcoming, setUpcoming] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [save, setSave] = useState(false);
  useEffect(() => {
    let pl = players.map((obj) => ({
      ...obj,
      isCaptain: false,
      isViceCaptain: false,
    }));
    setSelectedPlayers([...pl]);
  }, []);

  const handleCaptain = (i) => {
    let op = players.map((p) => {
      p.isCaptain = false;
      return p;
    });
    let po = op.map((p) => {
      if (p._id === i) {
        p.isCaptain = true;
      }
      return p;
    });
    console.log("clicked", po);
    setSelectedPlayers([...po]);
  };

  const handleViceCaptain = (i) => {
    let op = players.map((p) => {
      p.isViceCaptain = false;
      return p;
    });
    let po = op.map((p) => {
      if (p._id === i) {
        p.isViceCaptain = true;
      }
      return p;
    });
    setSelectedPlayers([...po]);
  };
  const handleSave = () => {
    console.log("clicked next");
    setSave(true);
  };

  function isCandVcselected(se) {
    console.log("r", selectedPlayers);
    let a = se.find((s) => s.isCaptain === true);
    let b = se.find((s) => s.isViceCaptain === true);
    console.log(a, b, a & b);
    return a && b;
  }
  return (
    <>
      {!save ? (
        <>
          <CaptainSelector>
            {selectedPlayers.map((p) => (
              <Player>
                <Name>
                  <img src={p.image} alt="" />
                  <h1>{p.name.charAt(0).toUpperCase() + " " + p.lastname}</h1>
                </Name>
                <CaptainC
                  onClick={() => handleCaptain(p._id)}
                  className={p.isCaptain ? "captain" : "notcaptain"}
                >
                  c
                </CaptainC>
                <ViceCaptain
                  onClick={() => handleViceCaptain(p._id)}
                  className={p.isViceCaptain ? "captain" : "notcaptain"}
                >
                  vc
                </ViceCaptain>
              </Player>
            ))}
          </CaptainSelector>
          <NextButtonContainer>
            <PrevButton>
              <RemoveRedEyeOutlinedIcon />
              Preview / Lineup
              <GroupsRoundedIcon />
            </PrevButton>
            <NextButton
              disabled={!isCandVcselected(selectedPlayers)}
              className={isCandVcselected ? "selectedc" : "not"}
              onClick={() => handleSave()}
            >
              save
            </NextButton>
          </NextButtonContainer>
        </>
      ) : (
        <SavedTeam players={selectedPlayers} />
      )}
    </>
  );
};

export default Captain;