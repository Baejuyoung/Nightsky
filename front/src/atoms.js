import { atom, selector } from 'recoil';
import * as Api from './api';

export const userState = atom({
  key: 'userState',
  default: [],
});

export const challengeState = atom({
  key: 'challengeState',
  default: [],
});

export const randomListState = atom({
  key: 'randomListState',
  default: [],
});

export const loginState = atom({
  key: 'loginState',
  default: false,
});

export const activeState = atom({
  key: 'activeState',
  default: [],
});

export const emotionState = atom({
  key: 'emotionState',
  default: '',
});

export const getUserSelector = selector({
  key: 'user/get',
  get: async () => {
    try {
      const data = await Api.get('user/info');
      return data.data;
    } catch (err) {
      throw new '테스트 오류'();
    }
  },
  set: ({ set }, newValue) => {
    set(userState, newValue);
  },
});