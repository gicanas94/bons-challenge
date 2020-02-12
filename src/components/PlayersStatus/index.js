import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import TitledBox from '../TitledBox';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;

  > * {
    width: 50%;
  }

  > *:first-of-type {
    margin-right: 15px;
    width: 50%;
  }
`;

const StyledPlayerStatusWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledPlayerStatusHeader = styled.span`
  color: #8b7f9a;
`;

const StyledPlayerStatusValue = styled.span`
  font-family: 'Bungee', cursive;
  font-size: 1.1em;

  &.fewHealthLeft {
    color: #ff9b9b;
  }
`;

const PlayersStatus = ({ monster, player, nextTurnMutationIsLoading }) => (
  <StyledWrapper>
    <TitledBox disabled={!nextTurnMutationIsLoading} title={monster.name}>
      <StyledPlayerStatusWrapper>
        <div>
          <StyledPlayerStatusHeader>Health</StyledPlayerStatusHeader>
          <br />

          <StyledPlayerStatusValue
            className={monster.hp <= 10 && 'fewHealthLeft'}
          >
            {`${monster.hp} / ${monster.maxHp}`}
          </StyledPlayerStatusValue>
        </div>

        <div>
          <StyledPlayerStatusHeader>Shield</StyledPlayerStatusHeader>
          <br />

          <StyledPlayerStatusValue>
            {monster.shield}
          </StyledPlayerStatusValue>
        </div>
      </StyledPlayerStatusWrapper>
    </TitledBox>

    <TitledBox disabled={nextTurnMutationIsLoading} title={`${player.name} (YOU)`}>
      <StyledPlayerStatusWrapper>
        <div>
          <StyledPlayerStatusHeader>Health</StyledPlayerStatusHeader>
          <br />

          <StyledPlayerStatusValue
            className={player.hp <= 5 && 'fewHealthLeft'}
          >
            {`${player.hp} / ${player.maxHp}`}
          </StyledPlayerStatusValue>
        </div>

        <div>
          <StyledPlayerStatusHeader>Shield</StyledPlayerStatusHeader>
          <br />

          <StyledPlayerStatusValue>
            {player.shield}
          </StyledPlayerStatusValue>
        </div>
      </StyledPlayerStatusWrapper>
    </TitledBox>
  </StyledWrapper>
);

PlayersStatus.propTypes = {
  monster: PropTypes.objectOf(PropTypes.any).isRequired,
  player: PropTypes.objectOf(PropTypes.any).isRequired,
  nextTurnMutationIsLoading: PropTypes.bool.isRequired,
}

export default PlayersStatus;
