import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import TitledBox from '../TitledBox';

const StyledStatusElementsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  text-align: center;
`;

const StyledStatusElement = styled.div`
  display: flex;
  flex-direction: column;

  &:first-of-type {
    color: #8b7f9a;
  }

  &.fewTurnsLeft {
    color: #ff9b9b;
  }
`;

const StyledStatusElementHeader = styled.span`
  color: #8b7f9a;
`;

const StyledStatusElementValue = styled.span`
  font-family: 'Bungee', cursive;
  font-size: 2em;
`;

const TurnsStatus = ({ game }) => (
  <TitledBox title="TURNS">
    <StyledStatusElementsWrapper>
      <StyledStatusElement>
        <StyledStatusElementHeader>Past</StyledStatusElementHeader>

        <StyledStatusElementValue>
          {game.maxTurns - game.turnsLeft}
        </StyledStatusElementValue>
      </StyledStatusElement>

      <StyledStatusElement className={game.currentTurn >= 15 && 'fewTurnsLeft'}>
        <StyledStatusElementHeader>Current</StyledStatusElementHeader>
        <StyledStatusElementValue>{game.currentTurn}</StyledStatusElementValue>
      </StyledStatusElement>

      <StyledStatusElement className={game.turnsLeft <= 5 && 'fewTurnsLeft'}>
        <StyledStatusElementHeader>Left</StyledStatusElementHeader>
        <StyledStatusElementValue>{game.turnsLeft}</StyledStatusElementValue>
      </StyledStatusElement>
    </StyledStatusElementsWrapper>
  </TitledBox>
);

TurnsStatus.propTypes = {
  game: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default TurnsStatus;
