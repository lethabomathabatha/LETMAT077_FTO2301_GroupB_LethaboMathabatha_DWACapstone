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



export default function PodcastDetails() {
    const { id } = useParams();

    const [selectedPodcast, setSelectedPodcast] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    // const [isAudioLoaded, setIsAudioLoaded] = useState(true);
    const [currentPlayingEpisodeId, setCurrentPlayingEpisodeId] = useState(null);
    // const [isFavourite, setIsFavourite] = useState(false)
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

    /*
    function calculateTime(secs) {
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);

        const returnHours = hours < 10 ? `0${hours}` : `${hours}`;
        const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnHours}:${returnMinutes}:${returnSeconds}`;
    } */

    // function handlePlayPause(playing) {
    //     setIsPlaying(playing);
    // }

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
        setEpisodeFaves((prevFaves) => ({
            ...prevFaves,
            [episodeId] : !prevFaves[episodeId],
        }))
        console.log("made fave!")
      }
    
    const audioRef = useRef();

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
                                                        />
                                                    ) : (
                                                        <FavoriteBorderIcon
                                                        onClick={() => handleFavourite(episode.episode)}
                                                        />
                                                    )}
                                                        


                                                        <AudioPlayer 
                                                            audioSrc={episode.file} 
                                                            isPlaying={isPlaying} 
                                                            ref={episode.episode === currentPlayingEpisodeId ? audioRef : null} 
                                                            selectedPodcast={selectedPodcast}
                                                            setCurrentPlayingEpisodeId={setCurrentPlayingEpisodeId} 
                                                            episodeName= {episode.title} // current playing episode name
                                                            currentPodcastImg= {season.image} // current playing episode podcast image
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