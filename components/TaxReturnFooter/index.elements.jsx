import styled from "styled-components";

export const Container = styled.div`
  max-width: 1240px;
  height: 294px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  padding: 0px 36px;
  box-shadow: 0px 10px 24px rgba(170, 170, 170, 0.15);
`;

export const CalculationContainer = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 0.5px dashed #c4c4c4;
  padding: 0px 34px;
`;

export const CalculationWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CalculationHeader = styled.h4`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 170%;
  color: #7c7b7b;
`;

export const CalculationContent = styled.h4`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 170%;
  color: #7c7b7b;
`;

export const TotalContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TotalWrapper = styled.div``;

export const TotalHeader = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #525252;
`;

export const TotalContent = styled.h4`
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  color: #525252;
`;
