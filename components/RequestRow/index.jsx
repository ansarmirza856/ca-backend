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
} from "./index.elements";

const index = ({ request }) => {
  let {
    formId,
    applicationStatus,
    dateSubmitted,
    taxType,
    firstName,
    lastName,
  } = request;
  dateSubmitted = dateSubmitted ?? "2021-05-01T00:00:00.000Z";
  const formattedDate = format(parseISO(dateSubmitted), "dd MMMM yyyy");
  return (
    <div>
      <Container>
        <User src="/images/user-img-default.png" />
        <TaxInfo>
          <FilerName>{`${firstName} ${lastName}`}</FilerName>
          <RequestId>{formId}</RequestId>
        </TaxInfo>
        <TaxType>Self employed, Business, Security job</TaxType>
        <TaxStatus>
          <Status Status={applicationStatus}>{applicationStatus}</Status>
        </TaxStatus>
        <Date>{formattedDate}</Date>
        <Action href={`dashboard/${formId}`}>
          <ViewIcon src="/images/view-button-icon.svg" />
          View
        </Action>
      </Container>
    </div>
  );
};

export default index;
