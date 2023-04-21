import React, { useState, useEffect, useRef } from "react";
import UserAttachments from "./UserAttachments";
import AdminAttachments from "./AdminAttachments";
import FinalDeliveryAttachment from "./FinalDeliveryAttachments";
import { useRouter } from "next/router";

import {
  Container,
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
  SuccessMessage,
  ResendButton,
} from "./index.elements";
import { toast } from "react-toastify";

const index = ({ data }) => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const fileInput1Ref = useRef(null);
  const fileInput2Ref = useRef(null);
  const router = useRouter();
  const formId = data.data.formId;

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
      formData.append("action", "delivery-files");
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
      <>
        <UserAttachments data={data} />

        {data && data.data.deliveryFiles.length > 0 ? (
          <AdminAttachments data={data} />
        ) : (
          <>
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

              <SubmitButton type="submit">Send Documents</SubmitButton>
            </UploadForm>
          </>
        )}

        {data &&
          data.data.amendmementRequest.requested === false &&
          data.data.ApprovedByUser === true && (
            <FinalDeliveryAttachment data={data} />
          )}
      </>
    </Container>
  );
};

export default index;
