import React, { useEffect, useState } from "react";
import Collapsible from "../Collapsible";
import TaxReturnFooter from "../TaxReturnFooter";
import DocumentUpload from "./DocumentUpload";

import { Container, TabHeader, Tab, TabContent } from "./index.elements";

const tabs = [
  { id: 1, label: "Personal Information", disabled: false },
  { id: 2, label: "Tax Return", disabled: false },
  { id: 3, label: "Documents", disabled: true },
  { id: 4, label: "Delivery", disabled: true },
];

const collapsibles = [
  { title: "Self Employment" },
  { title: "Personal Employment" },
  { title: "Any other Employment" },
];

const index = ({ data }) => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (data && data.data?.applicationStatus !== "pending") {
      tabs[2].disabled = false;
    }

    if (data && data.data?.ApprovedByUser) {
      tabs[3].disabled = false;
    }
  }, []);

  const handleClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <Container>
      <TabHeader>
        {tabs.map((tab, index) => (
          <>
            <Tab
              key={tab.id}
              className={`${activeTab === index + 1 ? "active" : ""} ${
                tab.disabled ? "disabled" : ""
              }`}
              onClick={() => handleClick(index + 1)}
            >
              {tab.label}
            </Tab>
          </>
        ))}
      </TabHeader>
      <TabContent>
        {activeTab === 1 && (
          <>
            <Collapsible
              title="Personal Information"
              slug="PI"
              data={data && data.data.personalInformation}
            ></Collapsible>
          </>
        )}
        {activeTab === 2 && (
          <>
            <Collapsible
              title="Self Employment"
              slug="SE"
              data={data && data.data.selfEmployment}
            />
            <Collapsible
              title="Personal Employment"
              slug="PE"
              data={data && data.data.personalEmployment}
            />
            <Collapsible
              title="Any other Employment"
              slug="AOE"
              data={data && data.data.anyOtherEmployment}
            />

            <TaxReturnFooter calculations={data} />
          </>
        )}

        {activeTab === 3 && <DocumentUpload data={data} />}
        {activeTab === 4 && <h4>Content of Tab 4</h4>}
      </TabContent>
    </Container>
  );
};

export default index;
