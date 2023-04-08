import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  width: 1240px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const User = styled.img``;

export const TaxInfo = styled.div`
  max-width: 290px;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: #ffffff;
  padding: 0 20px;
  border-left: 2px solid #25b6ac;
  box-shadow: 0px 4px 10px rgba(193, 193, 193, 0.2);
`;

export const TaxStatus = styled.div`
  width: 156.91px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(193, 193, 193, 0.2);
`;

export const Date = styled.div`
  width: 162px;
  height: 50px;
  background: #ffffff;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6d6d6d;
  box-shadow: 0px 4px 10px rgba(193, 193, 193, 0.2);
`;

export const Action = styled(Link)`
  width: 200px;
  height: 50px;
  border: none;
  outline: none;
  background: linear-gradient(124.97deg, #595cb7 3.95%, #141766 100%);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.5s ease-in-out;

  &:hover {
    background: linear-gradient(124.97deg, #141766 100%, #595cb7 3.95%);
  }
`;

export const FilerName = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #3d4866;
`;

export const RequestId = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #3d4866;
`;

export const TaxType = styled.div`
  max-width: 300px;
  width: 100%;
  height: 50px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #656565;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(193, 193, 193, 0.2);
`;

export const Status = styled.div`
  width: 141px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #27aba2;
  background: ${({ Status }) =>
    Status === "submitted"
      ? "#19B8AC"
      : Status === "pending"
      ? "#FFE2E3"
      : "#bffffb"};
  color: ${({ Status }) =>
    Status === "submitted"
      ? "#fff"
      : Status === "pending"
      ? "#B82C31"
      : "#27aba2"};
  text-transform: capitalize;
`;

export const ViewIcon = styled.img`
  margin-right: 10px;
`;

export const RequestHeader = styled.div`
  max-width: 1240px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 14px;
`;

export const TaxNameHeading = styled.div`
  width: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

export const TaxFileHeading = styled.div`
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

export const TaxStatusHeading = styled.div`
  width: 290px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

export const DateHeading = styled.div`
  width: 290px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;
