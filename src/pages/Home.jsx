import { useEffect, useState } from "react";

// import * as Mui from "@mui/material";
import '/src/pages/HomeStyles.css'
import Genres from "./Genres";
import LatestEps from "./LatestEps";
import { CircularProgress } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import Box from "@mui/material/Box";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import BottomNav from '../components/BottomNav'

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

  // greeting based on the time of day
  // let user = JSON.parse(localStorage.getItem("user"));
  let user = "Lethabo"
  const time = new Date().getHours();
  // if it's before 12pm, it's morning, if it's after 12pm but before 6pm, it's afternoon, if it's after 6pm but before 3am, it's evening
  let greeting = "";
  if (time >= 3 && time < 12) {
    greeting = `Good Morning, ${user} `;
  } else if (time >= 12 && time < 18) {
    greeting = `Good Afternoon, ${user} `;
  } else if (time >= 18 && time < 24) {
    greeting = `Good Evening, ${user} `;
  } else {
    greeting = `Good Night, ${user} `;
  }

  

  return (
    <div>
        <nav className="home--navigation">
          <img src="../pods-logo-light.png" width="70px" className="home--logo"/>
            <p className="home--title">{greeting} 
              <WbSunnyOutlinedIcon 
                style={{fontSize: 15}}
              />
            </p>
            {/* <TextField
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
            /> */}
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

        <BottomNav />
    </div>
  );
}

