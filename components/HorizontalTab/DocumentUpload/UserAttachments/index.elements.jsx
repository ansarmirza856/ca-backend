import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const DocumentContainer = styled.div``;

export const SectionTitle = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 29px;
  color: #4e5d78;
  margin-bottom: 20px;
`;

export const Document = styled.div`
  width: 100%;
  height: 64px;
  background: #faf9ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  margin-bottom: 10px;
`;

export const DocumentName = styled.div``;

export const DownloadButton = styled.div`
  width: 120.87px;
  height: 36.46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #272486;
  border-radius: 0px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #faf9ff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #6a6ecc;
  }
`;
