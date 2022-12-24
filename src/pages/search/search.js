import { useState } from "react";
import { useEffect } from "react";
import "./search.css";

function Search() {

  let [searchResults, setSearchResults] = useState("");
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    if (searchValue) 
    {
      // TODO: Add error handling.
      fetch(`https://kitsu.io/api/edge/anime?filter[text]=${searchValue}`)
      .then((response) => response.json())
      .then((data) =>  setSearchResults(JSON.stringify(data)));
    }
  }, [searchValue])

  return (
    <>
      <br></br>
      <label>Search Anime: </label>
      <input type="text" id="searchInput" />
      <button type="submit" onClick={() => setSearchValue(document.getElementById("searchInput").value)}>Search</button>
      <p>{searchResults}</p>
    </>
  );
};

export default Search;
