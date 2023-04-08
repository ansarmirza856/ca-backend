import React, { useEffect, useState } from "react";
import FormInput from "../HorizontalTab/FormInput";

import {
  Container,
  Content,
  EmploymentContainer,
  EmploymentHeader,
  EmploymentNumbers,
  ToggleButton,
  EmploymentInfo,
  Employmentwrapper,
} from "./index.elements";

const index = ({ title, slug, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleCollapse() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (slug === "PI" && data.length > 0) {
      setIsOpen(true);
    }
  }, []);

  return (
    <Container>
      <EmploymentContainer isOpen={isOpen}>
        <Employmentwrapper>
          <EmploymentInfo>
            <EmploymentHeader>{title}</EmploymentHeader>
            <EmploymentNumbers>
              {slug !== "PI" && `No of ${slug} - ${data.length || 0}`}
            </EmploymentNumbers>
          </EmploymentInfo>

          {slug !== "PI" && (
            <ToggleButton onClick={toggleCollapse} isOpen={isOpen}>
              {isOpen ? "Close" : "View"}
            </ToggleButton>
          )}
        </Employmentwrapper>
        <Content isOpen={isOpen}>
          {data &&
            data.map((employment, index) => (
              <FormInput key={employment._id} employment={employment} />
            ))}
        </Content>
      </EmploymentContainer>
    </Container>
  );
};

export default index;
