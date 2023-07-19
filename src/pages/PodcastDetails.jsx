import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone';
import PauseTwoToneIcon from '@mui/icons-material/PauseTwoTone';



export default function PodcastDetails() {
    const { id } = useParams();

    const [selectedPodcast, setSelectedPodcast] = useState();

    // fetch full info about the podcast using the id
    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then((res) => res.json())
            .then((data) => setSelectedPodcast(data))
            .catch((error) => console.log(error))
    }, [id])

    
    return (
        <div>
            <h4>Podcast Details for Podcast {id}</h4>
            
            {/* get podcast title, description, seasons, episodes within those seasons, episode titles, episode descriptions, episode numbers, episode audio files */}
            
            {selectedPodcast && (
                <div>
                    <h2>Title: {selectedPodcast.title}</h2>
                    <p>Description: {selectedPodcast.description}</p>

                    {/* Get seasons from array, and display each one with its episodes, episode titles and audio files */}
                    <p>Total Seasons: {selectedPodcast.seasons.length}</p>
                    
                    {selectedPodcast.seasons.map((season) => (
                        <div key={season.season}>
                            <h4>Season {season.season}</h4>
                            <img src={season.image}  width={100}/>

                            {/* map through every season's episodes */}
                            {season.episodes.map((episode) => (
                                <div key={episode.episode}>
                                    <p>Episode {episode.episode}: {episode.title}</p>
                                    <p>{episode.description}</p>
                                    <audio controls>
                                        <source src={episode.file} type="audio/mp3" />
                                    </audio>
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