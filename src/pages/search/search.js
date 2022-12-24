import { useEffect, useState } from "react";
import "./search.css";

function Search() {

  const jsonToArray = (json) => {
    const arrayToReturn = [];
    Object.keys(json.data).forEach(key => {
      arrayToReturn.push(json.data[key]);
    });
    console.log(arrayToReturn);
    return arrayToReturn;
  };
  let [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    if (searchValue) {
      // TODO: Add error handling.
      fetch(`https://kitsu.io/api/edge/anime?filter[text]=${searchValue}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(jsonToArray(data)))
        .catch(error => { console.log(error) });
    } else {
      alert("A value must be entered in the anime search box to view new results.");
    }
  }, [searchValue])

  return (
    <>
      <br></br>
      <label>Search Anime: </label>
      <input type="text" id="searchInput" />
      <button type="submit" onClick={() => setSearchValue(document.getElementById("searchInput").value)}>Search</button>
      <ul>
        {searchResults.map((item, index) => {
          return <li key={index}>
            <div>
              <img src={item.attributes.posterImage.tiny} alt={item.attributes.slug} />
              <span>{item.attributes.slug}</span>
            </div>
          </li>
        })
        }
      </ul>
    </>
  );
};

export default Search;
