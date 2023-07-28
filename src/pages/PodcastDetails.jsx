import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import BottomNav from '../components/BottomNav';
import '/src/pages/PodcastDetailsStyles.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CircularProgress } from "@mui/material";
import AudioPlayer from '../components/AudioPlayer';
import { Link } from "react-router-dom"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite" 
// import Favourites from './Favourites';
import { supabase } from '../main';


export default function PodcastDetails() {
    // const user = useUser();
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const audioRef = useRef();
    
    const [selectedPodcast, setSelectedPodcast] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayingEpisodeId, setCurrentPlayingEpisodeId] = useState(null);
    const [episodeFaves, setEpisodeFaves] = useState({})
    const [favourites, setFavourites] = useState([]);

    

    // fetch full info about the podcast using the id
    useEffect(() => {
        setIsLoading(true)
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then((res) => res.json())
            .then((data) => {setSelectedPodcast(data)})
            .catch((error) => console.log(error))
            .finally (() => setIsLoading(false));
    }, [id])

     // Fetch user data after the component mounts
     useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);

                // local storage
                const storedFavourites = localStorage.getItem("favouriteEpisodes");
                if (storedFavourites) {
                    setFavourites(JSON.parse(storedFavourites));
                }
            } catch (error) {
                console.error('Error fetching user data from Supabase:', error);
            }
        };
        fetchUserData();
    }, []);

    const handlePlayPause = (episode) => {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying((prevState) => !prevState);
      
        // Set the current show details
        setCurrentPlayingEpisodeId(episode.episode); 
        setSelectedPodcast({
          title: episode.title, 
        });
      };

      // add to array of favourites
    useEffect(() => {
        console.log("updated favourites array:", favourites)
    }, [favourites])


      // switch between the favourite icons. Only show one at a time, interchangeably when clicked on
      // get the actual selected episode's show id and title
    

      const handleFavourite = (episode, episodeTitle) => {
        setEpisodeFaves((prevFaves) => ({
          ...prevFaves,
          [episode.episode]: !prevFaves[episode.episode],
        }));
    
        // Check if the episode is already in the favorites array
        const isAlreadyFavorite = favourites.some(
          (item) => item.showId === selectedPodcast.id && item.episodeTitle === episodeTitle
        );
    
        // If the episode is already a favorite, remove it from the favorites array
        if (isAlreadyFavorite) {
          setFavourites((prevFaves) =>
            prevFaves.filter(
              (item) => !(item.showId === selectedPodcast.id && item.episodeTitle === episodeTitle)
            )
          );
        } else {
          // Otherwise, add the episode to the favorites array
          setFavourites((prevFaves) => [
            ...prevFaves,
            {
              showName: selectedPodcast.title,
              episodeTitle: episodeTitle,
              showId: selectedPodcast.id,
              userId: user
            },
          ]);
        }
        // local storage
        localStorage.setItem("favouriteEpisodes", JSON.stringify(favourites));
        console.log(episodeTitle, selectedPodcast.title, selectedPodcast.id);
      };


      return (
        <div>
            {isLoading ? (
                <div className="loading">
                <CircularProgress color="secondary" /> 
                </div>
            ) : (
            <>
            {selectedPodcast && Object.keys(selectedPodcast).length > 0 && (
                <div className="details--page" key={selectedPodcast.id}>
                    <div className="details--header">
                        {/* get the image from metadata */}
                        
                        <img src="../podcast-bg.png" alt="podcast-background" width={"100%"} className="details--header-image"/>


                        <Link to="/search" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ArrowBackIosIcon
                            className="details--header-back-btn"
                            style={{ cursor: "pointer" }}
                            />
                        </Link>


                        <h2 className="details--header-title">{selectedPodcast.title.replace(/&amp;/g, " &")}</h2>
                        

                        <img src={selectedPodcast.image} className="details--header-pod-image" alt="podcast-image"/>
                        <p className="details--header-description">{selectedPodcast.description}</p>
                        <p className="details--header-seasons-genres">Now on Season {selectedPodcast.seasons.length} | {selectedPodcast.genres && selectedPodcast.genres.join(", ")}</p>
                        {/* <p className="details--header-seasons-genres">Now on Season {selectedPodcast.seasons.length}  | {selectedPodcast.genres.join(", ")}</p> */}
                    </div>


                    {/* seasons selection */}
                    {selectedPodcast.seasons.map((season) => (
                        <div key={season.season} className="details--section">
                            <aside className="details--season-title"><strong>Season {season.season}</strong> { season.episodes.length > 1 ? `${season.episodes.length} Episodes` : `${season.episodes.length} Episode`}</aside>
                            
                            <div className="details--section-cards">
                            {/* map through every season's episodes */}
                            {season.episodes.map((episode) => (
                                <div key={episode.episode} className="details--show-cards">
                                    {isLoading ? (
                                        <div className="loading">
                                        <CircularProgress color="secondary" /> 
                                        </div>
                                    ) : (
                                    <>
                                        <img src={season.image} className="details--cards-image"/>
                                    </>)}

                                    <div className="details--cards-text">
                                        <span className="details--cards-episode">Ep{episode.episode}: {episode.title}</span>
                                        <span className="details--cards-episode-description">{episode.description}</span>
                                        

                                                    <div className="details--podcast-play">
                                                        <span className="details--podcast-title">
                                                            {selectedPodcast.title.replace(/&amp;/g, " & ")} {" "}  
                                                        </span>


                                                    {episodeFaves[episode.episode] ? (
                                                        <FavoriteIcon
                                                        onClick={() => handleFavourite(episode, episode.title)}

                                                        //  store episode in Favourites list
                                                        className="details--podcast-favourite"
                                                        />
                                                    ) : (
                                                        <FavoriteBorderIcon
                                                        onClick={() => handleFavourite(episode, episode.title)}
                                                        className="details--podcast-favourite"
                                                        />
                                                    )}

                                                        <AudioPlayer 
                                                            audioSrc={episode.file} 
                                                            isPlaying={isPlaying} 
                                                            ref={episode.episode === currentPlayingEpisodeId ? audioRef : null} 
                                                            selectedPodcast={selectedPodcast}
                                                            setCurrentPlayingEpisodeId={setCurrentPlayingEpisodeId} 
                                                            episodeName= {episode.title}
                                                            currentPodcastImg= {season.image} 
                                                            onPlayPause={handlePlayPause}
                                                        />

                                                        
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                                       
                    <BottomNav />
                </>
            )}
        </div>
    );
}