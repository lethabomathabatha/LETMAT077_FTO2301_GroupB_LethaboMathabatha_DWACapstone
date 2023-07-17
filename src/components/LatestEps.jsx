import { useEffect, useState } from "react";
import "./LatestEpsStyles.css"
import Button from '@mui/material/Button';
import { CircularProgress } from "@mui/material";

export default function LatestEps() {
    const [episodes, setEpisodes] = useState([]);

    const [sortingTitle, setSortingTitle] = useState("Newest Uploads");

    const [displayedPods, setDisplayedPods] = useState([]);

    const [visibleCount, setVisibleCount] = useState(10);

    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        setIsLoading(true);
      fetch("https://podcast-api.netlify.app/shows")
        .then((res) => res.json())
        .then((data) => {

          const sortedByNewest = data.sort(
            (a, b) => new Date(b.updated) - new Date(a.updated)
          );
          setEpisodes(sortedByNewest);
          setDisplayedPods(sortedByNewest.slice(0, visibleCount))
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }, [visibleCount]);

    // function to handle sort dates
            // Function to handle sorting by A-Z
        function sortAZ() {
            const sortedAZ = [...episodes].sort((a, b) => a.title.localeCompare(b.title));
            setEpisodes([...sortedAZ]);
            setDisplayedPods([...sortedAZ.slice(0, visibleCount)]);
            setSortingTitle("Our A - Z");
        }

        // Function to handle sorting by Z-A
        function sortZA() {
            const sortedZA = [...episodes].sort((a, b) => b.title.localeCompare(a.title));
            setEpisodes([...sortedZA]);
            setDisplayedPods([...sortedZA.slice(0, visibleCount)]);
            setSortingTitle("Our Z - A");
        }

        // Function to handle sorting by newest to oldest
        function sortNewToOld() {
            const sortedNewToOld = [...episodes].sort(
            (a, b) => new Date(b.updated) - new Date(a.updated)
            );
            setEpisodes([...sortedNewToOld]);
            setDisplayedPods([...sortedNewToOld.slice(0, visibleCount)]);
            setSortingTitle("Newest Uploads");
            
        }

        // Function to handle sorting by oldest to newest
        function sortOldToNew() {
            const sortedOldToNew = [...episodes].sort(
            (a, b) => new Date(a.updated) - new Date(b.updated)
            );
            setEpisodes([...sortedOldToNew]);
            setDisplayedPods([...sortedOldToNew.slice(0, visibleCount)]);
            setSortingTitle("Oldest Uploads");
        }
            
       function loadMore() {
           setVisibleCount(visibleCount + 10);
           console.log(visibleCount);
       }
  
    return (
        <div className="latest--section">
             
            <aside className="latest--title">
                {/* the name should be dependent on the sorting option selected */}
                {sortingTitle}
            </aside>
            
        
            {isLoading ? (
                <div className="loading">
                <CircularProgress color="secondary" /> 
                </div>
            ) : (
            <>  
            <div className="latest--cards">
                <div className="latest--selection-group">
                    <Button
                        onClick={() => {
                            sortNewToOld();
                        }}
                        variant={ sortingTitle === "Newest Uploads" ? "contained" : "outlined" }
                        color="secondary"
                        style={{ color: "var(--lila-white)" , fontSize: "10px", width: "13px", borderRadius: "15px", borderWidth: "2px" }}
                        className="latest--selection">   
                        Newest
                    </Button>

                    <Button
                        onClick={() => {
                            sortOldToNew();
                            // specifically sort by oldest
                        }}
                        variant={ sortingTitle === "Oldest Uploads" ? "contained" : "outlined" }
                        color="secondary"
                        style={{ color: "var(--lila-white)" , fontSize: "10px", width: "13px", borderRadius: "15px", borderWidth: "2px" }}
                        className="latest--selection">   
                        Oldest
                    </Button>

                    <Button
                        onClick={() => {
                            sortAZ();
                            // specifically sort by title from A to Z
                        }}
                        variant={ sortingTitle === "Our A - Z" ? "contained" : "outlined" }
                        color="secondary"
                        style={{ color: "var(--lila-white)" , fontSize: "10px", width: "13px", borderRadius: "15px", borderWidth: "2px" }}
                        className="latest--selection">   
                        A-Z
                    </Button>

                    <Button
                        onClick={() => {
                            sortZA();
                            // specifically sort by title from Z to A
                        }}
                        variant={ sortingTitle === "Our Z - A" ? "contained" : "outlined" }
                        color="secondary"
                        style={{ color: "var(--lila-white)" , fontSize: "10px", width: "13px", borderRadius: "15px", borderWidth: "2px" }}
                        className="latest--selection">   
                        Z-A
                    </Button>
                </div>

                {displayedPods.map((episode, index) => {
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

            {displayedPods.length < episodes.length && (
                <Button 
                    onClick={loadMore} 
                    variant="outlined" 
                    color="secondary" 
                    style={{ 
                        color: "var(--lila-white)", 
                        fontSize: "12px", 
                        fontWeight: "600", 
                        width: "100%", 
                        borderRadius: "15px", 
                        borderWidth: "2px" 
                    }}>
                    Load More
            </Button>
            )}
            
          </div>
          </>
            )}
        </div>
      );
  }
  
  