import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { WindowClose as CloseIcon } from 'styled-icons/fa-regular/WindowClose';

const StyledBackground = styled.div`
  align-items: center;
  background: #4f4957;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 20;
`;

const StyledWrapper = styled.div`
  background: #eeeeee;
  border-radius: 3px;
  position: relative;
  padding: 30px;
  width: 500px;
`;

const StyledContent = styled.p`
  margin-bottom: 0;
`;

const StyledExtraContent = styled.p`
  font-family: 'Bungee', cursive;
  margin-bottom: 0;
  margin-top: 30px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  color: #7a609c;
  height: 40px;
  position: absolute;
  width: 40px;
  right: 30px;
  top: 30px;
  transition: linear 0.15s all;

  &:active {
    transform: translateY(2px) !important;
    transition: linear 0.06s all;
  }

  &:focus {
    color: #624d7d;
    outline: none;
  }

  &:hover {
    color: #624d7d;
    transform: translateY(-2px);
  }
`;

const Modal = ({
  content,
  extraContent,
  onCloseHandler,
  title
}) => (
  <StyledBackground>
    <StyledWrapper>
      <StyledCloseIcon onClick={onCloseHandler} />
      <h1>{title}</h1>
      <StyledContent>{content}</StyledContent>
      {extraContent && <StyledExtraContent>{extraContent}</StyledExtraContent>}
    </StyledWrapper>
  </StyledBackground>
);

Modal.propTypes = {
  content: PropTypes.string.isRequired,
  extraContent: PropTypes.string,
  onCloseHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

Modal.defaultProps = {
  extraContent: undefined,
}

export default Modal;
