const STRINGS_FOR_LOGGING = {
  MONSTER: {
    DAMAGE: 'You were DAMAGED by $value points.',
    HEAL: 'Your opponent was HEALED by $value points.',
    SHIELD: 'Your opponent recovered SHIELD by $value points.',
    HORROR: 'You have been HORRORIFIED. You cannot play any cards this turn.',
  },
  PLAYER: {
    DAMAGE: 'You DAMAGED your opponent by $value points.',
    HEAL: 'You were HEALED by $value points.',
    SHIELD: 'You recovered SHIELD by $value points.',
  },
  NEUTRAL: {
    WELCOME: 'Welcome $value! The idea of the game is simple: you must beat your opponent and prevent him from beating you before running out of turns. Good luck 👋',
  },
};

export default STRINGS_FOR_LOGGING;
