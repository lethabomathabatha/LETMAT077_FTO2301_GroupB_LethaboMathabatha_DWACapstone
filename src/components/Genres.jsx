import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import '/src/pages/HomeStyles.css'
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export default function Genres() {
  const [genreButtons, setGenreButtons] = useState([]);
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((data) => {
        const genreFetchPromises = data.map((show) =>
          fetch(`https://podcast-api.netlify.app/id/${show.id}`)
            .then((res) => res.json())
            .then((showData) => {
              show.genres = showData.genres || [];
              return show;
            })
        );

        Promise.all(genreFetchPromises)
          .then((showsData) => {
            setShows(showsData);
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

  const handleGenreClick = (genre) => {
    console.log(`Clicked on genre: ${genre}`);
    setSelectedGenre(genre);
  };

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
                    marginBottom: "20px",
                  }}
                  onClick={() => handleGenreClick(genre)}
                >
                  {genre}
                </Button>

                  {/* display results */}
                {selectedGenre === genre && (
                  <div className="genre--results-cards">
                    {shows
                      .filter((show) => show.genres.includes(genre))
                      .map((show) => (
                        <Link
                          to={`/search/${show.id}`}
                          key={show.id}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            cursor: "pointer",
                          }}
                        >
                          <div key={show.id} style={{ color: "var(--lila-white)" }} className="genre--results-details">
                            <img src={show.image} alt={show.title} className="genre--results-image" />
                            <span className="genre--results-title">{show.title}</span>
                          </div>
                        </Link>
                      ))}
                      {/* close results when clicked */}
                    <Button 
                      onClick={() => setSelectedGenre(null)}
                      variant="contained"
                      color="secondary"
                      style={{ fontSize: "12px",  width: "15px", borderRadius: "15px", borderWidth: "2px" }}
                      
                    >close</Button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
