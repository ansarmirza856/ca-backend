import styled from "styled-components";

export const Container = styled.div`
  width: 1240px;
  margin-top: 70px;
`;

export const TabHeader = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

export const Tab = styled.button`
  height: 40px;
  flex: 1;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #d1d1d1;
  background: none;
  outline: none;
  border: none;
  border-bottom: 3px solid #d1d1d1;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &.active {
    color: #6a6ecc;
    border-color: #6a6ecc;
  }

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const TabContent = styled.div`
  padding: 40px 0;
`;
