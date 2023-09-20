import "./home.css";
import "./create.css";

import styled from "@emotion/styled";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { style } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { URL } from "../constants/userConstants";
import { getImgurl } from "../utils/img_url";
import Bottomnav from "./bottomnavbar";
import SavedTeam from "./savedteam";
import Steppr from "./stepper";
import { useAlert } from "react-alert";

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
  z-index: 1000000000000000000000;
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
  background-color: var(--black);
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

const Description = styled.div`
  background-color: #fafafa;
  padding: 10px 10px;
  h3 {
    text-align: center;
    font-size: 16px;
  }
  p {
    text-align: center;
    font-size: 12px;
    margin-top: 17px;
  }
`;
export function Captain({ players,editMode,teamId }) {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const alert = useAlert();
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [vicecaptainId, setVicecaptainId] = useState(null);
  const [captainId, setCaptainId] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [save, setSave] = useState(false);
  useEffect(() => {
    const pl = players.map((obj) => ({
      ...obj,
      isCaptain: false,
      isViceCaptain: false,
    }));
    setSelectedPlayers([...pl]);
  }, [players]);
  console.log(selectedPlayers, "select");
  const handleCaptain = (i) => {
    const op = players.map((p) => {
      p.isCaptain = false;
      return p;
    });
    setCaptainId(i);
    const po = op.map((p) => {
      if (p.playerId === i) {
        p.isCaptain = true;
      }
      return p;
    });
    console.log("clicked", po);
    setSelectedPlayers([...po]);
  };

  const handleViceCaptain = (i) => {
    const op = players.map((p) => {
      p.isViceCaptain = false;
      return p;
    });
    setVicecaptainId(i);
    const po = op.map((p) => {
      if (p.playerId === i) {
        p.isViceCaptain = true;
      }
      return p;
    });
    setSelectedPlayers([...po]);
  };
  const handleSave = async () => {
    console.log("clicked next");
    const data = await axios.post(`${URL}/saveteam/${id}`, {
      players: selectedPlayers,
      matchId: id,
      userid: user._id,
      captainId,
      vicecaptainId,
    });
    setSave(true);
    alert.success(data.data.message);
    navigate(`/contests/${id}`);
  };

  const handleUpdate = async () => {
    console.log("clicked next");
    const data = await axios.put(`${URL}/updateTeam/${teamId}`, {
      players: selectedPlayers,
      matchId: id,
      userid: user._id,
      captainId,
      vicecaptainId,
    });
    setSave(true);
    alert.success(data.data.message);
    navigate(`/contests/${id}`);
  };

  function isCandVcselected(se) {
    const a = se.find((s) => s.isCaptain === true);
    const b = se.find((s) => s.isViceCaptain === true);
    return a && b;
  }
  return (
    <>
      {!save ? (
        <>
          <Description>
            <h3>Choose your captain and vicecaptain</h3>
            <p>C gets 2x points, VC gets 1.5x points</p>
          </Description>
          <CaptainSelector>
            {selectedPlayers.map((p) => (
              <Player>
                <Name>
                  <img src={getImgurl(p.image, p.playerId)} alt="" />
                  <h1>{p.playerName}</h1>
                </Name>
                <CaptainC
                  onClick={() => handleCaptain(p.playerId)}
                  className={p.isCaptain ? "captain" : "notcaptain"}
                >
                  c
                </CaptainC>
                <ViceCaptain
                  onClick={() => handleViceCaptain(p.playerId)}
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
            {editMode? <NextButton
              disabled={!isCandVcselected(selectedPlayers)}
              className={isCandVcselected ? "selectedc" : "not"}
              onClick={() => handleUpdate()}
            >
              save
            </NextButton>: <NextButton
              disabled={!isCandVcselected(selectedPlayers)}
              className={isCandVcselected ? "selectedc" : "not"}
              onClick={() => handleSave()}
            >
              save
            </NextButton>}
          </NextButtonContainer>
        </>
      ) : (
        <SavedTeam players={selectedPlayers} />
      )}
    </>
  );
}

export default Captain;
