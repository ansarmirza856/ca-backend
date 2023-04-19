import React, { useState, useEffect, useRef } from "react";

import {
  Container,
  DocumentContainer,
  SectionTitle,
  Document,
  DocumentName,
  DownloadButton,
  UploadContainer,
  UploadForm,
  UploadField,
  UploadInput,
  UploadLabel,
  RemoveFileButton,
  FileContainer,
  FileImage,
  FileName,
  SubmitButton,
} from "./index.elements";

const index = ({ data }) => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const fileInput1Ref = useRef(null);
  const fileInput2Ref = useRef(null);
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

  const handleFile1Change = (event) => {
    const selectedFile = event.target.files[0];
    setFile1(selectedFile);
  };

  const handleFile2Change = (event) => {
    const selectedFile = event.target.files[0];
    setFile2(selectedFile);
  };

  const handleRemoveFile1 = () => {
    setFile1(null);
  };

  const handleRemoveFile2 = () => {
    setFile2(null);
  };

  useEffect(() => {
    // Add event listeners to the file input elements
    if (fileInput1Ref.current !== null) {
      fileInput1Ref.current.addEventListener("change", handleFile1Change);
    }
    if (fileInput2Ref.current !== null) {
      fileInput2Ref.current.addEventListener("change", handleFile2Change);
    }

    // Clean up the event listeners when the component is unmounted
    return () => {
      if (fileInput1Ref.current !== null) {
        fileInput1Ref.current.removeEventListener("change", handleFile1Change);
      }
      if (fileInput2Ref.current !== null) {
        fileInput2Ref.current.removeEventListener("change", handleFile2Change);
      }
    };
  }, [fileInput1Ref, fileInput2Ref]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!file1 && !file2) {
        console.log("Please select at least one file");
        return;
      }

      if (!formId) {
        console.log("Please select a form");
        return;
      }

      const formData = new FormData();
      if (file1) {
        formData.append("files", file1);
      }
      if (file2) {
        formData.append("files", file2);
      }
      formData.append("formId", formId);
      formData.append("action", "final-delivery-files");
      formData.append("attachment", "multiple");

      const response = await fetch("/api/cloud-storage-upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        router.push("/dashboard");
        toast.success("Files sent successfully");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Container>
      <SectionTitle>Tax Submission Confirmation docs</SectionTitle>
      <DocumentContainer>
        {data &&
          data.data?.finalDeliveryFiles.length > 0 &&
          data.data?.finalDeliveryFiles.map((file) => {
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

        {data && data.data?.finalDeliveryFiles.length === 0 && (
          <UploadForm onSubmit={handleSubmit}>
            <UploadContainer>
              <UploadInput
                ref={fileInput1Ref}
                id="fileInput1"
                type="file"
                accept="image/*,.pdf"
              />
              <UploadInput
                ref={fileInput2Ref}
                id="fileInput2"
                type="file"
                accept="image/*,.pdf"
              />
              <UploadField
                onClick={() => {
                  // Trigger click event on file input element when the div is clicked
                  if (fileInput1Ref.current !== null && file1 === null) {
                    fileInput1Ref.current.click();
                  }
                }}
              >
                <UploadLabel>
                  {file1 ? (
                    <FileContainer>
                      <FileImage src="/images/file-icon.svg" />
                      <FileName>{file1.name}</FileName>
                    </FileContainer>
                  ) : (
                    "+ Upload File"
                  )}
                </UploadLabel>
                {file1 && (
                  <RemoveFileButton onClick={handleRemoveFile1}>
                    Remove File
                  </RemoveFileButton>
                )}
              </UploadField>

              <UploadField
                onClick={() => {
                  // Trigger click event on file input element 2 when the div is clicked
                  if (fileInput2Ref.current !== null && file2 === null) {
                    fileInput2Ref.current.click();
                  }
                }}
              >
                <UploadLabel>
                  {file2 ? (
                    <FileContainer>
                      <FileImage src="/images/file-icon.svg" />
                      <FileName>{file2.name}</FileName>
                    </FileContainer>
                  ) : (
                    "+ Upload File"
                  )}
                </UploadLabel>

                {file2 && (
                  <RemoveFileButton onClick={handleRemoveFile2}>
                    Remove File
                  </RemoveFileButton>
                )}
              </UploadField>
            </UploadContainer>

            <SubmitButton type="submit">Send Submission Proof</SubmitButton>
          </UploadForm>
        )}
      </DocumentContainer>
    </Container>
  );
};

export default index;
