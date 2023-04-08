import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  width: 100%;
  padding: 0 40px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 100px;
`;

export const LogoContainer = styled(Link)`
  cursor: pointer;
`;

export const Logo = styled.img``;

export const SearchContainer = styled.div`
  position: relative;
  max-width: 519px;
  width: 100%;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(205, 205, 205, 0.2);
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000;

  &::placeholder {
    color: #cecece;
  }
`;

export const SearchIconCont = styled.button`
  width: 66px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
  background: linear-gradient(124.97deg, #595cb7 3.95%, #141766 100%);
`;

export const SearchIcon = styled.img``;

export const NavContainer = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  // padding: 20px 20px;
  // border-radius: 0 0 10px 10px;
  transition: background 0.2s ease-in-out;

  &:last-child {
    border-left: 1px solid #e4e4e4;
  }

  &:hover {
    // background: #f5f5f5;
    border-bottom: 1px solid #25b6ac;
  }
`;

export const NavImg = styled.img`
  margin-right: 10px;
  width: 24px;
  height: 24px;
`;

export const NavText = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #313864;
`;

export const SearchResultsContainer = styled.div`
  display: ${({ searchQuery }) => (searchQuery ? "block" : "none")};
  position: absolute;
  bottom: -304px;
  left: 0;
  width: 100%;
  height: 300px;
  background: #ffffff;
  padding-bottom: 20px;
  box-shadow: 0px 4px 25px rgba(205, 205, 205, 0.2);
  border: 1px solid #e4e4e4;
  transition: all 1s ease-in-out;
`;

export const SearchResultItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  color: #6d6d6d;
  padding: 5px 10px;
  border-radius: 10px;

  &:hover {
    color: #3d4866;
    background: #f5f5f5;
  }
`;

export const SearchResultItemHeader = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #313864;
  padding: 5px 10px;
  margin-bottom: 14px;
  padding 28px 30px;
  border-bottom: 1px solid #e4e4e4;
`;

export const SearchResultBody = styled.div`
  height: 200px;
  width: 100%;
  background: #ffffff;
  padding 10px 10px;
  overflow-y: scroll;
`;

export const SearchedItem = styled.div``;

export const DateCreated = styled.div``;

export const SearchedEmail = styled.div``;
