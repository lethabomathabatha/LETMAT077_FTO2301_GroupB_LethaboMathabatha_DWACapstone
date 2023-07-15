import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search"
// import * as Mui from "@mui/material";
import '/src/pages/HomeStyles.css'
import Genres from "./Genres";
import LatestEps from "./LatestEps";
import { CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";

export default function Home() {
  const [display, setDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // get all shows
  useEffect(() => {
    setIsLoading(true);
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((data) => {

        // fetch first 10 shows
        const firstTenShows = data.slice(0, 10);
        setDisplay(firstTenShows);

        setIsLoading(false);

        
      });


  }, []);

  

  return (
    <div>
        <nav className="home--navigation">
            <p className="home--title">Hello! Welcome to Pods App</p>
            <TextField
              className="home--search"
              
              color="secondary"
              
              placeholder="Search"
              size="small"

              InputProps={{ 
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />

                  </InputAdornment>
                ),
              }}
            />
        </nav>

        <div className="home--top-ten">
            <aside className="home--top-title">Top 10 Picks</aside>

            {isLoading ? (
                <div className="loading">
                <CircularProgress color="secondary" /> 
                </div>
            ) : (
            <>
            <div className="home--display-top">
            {display.map((data) => {
            return (
                <div key={data.id} className="home--card">
                    <img
                        src={data.image}
                        className="home--card-image"
                        alt="podcast-image"
                    />
                    <h2 className="home--card-label">{data.title}</h2>
                    {/* <h2 className="home--card-genres"> <strong>Genres</strong> {data.genres}</h2> */}
                    
                </div>
            );
            })}
            </div>
            </>
            )}
        </div>

            {/* genres */}
        <Genres />    
        <LatestEps />  
    </div>
  );
}

