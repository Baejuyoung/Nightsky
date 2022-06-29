import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import * as Api from '../../api';
import { randomListState } from '../../atoms';

const MainDiaryList = () => {
  const navigate = useNavigate();
  const [radomDiary, setRandomDiary] = useRecoilState(randomListState);

  useEffect(() => {
    console.log(radomDiary.length);
    if (radomDiary.length === 0) {
      getRandomList();
    }
  }, []);

  const getRandomList = async () => {
    try {
      const res = await Api.get('diary/random/list');
      setRandomDiary(res.data);
      console.log(res.data);
    } catch (err) {
      // alert('에러 발생');
    }
  };

  const clickDiary = (e) => {
    const diaryId = e.target.id;
    navigate(`/diary/${diaryId}`, { state: diaryId });
    console.log(e.currentTarget.name);
  };

  return (
    <DiaryListContainer>
      <span>📓 오늘의 일기</span>
      {radomDiary.map((it) => (
        <DiaryCard
          onClick={clickDiary}
          id={it.id}
          key={it.id}
          emotion={it.emotion}
        >
          {it.title}
        </DiaryCard>
      ))}
    </DiaryListContainer>
  );
};

export default MainDiaryList;

const DiaryListContainer = styled.div`
  span {
    font-family: 'EliceDigitalBaeum';
    font-size: 20px;
  }
`;

const DiaryCard = styled.button`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 20px 20px;
  margin: 20px 0px;
  span {
    font-family: 'InfinitySans-RegularA1';
  }
  background-color: ${(props) => {
    switch (props.emotion) {
      case '행복':
        return '#FFEC99';
      case '슬픔':
        return '#A5D8FF';
      case '불안':
        return '#FFD6A5';
      case '혐오':
        return '#FFD6A5';
      case '분노':
        return '#FFADAD';
      case '놀람':
        return '#BDB2FF';
      case '평범':
        return '#D8F5A2';
      default:
        return 'white';
    }
  }};
`;