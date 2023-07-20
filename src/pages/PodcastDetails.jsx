import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone';
// import PauseIcon from '@mui/icons-material/Pause';
import '/src/pages/PodcastDetailsStyles.css'
// import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function PodcastDetails() {
    const { id } = useParams();

    const [selectedPodcast, setSelectedPodcast] = useState();
    // const [seasonsButtons, setSeasonsButtons] = useState([]);

    // function handlePlayPause(episode) {
    //     if (episode.play) {
    //         episode.pause();
    //     } else {
    //         episode.play();
    //     }
    // }

    // fetch full info about the podcast using the id
    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then((res) => res.json())
            .then((data) => setSelectedPodcast(data))
            .catch((error) => console.log(error))
    }, [id])

    return (
        <div>
            
            {selectedPodcast && (
                <div className="details--page">
                    <div className="details--header">
                        <img src="../public/podcast-bg.png" alt="podcast-background" width={"100%"} className="details--header-image"/>

                            <ArrowBackIosIcon 
                                className="details--header-back-btn"
                                onClick={() => window.location.href = "/search"}
                                style={{cursor: "pointer"}}
                            />
                            <h2 className="details--header-title">{selectedPodcast.title.replace(/&amp;/g, " &")}</h2>
                        

                        <img src={selectedPodcast.image} className="details--header-pod-image"/>
                        <p className="details--header-description">{selectedPodcast.description}</p>
                        <p className="details--header-seasons-genres">Now on Season {selectedPodcast.seasons.length}  | {selectedPodcast.genres.join(", ").replace(/All,/g, "")}</p>
                    </div>

                    <div className="details--seasons-btns">
                        <p>Select a season</p>
                    </div>
                    
                    {selectedPodcast.seasons.map((season) => (
                        <div key={season.season} className="details--section">
                            <aside className="details--season-title"><strong>Season {season.season}</strong> {season.episodes.length} Episodes</aside>
                            
                            <div className="details--section-cards">
                            {/* map through every season's episodes */}
                            {season.episodes.map((episode) => (
                                <div key={episode.episode} className="details--show-cards">
                                    <img src={season.image} className="details--cards-image"/>

                                    <div className="details--cards-text">
                                        <span className="details--cards-episode">Ep{episode.episode}: {episode.title}</span>
                                        <span className="details--cards-episode-description">{episode.description}</span>
                                        
                                        <div className="details--podcast-play">
                                        <span className="details--podcast-title">{selectedPodcast.title.replace(/&amp;/g, " &")}  | 43:00</span>
                                        {/* audio file length */}
                                        {/* <audio src={episode.file}  controls></audio> */}
                                        <PlayCircleOutlineTwoToneIcon className="details--audio-btn"/>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            ))}
                            </div>
                        </div>
                    ))}
                </div>

            )}

            {/*  */}


            <BottomNav/>
        </div>
    )
}