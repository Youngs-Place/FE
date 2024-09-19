import { useState } from "react";

const Search = () => {
    // @ts-ignore
    const [searchInput, setSearchInput] = useState('');

    const handleRefreshPage = () => {

    };
    const handleSearchClick = () => {

    };

    return <div className="searchBox">
    <div className="searchLeft" onClick={handleRefreshPage}>
      <img src="src/images/logo.png" alt="user icon" className="searchLogoIcon" />
      <span className="searchText">청년여기</span>
    </div>
    <div className="searchRight">
      <input
        type="text"
        // value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="주소를 입력해주세요"
      />
      <button onClick={handleSearchClick} className="searchButton">
        <img src="src/images/magnifier.png" alt="search icon" className="searchButtonIcon" />
      </button>
    </div>
  </div>
}

export default Search;