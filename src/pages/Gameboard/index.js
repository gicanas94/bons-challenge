import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import Console from '../../components/Console';
import PlayerCards from '../../components/PlayerCards';
import PlayersStatus from '../../components/PlayersStatus';
import STRINGS_FOR_LOGGING from '../../constants';
import TurnsStatus from '../../components/TurnsStatus';

const StyledGridWrapper = styled.div`
  align-content: space-between;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "turns-and-players console"
    "cards-and-button cards-and-button";
  height: 100%;
  padding: 15px;
  width: 100%;
`;

const StyledTurnsAndPlayersStatusWrapper = styled.div`
  grid-area: turns-and-players;
`;

const StyledTurnsStatusWrapper = styled.div`
  margin-bottom: 15px;
`;

const StyledConsoleWrapper = styled.div`
  grid-area: console;
  max-height: 100%;
  overflow: hidden;
`;

const StyledPlayerCardsAndButtonWrapper = styled.div`
  display: grid;
  grid-area: cards-and-button;
  grid-gap: 15px;
  grid-template-columns: 5fr 1fr;
  width: 100%;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  button:first-of-type {
    margin-bottom: 15px;
  }
`;

const GameboardPage = ({
  game,
  nextTurnMutation,
  nextTurnMutationIsLoading,
  setErrorHandler,
  setGameHandler,
  setModalHandler,
}) => {
  const [logs, _setLogs] = useState(
    JSON.parse(localStorage.getItem('logs')) || [{
      message: STRINGS_FOR_LOGGING.NEUTRAL.WELCOME.replace(
        '$value', game.player.name
      ),
      issuer: 'NEUTRAL',
    }]
  );

  const [playerIsHorrified, setPlayerIsHorrified] = useState(
    JSON.parse(localStorage.getItem('playerIsHorrified')) || false
  );

  const [selectedCard, setSelectedCard] = useState(null);
  const logsRef = useRef(logs);

  const setLogs = (newLogs) => {
    logsRef.current = newLogs;
    _setLogs(newLogs);
  };

  const addLogIntoLogs = (card, issuer) => {
    const newLogs = [
      {
        message: STRINGS_FOR_LOGGING[issuer][card.effect].replace(
          '$value', card.value
        ),
        type: card.effect,
        issuer,
      },
      ...logsRef.current,
    ];

    setLogs(newLogs);
    localStorage.setItem('logs', JSON.stringify(newLogs));
  }

  const checkIfGameCanEnd = (gameToCheck) => {
    const endGame = () => {
      localStorage.removeItem('playerIsHorrified');
      localStorage.removeItem('logs');
      localStorage.removeItem('game');
      setPlayerIsHorrified(false);
      setLogs([]);
      setGameHandler(null);
    }

    if ((gameToCheck.turnsLeft === 0 && gameToCheck.monster.hp > 0)
      || gameToCheck.player.hp === 0) {
      setModalHandler({
        title: 'You lost 😔',
        content: 'Thank you for playing! You always can try again.'
      })

      endGame();
    } else if (gameToCheck.monster.hp === 0) {
      setModalHandler({
        title: 'Congratulations 👏',
        content: 'You beat your opponent! Thank you for playing.'
      });

      endGame();
    } else {
      setGameHandler(gameToCheck);
      localStorage.setItem('game', JSON.stringify(gameToCheck));
    }
  }

  const handleOnEndTurnButtonClick = () => {
    (async () => {
      try {
        const response = await nextTurnMutation({
          variables: {
            gameId: game.id,
            cardId: selectedCard ? selectedCard.id : undefined,
          }
        });

        if (selectedCard) {
          addLogIntoLogs(selectedCard, 'PLAYER');
          setSelectedCard(null);
        }

        setPlayerIsHorrified(
          response.data.nextTurn.monsterEffect.effect === 'HORROR'
        )

        localStorage.setItem(
          'playerIsHorrified',
          response.data.nextTurn.monsterEffect.effect === 'HORROR',
        );

        addLogIntoLogs(response.data.nextTurn.monsterEffect, 'MONSTER');
        checkIfGameCanEnd(response.data.nextTurn.game);
      } catch (error) {
        setErrorHandler(error);
      }
    })();
  }

  const handleOnSimulateWinButtonClick = () => {
    checkIfGameCanEnd({
      ...game,
      monster: {
        hp: 0,
      },
    });
  }

  return (
    <StyledGridWrapper>
      <StyledTurnsAndPlayersStatusWrapper>
        <StyledTurnsStatusWrapper>
          <TurnsStatus game={game} />
        </StyledTurnsStatusWrapper>

        <PlayersStatus
          monster={game.monster}
          player={game.player}
          nextTurnMutationIsLoading={nextTurnMutationIsLoading}
        />
      </StyledTurnsAndPlayersStatusWrapper>

      <StyledConsoleWrapper>
        <Console logs={logs} />
      </StyledConsoleWrapper>

      <StyledPlayerCardsAndButtonWrapper>
        <PlayerCards
          cards={game.player.cards}
          nextTurnMutationIsLoading={nextTurnMutationIsLoading}
          playerIsHorrified={playerIsHorrified}
          selectedCard={selectedCard}
          setSelectedCardHandler={setSelectedCard}
        />

        <StyledButtonsWrapper>
          <Button
            color="#69d470"
            disabled={nextTurnMutationIsLoading}
            height="100%"
            onClick={() => handleOnEndTurnButtonClick()}
          >
            END TURN
          </Button>

          <Button
            color="#69c4d4"
            height="100%"
            onClick={() => handleOnSimulateWinButtonClick()}
          >
            SIMULATE WIN
          </Button>
        </StyledButtonsWrapper>
      </StyledPlayerCardsAndButtonWrapper>
    </StyledGridWrapper>
  )
};

GameboardPage.propTypes = {
  game: PropTypes.objectOf(PropTypes.any).isRequired,
  nextTurnMutation: PropTypes.func.isRequired,
  nextTurnMutationIsLoading: PropTypes.bool.isRequired,
  setErrorHandler: PropTypes.func.isRequired,
  setGameHandler: PropTypes.func.isRequired,
  setModalHandler: PropTypes.func.isRequired,
};

export default GameboardPage;
