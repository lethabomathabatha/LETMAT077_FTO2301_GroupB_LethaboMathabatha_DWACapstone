import { useEffect, useState } from "react";
import '/src/pages/HomeStyles.css'
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export default function TopPicks() {
    const [display, setDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // get all shows
    useEffect(() => {
      setIsLoading(true);
      fetch("https://podcast-api.netlify.app/shows")
        .then((res) => res.json())
        .then((data) => {
  
          // fetch first 10 shows
          const firstTenShows = data.slice(0, 10);
          setDisplay(firstTenShows);
  
          setIsLoading(false);
  
          
        });
  
  
    }, []);
    
    return (
        <div className="home--top-ten">
            <aside className="home--top-title">Top 10 Picks</aside>

            {isLoading ? (
                <div className="loading">
                <CircularProgress color="secondary" /> 
                </div>
            ) : (
            <>
            <div className="home--display-top">
            {display.map((data) => {
            return (
                <Link to={`/search/${data.id}`} key={data.id} style={{textDecoration:"none", color:"inherit", cursor:"pointer"}}>
                <div className="home--card">
                    <img
                        src={data.image}
                        className="home--card-image"
                        alt="podcast-image"
                    />
                    <h2 className="home--card-label">{data.title}</h2>
                </div>
                </Link>
            );
            })}
            </div>
            </>
            )}
        </div>
    )
    
}