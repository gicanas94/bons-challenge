import Color from 'color';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 0;
  border-radius: 3px;
  font-family: 'Bungee', cursive;
  padding: 12px;
  padding-bottom: 10px;
  text-transform: uppercase;
  transition: linear 0.15s all;
  user-select: none;
  width: 100%;

  ${({ disabled }) => disabled && `
    filter: grayscale(100%) brightness(70%);
    opacity: 70%;
  `}

  ${({ disabled, color }) => !disabled && `
    background: ${color};
    color: ${Color(color).lighten(0.7).hex()};
    cursor: pointer;

    &:active {
      transform: translateY(2px) !important;
      transition: linear 0.06s all;
    }

    &:focus {
      background: ${Color(color).darken(0.2).hex()};
      outline: none;
    }

    &:hover {
      background: ${Color(color).darken(0.2).hex()};
      transform: translateY(-2px);
    }
  `}

  ${({ height }) => height && `
    height: ${height};
  `}
`;

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  height: PropTypes.string,
}

Button.defaultProps = {
  color: '#7a609c',
  disabled: false,
  height: 'auto',
}

export default Button;
