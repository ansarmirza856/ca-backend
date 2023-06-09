import React from "react";

import { Container, InputContainer, Input, JobNumber } from "./index.elements";
const index = ({ employment }) => {
  if (employment.se) {
    return (
      <Container>
        <JobNumber>Self Employment: {employment.se}</JobNumber>
        <InputContainer>
          <Input placeholder={`Name: ${employment.name}`} disabled />
          <Input placeholder={`Income: ${employment.income}`} disabled />
        </InputContainer>
        <InputContainer>
          <Input
            placeholder={`Any Government Grants: ${employment.grants}`}
            disabled
          />
          <Input placeholder={`Fuel: ${employment.fuel}`} disabled />
        </InputContainer>
        <InputContainer>
          <Input
            placeholder={`Repair & Maintenance: ${employment.repair}`}
            disabled
          />
          <Input placeholder={`MOT: ${employment.mot}`} disabled />
        </InputContainer>
        <InputContainer>
          <Input placeholder={`Road Tax: ${employment.roadTax}`} disabled />
          <Input placeholder={`Cleaning: ${employment.cleaning}`} disabled />
        </InputContainer>
        <InputContainer>
          <Input
            placeholder={`Agency Commission: ${employment.agencyCommission}`}
            disabled
          />
          <Input
            placeholder={`Licensing Cost: ${employment.licensingCost}`}
            disabled
          />
        </InputContainer>
        <InputContainer>
          <Input placeholder={`Telephone: ${employment.telephone}`} disabled />
          <Input placeholder={`Insurance: ${employment.insurance}`} disabled />
        </InputContainer>
        <InputContainer>
          <Input
            placeholder={`Breakdown Assistance: ${employment.breakdownAssistance}`}
            disabled
          />
          <Input
            placeholder={`Interests On Business Loan: ${employment.iobl}`}
            disabled
          />
        </InputContainer>
        <InputContainer>
          <Input
            placeholder={`Any Other Expenses: ${employment.other}`}
            disabled
          />
          <Input
            placeholder={`Accountancy: ${employment.accountacy}`}
            disabled
          />
        </InputContainer>
        <Input
          placeholder={`Total Expense: ${employment.accountancy}`}
          disabled
        />
      </Container>
    );
  } else if (employment.pe) {
    return (
      <Container>
        <JobNumber>Personal Employment: {employment.pe}</JobNumber>
        <InputContainer>
          <Input
            placeholder={`Total Income: ${employment.totalIncome}`}
            disabled
          />
          <Input
            placeholder={`Tax Deducted: ${employment.totalTaxDeducted}`}
            disabled
          />
        </InputContainer>
      </Container>
    );
  } else if (employment.aoi) {
    return (
      <Container>
        <JobNumber>Any Other Employment: {employment.aoi}</JobNumber>

        <InputContainer>
          <Input placeholder={`Name: ${employment.name}`} disabled />
          <Input
            placeholder={`Type of Work: ${employment.typeOfWork}`}
            disabled
          />
        </InputContainer>

        <InputContainer>
          <Input placeholder={`Total Income: ${employment.income}`} disabled />
          <Input
            placeholder={`Tax Deducted: ${employment.taxDeducted}`}
            disabled
          />
        </InputContainer>
      </Container>
    );
  } else if (employment.pi) {
    return (
      <Container>
        <InputContainer>
          <Input placeholder={`First Name: ${employment.firstName}`} disabled />
          <Input placeholder={`Last Name: ${employment.lastName}`} disabled />
        </InputContainer>
        <InputContainer>
          <Input placeholder={`Sur Name: ${employment.surName}`} disabled />
          <Input
            placeholder={`Date of Birth: ${employment.dateOfBirth}`}
            disabled
          />
        </InputContainer>
        <InputContainer>
          <Input placeholder={`UTR Number: ${employment.uTrNumber}`} disabled />
          <Input placeholder={`NI Number: ${employment.nInumber}`} disabled />
        </InputContainer>
        <InputContainer>
          <Input
            placeholder={`Current Address Line 1: ${employment.currentAddress?.addressLine1}`}
            disabled
          />
          <Input
            placeholder={`Current Address Line 2: ${employment.currentAddress?.addressLine2}`}
            disabled
          />
        </InputContainer>

        <InputContainer>
          <Input
            placeholder={`Town: ${employment.currentAddress?.town}`}
            disabled
          />
          <Input
            placeholder={`Post Code: ${employment.currentAddress?.postCode}`}
            disabled
          />
        </InputContainer>

        <InputContainer>
          <Input
            placeholder={`County: ${employment.previousAddress?.county}`}
            disabled
          />
        </InputContainer>

        {employment.previousAddress && (
          <>
            <InputContainer>
              <Input
                placeholder={`Previous Address Line 1: ${employment.previousAddress?.addressLine1}`}
                disabled
              />
              <Input
                placeholder={`Previous Address Line 2: ${employment.previousAddress?.addressLine2}`}
                disabled
              />
            </InputContainer>

            <InputContainer>
              <Input
                placeholder={`Previous Address Town: ${employment.previousAddress?.town}`}
                disabled
              />
              <Input
                placeholder={`Previous Address Post Code: ${employment.previousAddress?.postCode}`}
                disabled
              />
            </InputContainer>
          </>
        )}
        <InputContainer>
          <Input
            placeholder={`Previous Address County: ${employment.previousAddress?.county}`}
            disabled
          />
          <Input
            placeholder={`Living in current address for more than 3 years?: ${employment.longCurrentResidency}`}
            disabled
          />
        </InputContainer>
      </Container>
    );
  }
};

export default index;
