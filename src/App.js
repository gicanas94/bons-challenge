import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';

import { CREATE_GAME_MUTATION, NEXT_TURN_MUTATION } from './graphql';
import CreateGamePage from './pages/CreateGame';
import GameboardPage from './pages/Gameboard';
import Modal from './components/Modal';

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const App = () => {
  const [game, setGame] = useState(JSON.parse(localStorage.getItem('game')) || null);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);

  const [
    createGameMutation,
    { loading: createGameMutationIsLoading }
  ] = useMutation(CREATE_GAME_MUTATION);

  const [
    nextTurnMutation,
    { loading: nextTurnMutationIsLoading }
  ] = useMutation(NEXT_TURN_MUTATION);

  return (
    <StyledWrapper>
      {!game && (
        <CreateGamePage
          createGameMutation={createGameMutation}
          createGameMutationIsLoading={createGameMutationIsLoading}
          setErrorHandler={setError}
          setGameHandler={setGame}
        />
      )}

      {game && (
        <GameboardPage
          game={game}
          nextTurnMutation={nextTurnMutation}
          nextTurnMutationIsLoading={nextTurnMutationIsLoading}
          setErrorHandler={setError}
          setGameHandler={setGame}
          setModalHandler={setModal}
        />
      )}

      {modal && (
        <Modal
          content={modal.content}
          onCloseHandler={() => setModal()}
          title={modal.title}
        />
      )}

      {error && (
        <Modal
          content={`There was an error trying to proccess your request. Close this modal to retry or try again in a while${game ? ', your game has been securely saved' : '.'}`}
          extraContent={error.message}
          onCloseHandler={() => {
            setError();
            setModal();
          }}
          title="Oops."
        />
      )}
    </StyledWrapper>
  );
}

export default App;
