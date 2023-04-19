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

export const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 38px;
`;

export const UploadForm = styled.form``;

export const UploadField = styled.div`
  position: relative;
  width: 506px;
  height: 265px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 234, 255, 0.3);
  border: 1px dashed #272486;
  border-radius: 0px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: #6a6ecc;
  }
`;

export const UploadLabel = styled.label`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #272486;
  cursor: pointer;
`;

export const UploadInput = styled.input`
  display: none;
`;

export const RemoveFileButton = styled.button`
  position: absolute;
  width: calc(100% + 2px);
  height: 50px;
  bottom: -1px;
  left: -1px;
  background: #272486;
  color: #fff;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;

  transition: all 0.3s ease-in-out;

  &:hover {
    background: #6a6ecc;
  }
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const FileImage = styled.img``;

export const FileName = styled.span`
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: #8a94a6;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 60px;
  background: #272486;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #faf9ff;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #6a6ecc;
  }
`;

export const SuccessMessage = styled.div`
  width: 100%;
  height: 265px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #525252;
  pointer-events: none;
`;

export const ResendButton = styled.button`
  width: 100%;
  height: 60px;
  background: #272486;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #faf9ff;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #6a6ecc;
  }
`;
