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



export default function PodcastDetails() {
    const { id } = useParams();
    const audioRef = useRef();


    const [selectedPodcast, setSelectedPodcast] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    // const [duration, setDuration] = useState(0);
    // const [isAudioLoaded, setIsAudioLoaded] = useState(true);
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



    const handlePlayPause = (episode) => {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying((prevState) => !prevState);
      
        // Set the current show details
        setCurrentPlayingEpisodeId(episode.episode); // ID of the current episode
        setSelectedPodcast({
          title: episode.title, 
        });
      };


      // switch between the favourite icons. Only show one at a time, interchangeably when clicked on
      // get the actual selected episode's show id and title
      const handleFavourite = (episode, episodeTitle) => {
        setEpisodeFaves((prevFaves) => ({
            ...prevFaves,
            [episode.episode] : !prevFaves[episode.episode],

        }))
        setFavourites((prevFaves) => [
            ...prevFaves,
            {
                showName: selectedPodcast.title,
                episodeTitle: episodeTitle,
                showId: selectedPodcast.id
            },
        ]);

        console.log(episodeTitle, selectedPodcast.title, selectedPodcast.id)
      };


      /*
      const handleFavourite = (episodeId) => {
        const isFavourite = episodeFaves[episodeId];
        
        if (isFavourite) {
          setEpisodeFaves((prevFaves) => {
            const updatedFaves = { ...prevFaves };
            delete updatedFaves[episodeId];
            return updatedFaves;
            
          });

          setFavouriteEpisodeIds((prevIds) => prevIds.filter((id) => id !== episodeId));
          console.log(favouriteEpisodeIds)
        } else {
          setEpisodeFaves((prevFaves) => ({
            ...prevFaves,
            [episodeId]: true,
          }));

          setFavouriteEpisodeIds((prevIds) => [...prevIds, episodeId]);
        }
      };*/

     

    return (
        <div>
            {isLoading ? (
                <div className="loading">
                <CircularProgress color="secondary" /> 
                </div>
            ) : (
            <>
            {selectedPodcast && Object.keys(selectedPodcast).length > 0 && (
                <div className="details--page">
                    <div className="details--header">
                        <img src="../public/podcast-bg.png" alt="podcast-background" width={"100%"} className="details--header-image"/>

                            <Link to="/search">
                                <ArrowBackIosIcon 
                                    className="details--header-back-btn"
                                    onClick={<Link to="/search"/>}
                                    // onClick={() => window.location.href = "/search"}
                                    style={{cursor: "pointer"}}
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