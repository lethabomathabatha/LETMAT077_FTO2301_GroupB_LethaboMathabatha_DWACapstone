import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import '/src/pages/HomeStyles.css'
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export default function Genres() {
  const [genreButtons, setGenreButtons] = useState([]);
  const [shows, setShows] = useState([]);
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
              show.genres = showData.genres || [];
              return show;
            })
        );

        Promise.all(genreFetchPromises)
          .then((showsData) => {
            setShows(showsData); // Store the shows data in state
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
    const showsWithGenre = shows.filter((show) => show.genres.includes(genre));
    console.log("Shows with this genre:", showsWithGenre);
    // get the IDs of the shows with this genre so that we can view them on 'search/:id'
    const showIds = showsWithGenre.map((show) => show.id);
    console.log("Show IDs:", showIds);


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
              // <Link to={`/search/${episode.id.}`} key={episode.id} style={{textDecoration:"none", color:"inherit", cursor:"pointer"}}>
             // <Link /> should take the id and take user to 'search/:id'
            //  <Link to={`/search/${genre.showIds}`} key={genre} style={{textDecoration:"none", color:"inherit", cursor:"pointer"}}>

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

                {/* when user clicks on a genre, there should be a list of shows that have that genre appear under the buttons */}
                <div className="genre--results">
                  {shows.filter((show) => show.genres.includes(genre)).map((show) => (
                    <Link to={`/search/${show.id}`} key={show.id} style={{textDecoration:"none", color:"inherit", cursor:"pointer"}}>
                      <div
                        key={show.id}
                        style={{
                          color: "var(--lila-white)",
                        }}
                      >
                        <span>{show.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
