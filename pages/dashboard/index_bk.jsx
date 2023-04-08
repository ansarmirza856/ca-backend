import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import RequestRow from "../../components/RequestRow";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding-top: 31px;
`;

export const RequestContainer = styled.div``;

const Dashboard = ({ data, error }) => {
  const router = useRouter();

  return (
    <Container>
      <Header />

      <RequestContainer>
        {/* <RequestHeader>
          <TaxNameHeading>Full Name</TaxNameHeading>
          <TaxFileHeading>Tax File For</TaxFileHeading>
          <TaxStatusHeading>Tax Return Status</TaxStatusHeading>
          <DateHeading>Date</DateHeading>
        </RequestHeader> */}

        {!error &&
          data &&
          data.data.map((request) => (
            <>
              <RequestRow key={request.id} request={request} />
            </>
          ))}
        <h1>{error}</h1>
      </RequestContainer>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = req.cookies.token;

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { isAdmin, exp } = decoded;

    if (!isAdmin || exp < Date.now() / 1000) {
      res.writeHead(302, { Location: "/" });
      res.end();
      return { props: {} };
    }
  } else {
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }

  try {
    // Fetch data for the page
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-tax-applications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    if (data.success === false) {
      const error = "No Form regisered yet";
      const data = [];
      return { props: { data, error } };
    }

    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.log("err:", err);
    return { props: {} };
  }
}

export default Dashboard;
