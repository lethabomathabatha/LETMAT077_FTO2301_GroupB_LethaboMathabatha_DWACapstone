import { useEffect, useState } from "react";

import '/src/pages/SearchStyles.css'
import '/src/pages/HomeStyles.css'

import BottomNav from "../components/BottomNav"

import TextField from "@mui/material/TextField"
// import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from "@mui/icons-material/Search"
import Fuse from "fuse.js"

export default function Search() {
    const [shows, setShows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    useEffect(() => {
      fetch('https://podcast-api.netlify.app/shows')
        .then((res) => res.json())
        .then((data) => setShows(data))
        .catch((error) => console.log(error));
    }, []);
  
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSearch = () => {
      const fuse = new Fuse(shows, {
        keys: ['title', 'author', 'genres'],
      });
  
      const searchResults = fuse.search(searchTerm);
      setSearchResults(searchResults);
    };
  
    return (
      <div className="search--page">
        <p className="search--header">
          Search For The Next <strong>Best Podcast</strong> You've Ever Heard
        </p>
  
        <div className="search--input">
          <TextField
            className="home--search-field"
            color="secondary"
            placeholder="Search"
            size="medium"
            variant="standard"
            value={searchTerm}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <SearchIcon 
              onClick={handleSearch}
              />,
            }}
          />
          
        </div>
  
        {searchResults.length > 0 && (
          <div className="search--results">
            <h3>Search Results:</h3>
            <ul>
              {searchResults.map((result) => (
                <li key={result.item.id}>{result.item.title}</li>
              ))}
            </ul>
          </div>
        )}
  
        <BottomNav />
      </div>
    );
  }