import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';


export default function PodcastDetails() {
    const { id } = useParams();

    const [selectedPodcast, setSelectedPodcast] = useState();

    // fetch full info about the podcast using the id
    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/shows/${id}`)
            .then((res) => res.json())
            .then((data) => setSelectedPodcast(data))
            .catch((error) => console.log(error))
    }, [id])

    
    return (
        <div>
            <h4>Podcast Details for Podcast {id}</h4>
            
            {/* get podcast title, description, seasons, episodes within those seasons, episode titles, episode descriptions, episode numbers, episode audio files */}
            
        </div>
    )
}