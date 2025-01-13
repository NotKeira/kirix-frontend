import React from "react";
import styled, { keyframes } from "styled-components";

interface AuthenticationPopupProps {
  isSuccess: boolean;
  isVisible: boolean;
  onClose?: () => void;
}

const slideUp = keyframes`
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  inset-block-start: 0;
  inset-inline-start: 0;
  inline-size: 100%;
  block-size: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props: { isVisible: any }) =>
    props.isVisible ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  inline-size: 90%;
  max-inline-size: 400px;
  position: relative;
  animation: ${slideUp} 0.3s ease-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatusBar = styled.div<{ isSuccess: boolean }>`
  background-color: ${(props: { isSuccess: any }) =>
    props.isSuccess ? "#4CAF50" : "#f44336"};
  block-size: 6px;
  border-radius: 3px;
  margin: -24px auto 16px;
  inline-size: 95%;
`;

const Message = styled.p<{ isSuccess: boolean }>`
  color: ${(props: { isSuccess: any }) =>
    props.isSuccess ? "#4CAF50" : "#f44336"};
  font-size: 1.1rem;
  text-align: center;
  margin: 0;
  padding: 10px;
`;

const Authentication: React.FC<AuthenticationPopupProps> = ({
  isSuccess,
  isVisible,
  onClose,
}) => {
  return (
    <Overlay isVisible={isVisible} onClick={onClose}>
      <PopupContainer
        onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
      >
        <StatusBar isSuccess={isSuccess} />
        <Message isSuccess={isSuccess}>
          {isSuccess
            ? "Registration successful!"
            : "Registration failed! Please try again later."}
        </Message>
      </PopupContainer>
    </Overlay>
  );
};

export default Authentication;
