import { useCallback, useState } from "react";
import styled from "styled-components";
import { SearchBarProps } from "../../type";

const SearchDiv = styled.div`
  display: flex;
  width: 80vw;
  max-width: 400px;
  margin: 100px auto;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 30px;
  box-sizing: border-box;
`;

const SearchButton = styled.button`
  width: 20%;
  height: 30px;
  border: 0px;
  border-radius: 5px;
  background-color: #d0efff;
  &:hover {
    cursor: pointer;
    background-color: #006ee6;
    color: #ffffff;
  }
`;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchClick = useCallback(() => {
    onSearch(searchQuery);
  }, [onSearch, searchQuery]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onSearch(searchQuery);
      }
    },
    [onSearch, searchQuery]
  );

  return (
    <SearchDiv>
      <SearchInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchButton onClick={handleSearchClick}>검색</SearchButton>
    </SearchDiv>
  );
};

export default SearchBar;
