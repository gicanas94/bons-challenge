import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;
`;

const StyledInput = styled.input`
  background: #4f4957;
  border: 0;
  border-radius: 3px;
  color: #eeeeee;
  font-weight: bold;
  margin-bottom: 25px;
  padding: 14px;
  padding-bottom: 8px;
  width: 100%;
`;

const CreateGamePage = ({
  createGameMutation,
  createGameMutationIsLoading,
  setErrorHandler,
  setGameHandler,
}) => {
  const [nameOfPlayerInputValue, setNameOfPlayerInputValue] = useState('');

  const handleOnFormSubmit = (event) => {
    event.preventDefault();

    (async () => {
      try {
        const response = await createGameMutation({
          variables: { name: nameOfPlayerInputValue }
        });

        localStorage.setItem('game', JSON.stringify(response.data.createGame));
        setGameHandler(response.data.createGame);
      } catch (error) {
        setErrorHandler(error);
      }
    })();
  }

  return (
    <StyledForm onSubmit={handleOnFormSubmit}>
      <h1>
        {'Welcome to Bons Game '}
        <span aria-label="Monster Emoji" role="img">👾</span>
      </h1>

      <p>Complete the following input with your name to start.</p>

      <StyledInput
        autoFocus
        onChange={event => setNameOfPlayerInputValue(event.target.value)}
        required
      />

      <Button disabled={createGameMutationIsLoading} type="submit">
        START GAME
      </Button>
    </StyledForm>
  )
};

CreateGamePage.propTypes = {
  createGameMutation: PropTypes.func.isRequired,
  createGameMutationIsLoading: PropTypes.bool.isRequired,
  setErrorHandler: PropTypes.func.isRequired,
  setGameHandler: PropTypes.func.isRequired,
};

export default CreateGamePage;
