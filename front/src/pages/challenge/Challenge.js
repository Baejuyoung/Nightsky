import BattlePass from '../../components/challenge/BattlePass';
import Record from './challengeCard/Record';
import { MainContainer } from '../../styles/CommonStyle';

const Challenge = () => {
  return (
    <div style={{ marginTop: '5rem' }}>
      <MainContainer>
        <Record />
        <div style={{ marginTop: '3rem' }}>
          <BattlePass
            width={15}
            height={20}
            containerWdith={70}
            challenge={'ture'}
          />
        </div>
      </MainContainer>
    </div>
  );
};

export default Challenge;
