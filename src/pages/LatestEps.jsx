import { useEffect, useState } from "react";
import "./LatestEpsStyles.css"

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
        <div className="latest--section">
          <aside className="latest--title">Latest Uploads</aside>
          
          <div className="latest--cards">
            {episodes.map((episode, index) => {
              const modifiedTitle = episode.title.replace(/&amp;/g, " & ");
      
              return (
                <div className="latest--card-details" key={episode.id}>
                    <img 
                        src={episode.image}
                        className="latest--card-image"
                        alt="podcast-image"  
                    ></img>

                    <div className="latest--card-text">
                            <span className="latest--card-title">
                                {index + 1}. {modifiedTitle} 
                            </span>

                            <span className="latest--card-date">
                                Updated {new Date(episode.updated).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })} <strong>S{episode.seasons}</strong>
                            </span>
                        </div>
                </div>
              );
            })}
          </div>
        </div>
      );
  }
  
  