import React from "react";

import {
  Container,
  CalculationContainer,
  CalculationHeader,
  CalculationWrapper,
  CalculationContent,
  TotalContainer,
  TotalWrapper,
  TotalHeader,
  TotalContent,
} from "./index.elements";

const index = ({ calculations }) => {
  return (
    <Container>
      <CalculationContainer>
        <CalculationWrapper>
          <CalculationHeader>Total Income</CalculationHeader>
          <CalculationContent>
            £{calculations.data.totalIncome}
          </CalculationContent>
        </CalculationWrapper>

        <CalculationWrapper>
          <CalculationHeader>Total Profit</CalculationHeader>
          <CalculationContent>£{calculations.data.profit}</CalculationContent>
        </CalculationWrapper>

        <CalculationWrapper>
          <CalculationHeader>Class 2 Tax</CalculationHeader>
          <CalculationContent>£{calculations.data.class2}</CalculationContent>
        </CalculationWrapper>

        <CalculationWrapper>
          <CalculationHeader>Class 4 Tax</CalculationHeader>
          <CalculationContent>£{calculations.data.class4}</CalculationContent>
        </CalculationWrapper>

        <CalculationWrapper>
          <CalculationHeader>Income Tax</CalculationHeader>
          <CalculationContent>
            £{calculations.data.incomeTax}
          </CalculationContent>
        </CalculationWrapper>
      </CalculationContainer>

      <TotalContainer>
        <TotalWrapper>
          <TotalHeader>Total Tax Return</TotalHeader>
          <TotalContent>£{calculations.data.totalTax}</TotalContent>
        </TotalWrapper>
      </TotalContainer>
    </Container>
  );
};

export default index;
