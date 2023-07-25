// import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import '../pages/LoginStyles.css';
import BottomNav from '../components/BottomNav';
import { useLocation } from 'react-router-dom';

export default function Favourites() {
    const location = useLocation();
    const [faveEpisodes, setFaveEpisodes] = useState([])

    useEffect(() => {

        if (location.state && location.state.favoriteEpisodes) {
          setFaveEpisodes(location.state.favoriteEpisodes);
        }
      }, [location]);
    
      return (
        <div>
          <h3>Favourites</h3>
          {faveEpisodes.map((episode) => (
            <div key={episode.id}>
              <p>{episode.title}</p>
              <img src={episode.image} width={30}  />
              
            </div>
          ))}

          <BottomNav />
        </div>
      );
    }