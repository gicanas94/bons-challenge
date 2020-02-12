import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  color: #eeeeee;
  max-height: 100%;
  overflow: hidden;
  position: relative;
  transition: linear 0.1s filter;
  width: 100%;

  ${({ disabled }) => disabled && `
    filter: grayscale(100%) brightness(70%);
    opacity: 70%;
    user-select: none;
  `}

  ${({ rounded }) => rounded && `
    border-radius: 3px;
  `}
`;

const StyledHeader = styled.div`
  background: #7a609c;
  font-family: 'Bungee', cursive;
  padding: 10px 0 5px 0;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
  z-index: 10;
`;

const StyledContent = styled.div`
  background: #4f4957;
  padding: 15px;
`;

const TitledBox = ({
  children,
  disabled,
  rounded,
  title,
}) => (
  <StyledWrapper disabled={disabled} rounded={rounded}>
    <StyledHeader>{title}</StyledHeader>
    <StyledContent>{children}</StyledContent>
  </StyledWrapper>
);

TitledBox.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

TitledBox.defaultProps = {
  disabled: false,
  rounded: true,
}

export default TitledBox;
