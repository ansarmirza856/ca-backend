import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import RequestRow from "../../components/RequestRow";
import jwt from "jsonwebtoken";
import Spinner from "../../components/Spinner";

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

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = document.cookie
        ? document.cookie
            .split(";")
            .find((row) => row.trim().startsWith("token="))
            .split("=")[1]
        : "";

      if (token) {
        try {
          setIsLoading(true);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-tax-applications`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await res.json();
          setIsLoading(false);

          if (data.success === false || data.data.length === 0) {
            setError("No Application found");
          } else {
            setData(data.data);
          }
        } catch (err) {
          console.log("err:", err);
          setError("An error occurred while fetching data");
        }
      } else {
        window.location.href = "/";
        return;
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Header />

      <RequestContainer>
        {isLoading && <Spinner />}

        {!error &&
          data &&
          !isLoading &&
          data.map((request) => (
            <RequestRow key={request.formId} request={request} />
          ))}
        {error && <h1>{error}</h1>}
      </RequestContainer>
    </Container>
  );
};

export default Dashboard;
