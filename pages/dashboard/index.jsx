import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import RequestRow from "../../components/RequestRow";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { parse, format, parseISO } from "date-fns";
import Spinner from "../../components/Spinner";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding-top: 31px;
`;

export const RequestContainer = styled.div``;

export const SortHeader = styled.div`
  max-width: 1240px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 26px;
  margin-bottom: 40px;
`;

export const SortByStatus = styled.div`
  position: relative;
  width: 134px;
  height: 47px;
  display: flex;
  align-items: center;
  gap: 13px;
  justify-content: center;
  background: #ffffff;

  cursor: pointer;

  &:hover {
    box-shadow: 0px 4px 25px rgba(214, 214, 214, 0.3);
  }
`;

export const SortItemContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 200px;
  height: 200px;
  display: ${({ showSortItem }) => (showSortItem ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0px 4px 25px rgba(214, 214, 214, 0.3);
`;

export const SortText = styled.h4`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #9191a8;
`;

export const SortItem = styled.button`
  width: 120px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #9191a8;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  padding: 10px;
  text-align: left;
  border-radius: 10px;

  &:hover {
    background: #f2f2f2;
  }

  ${(props) =>
    props.isActive &&
    `
  background: #6a6ecc;
  color: #fff;
`}
`;

export const SortByStatusIcon = styled.img``;

export const SortByDate = styled.div`
  position: relative;
  cursor: pointer;
`;

export const SortByDateIcon = styled.img`
  padding: 10px;
  border-radius: 10px;

  &:hover {
    box-shadow: 0px 4px 25px rgba(214, 214, 214, 0.3);
  }
`;

export const DatePicker = styled(DateRange)`
  position: absolute;
  right: 0px;
  display: ${({ showCalendar }) => (showCalendar ? "block" : "none")};
  z-index: 100;
  box-shadow: 0px 4px 25px rgba(214, 214, 214, 0.3);
`;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSortItem, setShowSortItem] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: null,
      key: "selection",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const token = document.cookie
        ? document.cookie
            .split(";")
            .find((row) => row.trim().startsWith("token="))
            .split("=")[1]
        : "";

      if (token) {
        try {
          setIsLoading(true);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-tax-applications`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await res.json();
          setIsLoading(false);

          if (data.success === false || data.data.length === 0) {
            setError("No Application found");
          } else {
            setData(data.data);
          }
        } catch (err) {
          console.log("err:", err);
          setError("An error occurred while fetching data");
        }
      } else {
        window.location.href = "/";
        return;
      }
    };

    fetchData();
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
    setError("");
  };

  const handleSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  const start = state[0].startDate.toISOString();
  const formattedStartDate = format(new Date(start), "yyyy-MM-dd");

  const end = state[0].endDate ? state[0].endDate?.toISOString() : new Date();
  const formattedEndDate = format(new Date(end), "yyyy-MM-dd");

  const filteredData = data.filter(
    (request) =>
      (request.firstName.toLowerCase().includes(filter.toLowerCase()) ||
        request.lastName.toLowerCase().includes(filter.toLowerCase()) ||
        request.applicationStatus
          .toLowerCase()
          .includes(filter.toLowerCase())) &&
      (formattedStartDate === "" ||
        new Date(format(parseISO(request.dateSubmitted), "yyyy-MM-dd")) >=
          new Date(formattedStartDate)) &&
      (formattedEndDate === "" ||
        new Date(format(parseISO(request.dateSubmitted), "yyyy-MM-dd")) <=
          new Date(formattedEndDate))
  );

  const sortedData =
    sortOrder === "asc"
      ? filteredData.sort((a, b) => a.dateSubmitted - b.dateSubmitted)
      : filteredData.sort((a, b) => b.dateSubmitted - a.dateSubmitted);

  const handleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleSortSelect = () => {
    setShowSortItem(!showSortItem);
  };

  return (
    <Container>
      <Header />
      <SortHeader>
        <SortByStatus onClick={handleSortSelect}>
          <SortByStatusIcon src="/images/sort-by-status-icon.svg" />
          <SortText>Filter By</SortText>

          <SortItemContainer showSortItem={showSortItem}>
            <SortItem value="" onClick={handleFilter} isActive={filter === ""}>
              All
            </SortItem>
            <SortItem
              value="pending"
              onClick={handleFilter}
              isActive={filter === "pending"}
            >
              Pending
            </SortItem>
            <SortItem
              value="in review"
              onClick={handleFilter}
              isActive={filter === "in review"}
            >
              In Review
            </SortItem>
            <SortItem
              value="submitting"
              onClick={handleFilter}
              isActive={filter === "submitting"}
            >
              Submitting
            </SortItem>
            <SortItem
              value="submitted"
              onClick={handleFilter}
              isActive={filter === "submitted"}
            >
              Submitted
            </SortItem>
          </SortItemContainer>
        </SortByStatus>

        <SortByDate>
          <SortByDateIcon
            src="/images/sort-by-date-icon.svg"
            onClick={handleCalendar}
          />
          <DatePicker
            editableDateInputs={false}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            rangeColors={["#6a6ecc"]}
            showDateDisplay={false}
            showCalendar={showCalendar}
          />
        </SortByDate>
      </SortHeader>

      <RequestContainer>
        {isLoading && <Spinner />}

        {!error &&
          filteredData &&
          !isLoading &&
          filteredData.map((request) => (
            <RequestRow key={request.formId} request={request} />
          ))}
        {error && <h1>{error}</h1>}
      </RequestContainer>
    </Container>
  );
};

export default Dashboard;
