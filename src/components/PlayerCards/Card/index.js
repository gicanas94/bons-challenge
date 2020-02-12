import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  font-family: 'Bungee', cursive;
  height: 100%;
  justify-content: center;
  line-height: 1;
  min-width: 120px;
  max-width: 120px;
  padding: 5px;
  text-align: center;
  transition: linear 0.15s all;

  &:focus {
    outline: none;
  }

  ${({ disabled }) => !disabled && `
    cursor: pointer;

    &:active {
      transform: translateY(4px) !important;
      transition: linear 0.06s all;
    }

    &:hover {
      transform: translateY(-4px);
    }
  `}

  ${({ effect }) => effect === 'DAMAGE' && `
    background: #ffd4d4;
    border: 4px solid #c33d3d;
    color: #c33d3d;
  `}

  ${({ effect }) => effect === 'HEAL' && `
    background: #d4ffd6;
    border: 4px solid #3dc345;
    color: #3dc345;
  `}

  ${({ effect }) => effect === 'SHIELD' && `
    background: #d4e7ff;
    border: 3px solid #3d9fc3;
    color: #3d9fc3;
  `}

  ${({ selected }) => selected && selected !== null && `
    background: #ffffff;
    border-color: #ffffff;
    box-shadow: 0 0 10px 1px #ffffff;
  `}

  ${({ selected }) => !selected && selected !== null && `
    filter: grayscale(100%) brightness(70%);
    opacity: 70%;

    &:hover {
      filter: none;
      opacity: 1;
    }
  `}
`;

const StyledCardEffect = styled.span`
  font-size: 0.8em;
`;

const StyledCardEffectValue = styled.span`
  font-size: 2em;
`;

const Card = ({
  card,
  disabled,
  selected,
  setSelectedCardHandler,
}) => (
  <StyledWrapper
    disabled={disabled}
    effect={card.effect}
    tabIndex="0"
    selected={selected}
    onClick={() => !disabled && setSelectedCardHandler(card)}
  >
    <StyledCardEffect>{card.effect}</StyledCardEffect>
    <StyledCardEffectValue>{card.value}</StyledCardEffectValue>
  </StyledWrapper>
);

Card.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  setSelectedCardHandler: PropTypes.func.isRequired,
}

Card.defaultProps = {
  disabled: false,
  selected: false,
}

export default Card;
