import { useEffect, useState } from "react";

import '/src/pages/SearchStyles.css'
import '/src/pages/HomeStyles.css'

import BottomNav from "../components/BottomNav"

import TextField from "@mui/material/TextField"
import { CircularProgress } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import Fuse from "fuse.js"

export default function Search() {
    const [shows, setShows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // const [displayedGenres, setDisplayedGenres] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
  
    useEffect(() => {
      
      fetch('https://podcast-api.netlify.app/shows')
        .then((res) => res.json())
        .then((data) => {
            setShows(data);
            setIsLoading(false)
        })
        .catch((error) => console.log(error))
    }, []);


    // get the names of the genres from https://podcast-api.netlify.app/id/{show.id}
   

    // Fetch the genres:
    // useEffect(() => {
    //     fetch("https://podcast-api.netlify.app/shows")
    //       .then((res) => res.json())
    //       .then((data) => {
    //         const getAllGenres = data.map((show) =>
    //           fetch(`https://podcast-api.netlify.app/id/${show.id}`)
    //             .then((res) => res.json())
    //             .then((showData) => {
    //               show.genres = showData.genres;
    //               return show;
    //             })
    //         );
    
    //         Promise.all(getAllGenres)
    //           .then((shows) => setDisplayedGenres(shows))
    //           .catch((error) => console.log(error));
    //       });
    //   }, []);

    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);

    };

    const handleSearch = () => {
      setIsLoading(true)
      const fuse = new Fuse(shows, {
        keys: [
            'title', 'id', 'description', 'updated', 'genres', 'seasons'],
      });
  
      const searchResults = fuse.search(searchTerm);
      setSearchResults(searchResults);
      console.log(searchResults);
      setIsLoading(false)
    };
  
    const displayOverlay = (podcast) => {
        
        console.log(podcast);
    }
    

    return (
      <div className="search--page">
        
        <header className="search--header">
            <img src="./public/podcast-bg.png" alt="podcast-background" width={"100%"} className="search--header-image"/>
            <p className="search--header-title">Search For The Next <strong>Best Podcast</strong> You`ve Ever Heard</p>

            <TextField
                className="search--field"
                color="secondary"
                placeholder="Search"
                size="small"
                value={searchTerm}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: 
                    <SearchIcon 
                        onClick={handleSearch}
                    />
                }}
            />
        </header>
  
        {isLoading ? (
                <div className="loading">
                <CircularProgress color="secondary" /> 
                </div>
            ) : (
            <>     
        {searchResults.length > 0 && (
            
          <div className="search--results">
              {searchResults.map((result) => (
                
                <div key={result.item.id} className="search--results-cards" onClick={displayOverlay}>
                   <img src={result.item.image} alt="podcast-image" className="search--results-image"/>
                        
                    <div className="search--results-text">
                        <span className="search--results-title">{result.item.title.replace(/&amp;/g, " & ")}</span>
                        <span className="search--results-date-genres">Updated {new Date(result.item.updated).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}  | Genre: {result.item.genres.map((genre) => genre.name).join(", ")}
                        </span>
                        
                        <p className="search--results-description">{result.item.description} </p>
                    </div>

                </div>     
              ))}
            </div>
        )}
        </>
        )}
        
  
        <BottomNav />
      </div>
      
    );
  }