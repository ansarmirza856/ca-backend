import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import RequestRow from "../../components/RequestRow";
import HorizontalTab from "../../components/HorizontalTab";
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

const Request = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { request } = router.query;

  useEffect(() => {
    const getApplication = async () => {
      const token = document.cookie
        ? document.cookie
            .split(";")
            .find((row) => row.trim().startsWith("token="))
            .split("=")[1]
        : "";

      if (!token) {
        router.push("/");
      }

      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-single-application?id=${request}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setIsLoading(false);
        if (data.success === false) {
          setError("No Application found");
        }

        setData(data);
      } catch (err) {
        console.log("err:", err);
        setError("An error occurred while fetching data");
      }
    };

    getApplication();
  }, [request]);

  return (
    <Container>
      <Header />

      {isLoading && <Spinner />}

      {error && <h1>{error}</h1>}

      {data && !error && !isLoading && (
        <>
          <RequestRow request={data.data} />
          <HorizontalTab data={data} />
        </>
      )}
    </Container>
  );
};

export default Request;
