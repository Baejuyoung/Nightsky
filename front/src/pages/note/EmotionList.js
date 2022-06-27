import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputLabel, FormControl, NativeSelect } from '@mui/material';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as Api from '../../api';
import {
  EmotionCard,
  Title,
  DiaryDate,
  TitleContainer,
  DateWrapper,
} from '../../styles/NoteStyle';

import { handleScroll } from '../../utils/handleScroll';
import styled from 'styled-components';

const SEARCH = [
  { value: 'title', name: '⭐️ 제목', id: 1 },
  { value: 'tag', name: '🔖 태그 ', id: 2 },
  { value: 'text', name: '🗒 내용', id: 3 },
  { value: 'all', name: '📓 통합', id: 4 },
];

const EmotionList = () => {
  const navigate = useNavigate();
  const [diaryList, setDiaryList] = useState([]);
  const [cursor, setCursor] = useState('');
  const [isLoaded, setIsLoaded] = useState(true); // Load 중인지 판별
  const [stop, setStop] = useState(false);
  const [select, setSelect] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isLoaded && !stop) {
      getList();
    }
  }, [isLoaded]);

  useEffect(() => {
    window.addEventListener(
      'scroll',
      function (event) {
        const res = handleScroll(event);
        if (res === true) {
          setIsLoaded(true);
        }
      },
      false
    );
  }, []);

  const getList = async () => {
    if (isLoaded === true) {
      try {
        const res = await Api.get(`diary/list/?cursor=${cursor}`);
        console.log(res.data);
        if (diaryList.length !== 0 && diaryList[9].id === res.data[0].id) {
          return console.log('반복된 일기 list');
        }
        const length = res.data.length;
        const sliceData = res.data.slice(0, length - 1);
        setCursor(res.data.slice(-1)[0].cursor);
        setDiaryList((data) => [...data, ...sliceData]);
        setIsLoaded(false);
        if (length < 10) {
          setStop(true);
        }
      } catch (err) {}
    }
  };

  const openCard = (e) => {
    const diaryId = e.currentTarget.value;
    navigate(`/diary/${diaryId}`, { state: diaryId });
  };

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  const clickSearch = async () => {
    if (select.length !== 0) {
      try {
        const res = await Api.get(`diary/search/?${select}=${search}`);
        if (res.data.length === 0) {
          return <h1>검색에 해당하는 일기가 없다아를 잘 보여주고 싶다</h1>;
        } else {
          setDiaryList(res.data);
        }
      } catch (err) {
        alert('검색 중 오류 발생');
      }
    } else {
      console.log('Asdf');
    }
  };

  return (
    <>
      <SearchContainer>
        <FormControl onChange={handleChange}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            선택
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: 'age',
              id: 'uncontrolled-native',
            }}
          >
            <option value=""></option>
            {SEARCH.map((it, index) => {
              return (
                <option name={it.name} key={it.index} value={it.id}>
                  {it.name}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        <SearchWrapper>
          <input
            type="text"
            placeholder="검색어 입력"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <IconWrapper onClick={clickSearch}>
            <FontAwesomeIcon icon={faSearch} className="user" />
          </IconWrapper>
        </SearchWrapper>
      </SearchContainer>
      <EmotionContainer>
        {diaryList.map((it) => (
          <EmotionCard
            onClick={openCard}
            key={it.id}
            emotion={'행복'}
            value={it.id}
          >
            <TitleContainer>
              <Title>{it.title}</Title>
            </TitleContainer>
            <DateWrapper>
              <DiaryDate>{it.date.slice(0, 10)}</DiaryDate>
            </DateWrapper>
          </EmotionCard>
        ))}
      </EmotionContainer>
    </>
  );
};

export default EmotionList;

const SearchContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 30px;
  margin-bottom: 20px;
  input {
    display: inline-flex;
    width: 300px;
    height: 3rem;
    color: black;
    background: #f8f9fa;
    padding: 0px 30px;
    border: none;
    border-radius: 1rem;
    outline: none;
    font-size: 1rem;
    cursor: text;
    &:focus::-webkit-input-placeholder {
      color: #748ffc;
    }
  }
`;

const IconWrapper = styled.div`
  color: #808080;
  font-size: 20px;
  position: absolute;
  top: 15px;
  right: 10px;
  left: 10px;
  width: 10px;
  cursor: pointer;
`;

const EmotionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
