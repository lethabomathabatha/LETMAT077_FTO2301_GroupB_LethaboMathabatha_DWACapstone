// import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './SearchStyles.css';
import BottomNav from '../components/BottomNav';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import TopNav from '../components/TopNav';



export default function Favourites({ favourites }) {
    const [favouriteEpisodes, setFavouriteEpisodes] = useState([])

    


  

  // Function to remove an episode from favourites
  const removeFavouriteEpisode = (episodeId) => {
    setFavouriteEpisodes((prevFavourites) =>
      prevFavourites.filter((favId) => favId !== episodeId)
    );
  };

  // Sort favourites by show titles from A-Z
  const sortByShowAToZ = () => {
    setFavouriteEpisodes((prevFavourites) =>
      [...prevFavourites].sort((a, b) =>
        a.showTitle.localeCompare(b.showTitle, undefined, { sensitivity: "base" })
      )
    );
  };

  // Sort favourites by show titles from Z-A
  const sortByShowZToA = () => {
    setFavouriteEpisodes((prevFavourites) =>
      [...prevFavourites].sort((a, b) =>
        b.showTitle.localeCompare(a.showTitle, undefined, { sensitivity: "base" })
      )
    );
  };

  // Sort favourites by date updated in ascending order
  const sortByDateAsc = () => {
    setFavouriteEpisodes((prevFavourites) =>
      [...prevFavourites].sort((a, b) => a.dateAdded - b.dateAdded)
    );
  };

  // Sort favourites by date updated in descending order
  const sortByDateDesc = () => {
    setFavouriteEpisodes((prevFavourites) =>
      [...prevFavourites].sort((a, b) => b.dateAdded - a.dateAdded)
    );
  };

  return (
    <div>
        
        <div className="favourites--section">
          <h1>Favourite Episodes</h1>
      
     
              
            <div className="favourites--sorting-btns" 
                style={{ 
                  display: "flex", 
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}> 
              <Button
                  onClick={() => {
                      sortByShowAToZ();
                      // specifically sort by title from A to Z
                      }}
                      variant={ "outlined" }
                      color="secondary"
                      style={{ color: "var(--lila-white)" , fontSize: "10px", width: "13px", borderRadius: "15px", borderWidth: "2px" }}
                      className="latest--selection">   
                      A-Z
              </Button>

              <Button
                  onClick={() => {
                      sortByShowZToA();
                      // specifically sort by title from Z to A
                      }}
                      variant={ "outlined" }
                      color="secondary"
                      style={{ color: "var(--lila-white)" , fontSize: "10px", width: "13px", borderRadius: "15px", borderWidth: "2px" }}
                      className="latest--selection">   
                      Z-A
              </Button>

              <Button
                  onClick={() => {
                      sortByDateAsc();
                      // specifically sort by title from date asc
                      }}
                      variant={ "outlined" }
                      color="secondary"
                      style={{ color: "var(--lila-white)" , fontSize: "10px", width: "13px", borderRadius: "15px", borderWidth: "2px" }}
                      className="latest--selection">   
                      Newest
              </Button>

              <Button
                  onClick={() => {
                      sortByDateDesc();
                      // specifically sort by title from date desc
                      }}
                      variant={ "outlined" }
                      color="secondary"
                      style={{ color: "var(--lila-white)" , fontSize: "10px", width: "13px", borderRadius: "15px", borderWidth: "2px" }}
                      className="latest--selection">   
                      Oldest
              </Button>
            </div>

            {/* display for favourite episodes */}

          {favouriteEpisodes.map((episode) => (
              <div key={episode.id}>
                <span>{episode.showName}</span>
                <span>{episode.season}</span>
                <span>{episode.title}</span>
                <span>{episode.dateAdded}</span>
                <span>{episodeTitle}</span>
                
                <CloseIcon onClick={() => removeFavouriteEpisode(episode.id)} />
        </div>
      ))}
      <BottomNav />
    </div>
    </div>
  );
}