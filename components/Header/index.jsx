import React, { useState } from "react";

import { format, parseISO } from "date-fns";

import {
  Container,
  LogoContainer,
  Logo,
  SearchContainer,
  SearchInput,
  SearchIconCont,
  SearchIcon,
  NavContainer,
  NavItem,
  NavImg,
  NavText,
  SearchResultsContainer,
  SearchResultBody,
  SearchResultItem,
  SearchedItem,
  DateCreated,
  SearchedEmail,
  SearchResultItemHeader,
} from "./index.elements";

const index = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchQuery = (e) => {
    if (e.target.value === "") {
      setSearchQuery("");
      setSearchResults((prev) => []);
      return;
    }
    setSearchQuery(e.target.value);
    handleSearch();
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?q=${searchQuery}`
      );
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <LogoContainer href={process.env.NEXT_PUBLIC_API_BASE_URL + "/dashboard"}>
        <Logo src="/images/logo.svg" />
      </LogoContainer>

      <SearchContainer>
        <SearchInput
          placeholder="Search"
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e)}
        />
        <SearchIconCont>
          <SearchIcon src="/images/search-icon.svg" onClick={handleSearch} />
        </SearchIconCont>

        <SearchResultsContainer
          searchQuery={searchResults.length > 0 ? true : false}
        >
          <SearchResultItemHeader>
            <>
              <SearchedItem>Form ID</SearchedItem>
              <SearchedEmail>Email</SearchedEmail>
              <DateCreated>Submission Date</DateCreated>
            </>
          </SearchResultItemHeader>

          <SearchResultBody>
            {searchResults &&
              searchResults.map((result) => (
                <SearchResultItem
                  key={result._id}
                  href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/${result.formId}`}
                >
                  <>
                    <SearchedItem>{result.formId}</SearchedItem>
                    <SearchedEmail>{result.userEmail}</SearchedEmail>
                    <DateCreated>
                      {format(
                        result.dateSubmitted && parseISO(result.dateSubmitted),
                        "dd MMMM yyyy"
                      )}
                    </DateCreated>
                  </>
                </SearchResultItem>
              ))}
          </SearchResultBody>
        </SearchResultsContainer>
      </SearchContainer>

      <NavContainer>
        <NavItem>
          <NavImg src="/images/nav-item-users.svg" />
          <NavText>Users</NavText>
        </NavItem>

        <NavItem>
          <NavImg src="/images/nav-item-invoices.svg" />
          <NavText>Invoices</NavText>
        </NavItem>

        <NavItem>
          <NavImg src="/images/nav-item-email.svg" />
          <NavText>Email</NavText>
        </NavItem>

        <NavItem>
          <NavImg src="/images/nav-item-settings.svg" />
          <NavText>Settings</NavText>
        </NavItem>
      </NavContainer>
    </Container>
  );
};

export default index;

158;
440.28;
278.4;
