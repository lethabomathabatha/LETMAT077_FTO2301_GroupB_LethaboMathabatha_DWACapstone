import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search"
// import * as Mui from "@mui/material";
import '/src/pages/HomeStyles.css'
import LatestEps from "./LatestEps";
import { CircularProgress } from "@mui/material";


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
        // const firstTenShows = data.slice(0, 10);

        // Fetch genre names using each show's id
        const getGenres = data.map((show) =>
          fetch(`https://podcast-api.netlify.app/id/${show.id}`)
            .then((res) => res.json())
            .then((showData) => {
              show.genres = showData.genres; 
              return show;
            })
        );

        Promise.all(getGenres)
          .then((shows) => setDisplay(shows))
          .catch((error) => console.log(error))
          .finally(() => setIsLoading(false));
      });


  }, []);

  

  return (
    <div>
        <nav className="home--title">
            <p>Hello! Welcome to Pods App</p>
            <SearchIcon />
        </nav>

        <div className="home--top-ten">
            <aside className="home--top-title">Our Top Picks</aside>

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
        <div className="home--genres">
            <h3 className="home--genres-title">Genres</h3>
           
            {/* {display.map((data) => {
            return (
                <div key={data.title} className="home--genres-card">

                  <button><h2 className="home--genres-button"> 
                    Genres {data.genres}
                  </h2></button>
                  

                 
                </div>
            );
            })}
             */}
        </div>    
        <LatestEps />  
    </div>
  );
}

