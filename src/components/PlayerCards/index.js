import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Card from './Card';
import TitledBox from '../TitledBox';

const StyledCardsWrapper = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 15px 5px;
  position: relative;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 1.5em;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f3ebff;
    border-radius: 2px;
  }

  > * {
    margin-right: 15px;
  }

  > *:last-of-type {
    margin-right: 0;
  }
`;

const StyledScrollShadow = styled.div`
  height: 140px;
  margin: 0 !important;
  position: absolute;
  bottom: 0;
  pointer-events: none;
  width: 150px;
  z-index: 10;
`;

const StyledLeftScrollShadow = styled(StyledScrollShadow)`
  background: linear-gradient(to right,
     rgba(79, 73, 87, 1) 10%,
     rgba(0, 0, 0, 0) 100%
  );
  left: 0;
`;

const StyledRightScrollShadow = styled(StyledScrollShadow)`
  background: linear-gradient(to left,
     rgba(79, 73, 87, 1) 10%,
     rgba(0, 0, 0, 0) 100%
  );
  right: 0;
`;

const PlayerCards = ({
  cards,
  nextTurnMutationIsLoading,
  playerIsHorrified,
  selectedCard,
  setSelectedCardHandler,
}) => {
  const [isScrollableToLeft, setIsScrollableToLeft] = useState(false);
  const [isScrollableToRight, setIsScrollableToRight] = useState(false);
  const cardsWrapperRef = useRef(null);

  const isScrollable = () => {
    setIsScrollableToLeft(cardsWrapperRef.current.scrollLeft > 0);
    setIsScrollableToRight(
      Math.round(cardsWrapperRef.current.scrollLeft) + 5
      < (cardsWrapperRef.current.scrollWidth
          - cardsWrapperRef.current.clientWidth)
    );
  }

  const handleOnWheel = (event) => {
    if (event.deltaY < 0) {
      cardsWrapperRef.current.scrollLeft -= cardsWrapperRef.current.clientWidth / 2;
    } else if (event.deltaY > 0) {
      cardsWrapperRef.current.scrollLeft += cardsWrapperRef.current.clientWidth / 2;
    }
  }

  useEffect(() => {
    const cardsWrapperRefCurrentCopy = cardsWrapperRef.current;

    isScrollable();
    cardsWrapperRefCurrentCopy.addEventListener('scroll', isScrollable);
    cardsWrapperRefCurrentCopy.addEventListener('resize', isScrollable);

    return () => {
      cardsWrapperRefCurrentCopy.removeEventListener('scroll', isScrollable);
      cardsWrapperRefCurrentCopy.removeEventListener('resize', isScrollable);
    }
  });

  return (
    <TitledBox
      disabled={nextTurnMutationIsLoading || playerIsHorrified}
      title="YOUR CARDS"
    >
    {isScrollableToLeft && <StyledLeftScrollShadow />}
    {isScrollableToRight && <StyledRightScrollShadow />}

      <StyledCardsWrapper onWheel={handleOnWheel} ref={cardsWrapperRef}>
        {cards.map(card => (
          <Card
            card={card}
            disabled={nextTurnMutationIsLoading || playerIsHorrified}
            key={card.id}
            selected={selectedCard && selectedCard.id === card.id}
            setSelectedCardHandler={setSelectedCardHandler}
          />
        ))}
      </StyledCardsWrapper>
    </TitledBox>
  )
};

PlayerCards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  nextTurnMutationIsLoading: PropTypes.bool.isRequired,
  playerIsHorrified: PropTypes.bool,
  selectedCard: PropTypes.objectOf(PropTypes.any),
  setSelectedCardHandler: PropTypes.func.isRequired,
}

PlayerCards.defaultProps = {
  playerIsHorrified: false,
  selectedCard: null,
}

export default PlayerCards;
