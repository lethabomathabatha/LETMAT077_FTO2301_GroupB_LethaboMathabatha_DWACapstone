import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search"
// import * as Mui from "@mui/material";
import '/src/pages/HomeStyles.css'

export default function Home() {
  const [display, setDisplay] = useState([]);

  // get all shows
  useEffect(() => {
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
          .catch((error) => console.log(error));
      });


  }, []);

  // get all shows, then get genres for all

  return (
    <div>
        <nav className="home--title">
            <p>Hello! Welcome to Pods App</p>
            <SearchIcon />
        </nav>

        <div className="home--top-ten">
            <aside className="home--top-title">Our Top Picks</aside>

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
        </div>

            {/* genres */}
        {/* <div className="home--genres">
            <h3 className="home--genres-title">Genres</h3>
           
            {display.map((genre) => {
            return (
                <div key={genre} className="home--genres-card">
                  <h2 className="home--genres-button"> 
                    Genres: {genre}
                  </h2>
                </div>
            );
            })}
            
        </div>       */}
    </div>
  );
}
