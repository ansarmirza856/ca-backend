import React from "react";

import {
  Container,
  DocumentContainer,
  SectionTitle,
  Document,
  DocumentName,
  DownloadButton,
} from "./index.elements";

const index = ({ data }) => {
  return (
    <Container>
      <SectionTitle>User Attached Documents</SectionTitle>
      <DocumentContainer>
        {data &&
          data.data?.userAttachedFiles.length > 0 &&
          data.data?.userAttachedFiles.map((doc) => {
            return (
              <Document key={doc.key}>
                <DocumentName>{doc.name}</DocumentName>
                <DownloadButton>Download</DownloadButton>
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
