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
import Favourites from './Favourites';



export default function PodcastDetails() {
    const { id } = useParams();
    const audioRef = useRef();


    const [selectedPodcast, setSelectedPodcast] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    // const [isAudioLoaded, setIsAudioLoaded] = useState(true);
    const [currentPlayingEpisodeId, setCurrentPlayingEpisodeId] = useState(null);
    const [episodeFaves, setEpisodeFaves] = useState({})

    // fetch full info about the podcast using the id
    useEffect(() => {
        setIsLoading(true)
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then((res) => res.json())
            .then((data) => {setSelectedPodcast(data)})
            .catch((error) => console.log(error))
            .finally (() => setIsLoading(false));
    }, [id])

    // get duration of each podcast show audio file
    useEffect(() => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    }, [isPlaying])


    const handlePlayPause = (episode) => {
        if (isPlaying) {
          audioRef.current.pause();
          setShowAudioPlayer(true);
        } else {
          audioRef.current.play();
          setShowAudioPlayer(true);
        }
        setIsPlaying((prevState) => !prevState);
      
        // Set the current show details
        setCurrentPlayingEpisodeId(episode.episode); // ID of the current episode
        setSelectedPodcast({
          title: episode.title, // Title of the current episode
          image: selectedPodcast.image // Image of the podcast (assuming it's the same for all episodes)
        });
      };


      // switch between the favourite icons. Only show one at a time, interchangeably when clicked on
      const handleFavourite = (episodeId) => {
        // Check if the episode is already in episodeFaves
        const isFavourite = episodeFaves[episodeId];
    
        // If the episode is already in favourites, remove it
        if (isFavourite) {
          setEpisodeFaves((prevFaves) => {
            const updatedFaves = { ...prevFaves };
            delete updatedFaves[episodeId];
            return updatedFaves;
          });
        } else {
          // If the episode is not in favourites, add it
        //   send episode id to favourites
          setEpisodeFaves((prevFaves) => ({
            ...prevFaves,
            [episodeId]: true,
          }));
        }
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
                                                        onClick={() => handleFavourite(episode.episode)}
                                                        //  store episode in Favourites list
                                                        />
                                                    ) : (
                                                        <FavoriteBorderIcon
                                                        onClick={() => handleFavourite(episode.episode)}
                                                        // remove favourite from favourites list
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