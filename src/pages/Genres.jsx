import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import '/src/pages/HomeStyles.css'
import { CircularProgress } from "@mui/material";


export default function Genres() {
  const [genreButtons, setGenreButtons] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((data) => {
        const genreFetchPromises = data.map((show) =>
          fetch(`https://podcast-api.netlify.app/id/${show.id}`)
            .then((res) => res.json())
            .then((showData) => {
              show.genres = showData.genres || []; // Set genres to an empty array if it's not available
              return show;
            })
        );

        Promise.all(genreFetchPromises)
          .then((showsData) => {
            const allGenres = showsData.reduce((genres, show) => {
              show.genres.forEach((genre) => {
                if (!genres.includes(genre)) {
                  genres.push(genre);
                }
              });
              return genres;
            }, []);
            setGenreButtons(allGenres);
          })
          .catch((error) => console.log(error))
          .finally(() => setIsLoading(false));
      });
  }, []);

  return (
    <div className="home--genres">
      <h3 className="home--genres-title">Genres</h3>

      <div className="home--genres-button-group">  
      {isLoading ? (
                <div className="loading">
                <CircularProgress color="secondary" /> 
                </div>
            ) : (
            <>  
      {genreButtons.map((genre) => (
        <div key={genre}>
            <Button 
            key={genre}
            variant="contained"
            color="secondary"
            style={{
                color: "var(--light-purple)",
                fontWeight: "800",
                borderRadius: "15px",
                backgroundColor: "var(--ice-white)",
                fontSize: "11px",
                height: "35px",
                whiteSpace: "nowrap",
            }}
            >
            {genre}
            </Button>
        </div>
      ))}
      </>
      )}
    </div>
    </div>
  )
  
}
