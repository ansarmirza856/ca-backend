import styled from "styled-components";

export const Container = styled.div`
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 26px;
`;

export const Content = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  width: 100%;
  padding-top: 30px;
`;

export const EmploymentContainer = styled.div`
  width: 100%;
  min-height: ${({ isOpen }) => (isOpen ? "100%" : "84.88px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #ffffff;
  padding: 20px 24px 20px 24px;
  box-shadow: 0px 4px 25px rgba(214, 214, 214, 0.3);
  transition: all 0.3s ease-in-out;
`;

export const EmploymentHeader = styled.h4`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 29px;
  color: #4e5d78;
`;

export const EmploymentNumbers = styled.h6`
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  color: #b0b7c3;
`;

export const ToggleButton = styled.button`
  width: 131.37px;
  height: 44.46px;
  background: ${({ isOpen }) => (isOpen ? "#25B6AC" : "#8053ff")};} ;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background: ${({ isOpen }) => (isOpen ? "#18AEA4" : "#7242f9")};
  }
`;

export const EmploymentInfo = styled.div``;

export const Employmentwrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
