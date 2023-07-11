import { useEffect, useState } from "react";

export default function App() {
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((data) => {

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

  return (
    <div>
      <p className="display--title">Welcome to Pods App</p>
      <div className="display">
        {display.map((data) => {
          return (
            <div key={data.id} className="display--card">
              <img
                src={data.image}
                width={"150px"}
                className="display--card-image"
                alt="display-image"
              />
              <h2 className="display--card-label">Title: {data.title}</h2>
              <h2 className="display--card-label">Seasons: {data.seasons}</h2>
              <h2>Genres: {data.genres}</h2>
              <h4 className="display--card-description">Description: {data.description}</h4>
              <h4>Last updated: {data.updated}</h4>
              <br />
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}
