import React, { useState } from "react";

import {
  Container,
  DocumentContainer,
  SectionTitle,
  Document,
  DocumentName,
  DownloadButton,
} from "./index.elements";

const index = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownload = async (key, name) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cloud-storage-download?key=${key}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to download file: ${response.status} ${response.statusText}`
        );
      }

      const contentDisposition = response.headers.get("Content-Disposition");
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : name;

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      setIsLoading(false);
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the download
    }
  };

  return (
    <Container>
      <SectionTitle>User Attached Documents</SectionTitle>
      <DocumentContainer>
        {data &&
          data.data?.userAttachedFiles.length > 0 &&
          data.data?.userAttachedFiles.map((file) => {
            return (
              <Document key={file.key}>
                <DocumentName>{file.name}</DocumentName>
                <DownloadButton
                  onClick={() => handleDownload(file.key, file.name)}
                >
                  Download
                </DownloadButton>
              </Document>
            );
          })}

        {data && data.data?.userAttachedFiles.length === 0 && (
          <DocumentName>No Documents Attached By User</DocumentName>
        )}
      </DocumentContainer>
    </Container>
  );
};

export default index;
