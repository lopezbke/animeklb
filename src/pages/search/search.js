import { useEffect, useState } from "react";
import "./search.css";
import AnimeRow from "../../sharedComponents/animeRow/animeRow.js";
import BottomNav from "../../sharedComponents/bottomNav/bottomNav";
import jsonToArray from "../../commonFunctions/jsonToArray";
function Search() {
  let [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const searchButtonClick = () => {
    const input = document.getElementById("searchInput").value;
    setSearchValue(input);
    if (!input) {
      alert("A value must be entered in the anime search box to view new results.");
    }
  };

  useEffect(() => {
    if (searchValue) {
      // TODO: Add error handling.
      fetch(`https://kitsu.io/api/edge/anime?filter[text]=${searchValue}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(jsonToArray(data)))
        .catch(error => { console.log(error) });
    } 

  }, [searchValue])

  return (
    <>
      <div className="container">
        <br></br>
        <label>Search Anime: </label>
        <br></br>
        <input type="text" id="searchInput" placeholder="Search for Anime..." />
        <br></br>
        <br></br>
        <button type="submit" onClick={() => searchButtonClick()}>Search</button>
        <ul>
          {searchResults.map((item, index) => {
            return <li key={index}><AnimeRow anime={item} /></li>
          })
          }
        </ul>
      </div>
      <BottomNav />
    </>
  );
};

export default Search;
