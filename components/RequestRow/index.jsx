import React from "react";

import { format, parseISO } from "date-fns";

import {
  Container,
  User,
  TaxInfo,
  TaxStatus,
  Date,
  Action,
  FilerName,
  RequestId,
  TaxType,
  Status,
  ViewIcon,
  PaymentIntentContainer,
} from "./index.elements";

const index = ({ request, showPaymentStatus }) => {
  let {
    formId,
    applicationStatus,
    dateSubmitted,
    taxType,
    firstName,
    lastName,
    surname,
    ApprovedByUser,
    amendmementRequest,
    paymentIntent,
    paymentStatus,
  } = request || {};
  dateSubmitted = dateSubmitted ?? "2021-05-01T00:00:00.000Z";
  const formattedDate = format(parseISO(dateSubmitted), "dd MMMM yyyy");

  return (
    <div>
      <Container
        style={{
          backgroundColor:
            !ApprovedByUser &&
            amendmementRequest.requested === true &&
            "#FFE7E8",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <User src="/images/user-img-default.png" />
        <TaxInfo>
          <FilerName>{`${firstName} ${surName}`}</FilerName>
          <RequestId>{formId}</RequestId>
        </TaxInfo>
        <TaxType>Self employed, Business, Security job</TaxType>
        <TaxStatus>
          <Status Status={applicationStatus}>{applicationStatus}</Status>
        </TaxStatus>
        <Date>{formattedDate}</Date>

        {showPaymentStatus ? (
          <PaymentIntentContainer>
            <span> Payment Status: </span>
            {paymentIntent ? paymentIntent : paymentStatus}
          </PaymentIntentContainer>
        ) : (
          <Action href={`dashboard/${formId}`}>
            <ViewIcon src="/images/view-button-icon.svg" />
            View
          </Action>
        )}
      </Container>
    </div>
  );
};

export default index;
