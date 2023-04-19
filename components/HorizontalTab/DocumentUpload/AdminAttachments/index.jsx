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
  const [loadingButton, setLoadingButton] = useState(null);
  const handleDownload = async (key, name) => {
    try {
      setIsLoading(true);
      setLoadingButton(key);
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
      setLoadingButton(null);
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
      <SectionTitle>Tax Return Documents</SectionTitle>
      <DocumentContainer>
        {data &&
          data.data?.deliveryFiles.length > 0 &&
          data.data.deliveryFiles.map((file) => (
            <Document>
              <DocumentName>{file.name}</DocumentName>
              <DownloadButton
                key={file.key}
                name={file.name}
                onClick={() => handleDownload(file.key, file.name)}
              >
                {isLoading && loadingButton === file.key ? (
                  <img src="/images/spinner.svg" alt="spinner" width="20px" />
                ) : (
                  "Download"
                )}
              </DownloadButton>
            </Document>
          ))}
      </DocumentContainer>
    </Container>
  );
};

export default index;
