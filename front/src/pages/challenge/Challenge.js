import { useEffect, useState } from 'react';
import Nav from '../../components/nav/Nav';
import { MainContainer } from '../../styles/CommonStyle';
import ChallengeCard from './ChallengeCard';
import {
  TitleWrap,
  ChallengeBtn,
  ChallengeTitle,
} from '../../styles/ChallengeStyle';
import res from '../../dummy/CHALLENGE';
import * as Api from '../../api';
import { Filter } from '../../styles/ProgressStyle';

const Challenge = () => {
  const [challengeList, setChallengeList] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState([]);
  const [completedChallenge, setCompletedChallenge] = useState([]);
  const [openCompleted, setOpenCompleted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getChallenge();
  }, [isLoaded]);

  const getChallenge = async () => {
    // const res = await Api.get('challenge'); 더미데이터로 작동 확인
    console.log(res.data);
    setChallengeList(res.data.challenge);
    setDisabled(res.data.log.isRunning === true ? true : false);

    if (res.data.log.isRunning === true) {
      // false => currentChallenge
      const indexFalse = res.data.log.completed.indexOf(false);
      setCurrentChallenge(res.data.log.challenge[indexFalse]);
    }
    if (res.data.log.completed.indexOf(true) !== -1) {
      let idx = res.data.log.completed.indexOf(true);
      let indices = [];
      while (idx != -1) {
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

  const clickCompleteCard = () => {
    setOpenCompleted((prev) => !prev);
  };

  return (
    <>
      <Nav />
      <div style={{ marginTop: '5rem' }}>
        <MainContainer>
          <TitleWrap>
            <ChallengeTitle>🎯챌린지</ChallengeTitle>
            <ChallengeBtn onClick={clickCompleteCard}>
              <input type={'checkbox'} />
              진행한 챌린지
            </ChallengeBtn>
          </TitleWrap>
          {openCompleted ? (
            completedChallenge.length === 0 ? (
              <>완료한 챌린지가 없어요.ㅠ-ㅠ</>
            ) : (
              <>
                {completedChallenge.map((it) => (
                  <ChallengeCard
                    it={it}
                    key={it.id}
                    disabled={disabled}
                    currentChallenge={currentChallenge}
                    setIsLoaded={setIsLoaded}
                    setCurrentChallenge={setCurrentChallenge}
                  />
                ))}
              </>
            )
          ) : (
            <>
              {challengeList.map((it) => (
                <ChallengeCard
                  it={it}
                  key={it.id}
                  disabled={disabled}
                  currentChallenge={currentChallenge}
                  setIsLoaded={setIsLoaded}
                  setCurrentChallenge={setCurrentChallenge}
                />
              ))}
            </>
          )}
        </MainContainer>
      </div>
    </>
  );
};

export default Challenge;
