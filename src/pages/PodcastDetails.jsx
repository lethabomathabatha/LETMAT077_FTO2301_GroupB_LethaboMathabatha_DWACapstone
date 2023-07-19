import { useParams } from 'react-router-dom'


export default function PodcastDetails() {
    const { id } = useParams();
    
    
    return (
        <div>
            <h1>Podcast Details {id}</h1>
            <h2>Title: </h2>
        </div>
    )
}