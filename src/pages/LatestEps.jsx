import { useEffect, useState } from "react";

export default function LatestEps() {
    const [episodes, setEpisodes] = useState([]);
  
    useEffect(() => {
      fetch("https://podcast-api.netlify.app/shows")
        .then((res) => res.json())
        .then((data) => {
          const sortedEpisodes = data.sort(
            (a, b) => new Date(b.updated) - new Date(a.updated)
          );
          setEpisodes(sortedEpisodes);
        })
        .catch((error) => console.log(error));
    }, []);
  
    return (
        <div className="latest-episodes">
          <h1>Latest Uploads</h1>
          
          <ul>
            {episodes.map((episode, index) => {
              const modifiedTitle = episode.title.replace(/&amp;/g, " & ");
      
              return (
                <div className="latest--cards" key={episode.id}>
                    <img 
                        src={episode.image}
                        className="latest--card-image"
                        alt="podcast-image"  
                    ></img>
                    <h4>
                        {index + 1}. {modifiedTitle} - (
                        {new Date(episode.updated).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                        ) Now On Season {episode.seasons}
                    </h4>
                </div>
              );
            })}
          </ul>
        </div>
      );
  }
  
  