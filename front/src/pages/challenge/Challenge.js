import { useEffect, useState } from "react";
import Nav from "../../components/nav/Nav";
import { MainContainer } from "../../styles/CommonStyle";
import ChallengeCard from "./ChallengeCard";
import {
  TitleWrap,
  ChallengeBtn,
  ChallengeTitle,
} from "../../styles/ChallengeStyle";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";
import snackBar from "../../components/snackBar";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms";

const Challenge = () => {
  const navigate = useNavigate();
  const [challengeList, setChallengeList] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState([]);
  const [completedChallenge, setCompletedChallenge] = useState([]);
  const [openCompletedChallenge, setOpenCompletedChallenge] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user.length === 0) {
      snackBar("error", "로그인 후 서비스를 이용해주세요!");
      navigate("/");
    } else {
      getChallenge();
    }
  }, [isLoaded]);

  const getChallenge = async () => {
    const res = await Api.get("challenge");
    console.log(res.data);
    setChallengeList(res.data.challenge);
    setDisabled(res.data.log.isRunning === true ? true : false);

    if (res.data.log.isRunning === true) {
      const indexFalse = res.data.log.completed.indexOf(false);
      setCurrentChallenge(res.data.log.challenge[indexFalse]);
    }

    if (res.data.log.completed.indexOf(true) !== -1) {
      // true 인 값이 존재한다면.
      let idx = res.data.log.completed.indexOf(true);
      let indices = [];
      while (idx !== -1) {
        indices.push(res.data.log.challenge[idx]);
        idx = res.data.log.completed.indexOf(true, idx + 1);
      }

      let filterCompletedChallenge = res.data.challenge.filter((acc, cur) => {
        console.log(acc.name);
        return acc.name === indices[cur];
      }, []);

      console.log(filterCompletedChallenge);
      setCompletedChallenge(filterCompletedChallenge); // 성공한 챌린지 이름 저장
    }
  };

  if (openCompletedChallenge === true) {
    console.log("openCompletedChallenge");
  }

  const clickCompleteCard = () => {
    setOpenCompletedChallenge((prev) => !prev);
  };

  return (
    <>
      <Nav />
      <div style={{ marginTop: "5rem" }}>
        <MainContainer>
          <TitleWrap>
            <ChallengeTitle>🎯챌린지</ChallengeTitle>
            <ChallengeBtn onClick={clickCompleteCard}>
              진행한 챌린지
            </ChallengeBtn>
          </TitleWrap>
          {(openCompletedChallenge ? completedChallenge : challengeList).map(
            (it) => (
              <ChallengeCard
                it={it}
                key={it.id}
                disabled={disabled}
                currentChallenge={currentChallenge}
                setIsLoaded={setIsLoaded}
                setCurrentChallenge={setCurrentChallenge}
              />
            )
          )}
        </MainContainer>
      </div>
    </>
  );
};

export default Challenge;
