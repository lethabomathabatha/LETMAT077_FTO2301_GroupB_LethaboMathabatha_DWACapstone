import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone';
// import PauseIcon from '@mui/icons-material/Pause';
import '/src/pages/PodcastDetailsStyles.css'
// import Button from '@mui/material/Button';


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

                        <h2 className="details--header-title">{selectedPodcast.title.replace(/&amp;/g, " &")}</h2>
                        <img src={selectedPodcast.image} className="details--header-pod-image"/>
                        <p className="details--header-description">{selectedPodcast.description}</p>
                        <p className="details--header-seasons-genres">Now on Season {selectedPodcast.seasons.length}  | {selectedPodcast.genres}</p>
                    </div>

                    <div className="details--seasons-btns">
                        <p>Select a season</p>
                        {/* <Button />
                        {seasonsButtons.map((season) => (
                        <div key={season}>
                            <Button 
                            key={season}
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
                            >
                            {season}
                            </Button>
                        </div>
                    ))} */}

                    </div>
                    
                    {selectedPodcast.seasons.map((season) => (
                        <div key={season.season} className="details--cards">
                            <h4 className="details--cards-season-eps">Season {season.season} {season.episodes.length} Eps</h4>
 
                            {/* map through every season's episodes */}
                            {season.episodes.map((episode) => (
                                <div key={episode.episode}>
                                    <img src={season.image}  width={50} className="details--cards-image"/>
                                    <p className="details--cards-episode">Episode {episode.episode}: {episode.title}</p>
                                    <p className="details--cards-episode-description">{episode.description}</p>

                                    <PlayCircleOutlineTwoToneIcon />
                                    {/* {episode.paused ? (
                                        <PlayCircleOutlineTwoToneIcon 
                                        onClick={() => handlePlayPause(episode) }
                                        style={{cursor: "pointer"}}
                                    />
                                    ) : (
                                        <PauseIcon 
                                            onClick={() => handlePlayPause(episode) }
                                            style={{cursor: "pointer"}}
                                        />
                                    )}
                                     */}

                                    {/* this has to go */}
                                    {/* <audio controls>
                                        <source src={episode.file} type="audio/mp3" />
                                    </audio> */}
                                </div>
                            ))}
                            <br/>
                        </div>
                    ))}
                </div>

            )}

            {/*  */}


            <BottomNav/>
        </div>
    )
}