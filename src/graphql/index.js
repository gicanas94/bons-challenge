import { gql } from 'apollo-boost';

const CREATE_GAME_MUTATION = gql`
  mutation GameCreateInput($name: String!) {
    createGame(input: {
      name: $name
    }) {
      id
      currentTurn
      maxTurns
      turnsLeft
      player {
        id
        name
        hp
        maxHp
        shield
        cards {
          id
          effect
          value
        }
      }
      monster {
        id
        name
        hp
        maxHp
        shield
      }
    }
  }
`;

const NEXT_TURN_MUTATION = gql`
  mutation GameNextTurnInput($gameId: ID!, $cardId: ID) {
    nextTurn(input: {
      gameId: $gameId
      cardId: $cardId
    }) {
      game {
        id
        currentTurn
        maxTurns
        turnsLeft
        player {
          id
          name
          hp
          maxHp
          shield
          cards {
            id
            effect
            value
          }
        }
        monster {
          id
          name
          hp
          maxHp
          shield
        }
      }
      monsterEffect {
        effect
        value
      }
    }
  }
`;

export { CREATE_GAME_MUTATION, NEXT_TURN_MUTATION };
