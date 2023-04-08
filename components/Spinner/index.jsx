import React from "react";
import styled from "styled-components";
import Image from "next/image";

const Container = styled.div`
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled(Image)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const index = () => {
  return (
    <Container>
      <Img
        src="/images/spinner.png"
        width={80}
        height={80}
        alt="loading spinner"
      />
    </Container>
  );
};

export default index;
