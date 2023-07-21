import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import BottomNav from '../components/BottomNav';
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone';
import PauseIcon from '@mui/icons-material/Pause';
import '/src/pages/PodcastDetailsStyles.css'
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CircularProgress } from "@mui/material";
// import { LinearProgress } from "@mui/material";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';


export default function PodcastDetails() {
    const { id } = useParams();

    const [selectedPodcast, setSelectedPodcast] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0)
    const audioRef = useRef()

   
    // fetch full info about the podcast using the id
    useEffect(() => {
        setIsLoading(true)
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then((res) => res.json())
            .then((data) => {setSelectedPodcast(data)})
            .catch((error) => console.log(error))
            .finally (setIsLoading(false))
    }, [id])

    // get duration of each podcast show audio file
    useEffect(() => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration)
        }
    }, [isPlaying])
    
    function calculateTime(secs) {
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);

        const returnHours = hours < 10 ? `0${hours}` : `${hours}`;
        const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnHours}:${returnMinutes}:${returnSeconds}`;
        
    }

    function handlePlayPause() {
        const prevState = isPlaying;
        setIsPlaying(!prevState)

        if (prevState) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        console.log('played/paused')
    }

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

                            <ArrowBackIosIcon 
                                className="details--header-back-btn"
                                onClick={() => window.location.href = "/search"}
                                style={{cursor: "pointer"}}
                            />
                            <h2 className="details--header-title">{selectedPodcast.title.replace(/&amp;/g, " &")}</h2>
                        

                        <img src={selectedPodcast.image} className="details--header-pod-image" alt="podcast-image"/>
                        <p className="details--header-description">{selectedPodcast.description}</p>
                        <p className="details--header-seasons-genres">Now on Season {selectedPodcast.seasons.length}  | {selectedPodcast.genres.join(", ").replace(/All,/g, "")}</p>
                    </div>

                    <div className="details--seasons-btns">
                        <p>Select a season</p>

                        
                        <div className="details--seasons-btn-group">  
                            <div>
                                <Button 
                                    key={selectedPodcast.season}
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
                                >{/*all the seasons should each appear on their own button*/}
                                    Season {selectedPodcast.season}
                                </Button>
                                </div>
                            </div>
                    </div>
                    
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
                                        <span className="details--podcast-title">{selectedPodcast.title.replace(/&amp;/g, " &")}  | {calculateTime(duration)}</span>
                                        {/* audio file length */}
                                        {/* <audio src={episode.file}  controls preload="none"></audio> */}
                                        {/* ACTION: only play/pause for the selected episode */}

                                        <PlayCircleOutlineTwoToneIcon 
                                            className="details--audio-btn"
                                            onClick={() => handlePlayPause()}
                                            style={{ display: isPlaying ? "none" : "block", cursor: "pointer" }}
                                        />
                                        <GraphicEqIcon 
                                            className="details--audio-equalizer"
                                            style={{ 
                                                display: isPlaying ? "block" : "none", 
                                                opacity: "0.3" 
                                                
                                            }}
                                        />
                                        <PauseIcon 
                                            className="details--audio-btn"
                                            onClick={() => handlePlayPause()}
                                            style={{ display: isPlaying ? "block" : "none", cursor: "pointer" }}
                                        
                                        />
                                        

                                        {/* manage play progress/duration */}
                                        {/* <LinearProgress 
                                            variant="determinate" 
                                            color="secondary" 
                                            value={calculateTime(episode.setDuration)} 
                                            style={{ width: "40%" }}
                                            duration={calculateTime (setDuration)} 
                                            
                                        />{calculateTime(episode.setDuration)} */}
                                       
                                       
                                       <audio ref={audioRef} src={episode.file} preload="none"></audio>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            ))}
                            </div>
                        </div>
                    ))}
                </div>

            )}


            <BottomNav/>
            </>
            )}
        </div>
    )
}