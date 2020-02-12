import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import TitledBox from '../TitledBox';

const StyledOverlay = styled.div`
  background: linear-gradient(to top,
     rgba(79, 73, 87, 0.98) 10%,
     rgba(0, 0, 0, 0) 70%
  );
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
`;

const StyledLogMessage = styled.div`
  font-size: 0.9em;
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: 15px;

  ${({ issuer }) => issuer === 'MONSTER' && `
    color: #ff9b9b !important;
  `}

  ${({ issuer }) => issuer === 'PLAYER' && `
    color: #a5ffaa;
  `}

  ${({ issuer }) => issuer === 'NEUTRAL' && `
    color: #eeeeee;
  `}

  ${({ type }) => type === 'SHIELD' && `
    color: #72d4ff;
  `}

  ${({ type }) => type === 'HORROR' && `
    color: #e7d5ff !important;
  `}

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Console = ({ logs }) => (
  <TitledBox title="CONSOLE">
    {logs.length > 3 && <StyledOverlay />}

    {logs.map(log => (
      <StyledLogMessage
        key={log.message + Math.floor((Math.random() * 100000))}
        issuer={log.issuer}
        type={log.type}
      >
        {log.message}
      </StyledLogMessage>
    ))}
  </TitledBox>
)

Console.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Console;
