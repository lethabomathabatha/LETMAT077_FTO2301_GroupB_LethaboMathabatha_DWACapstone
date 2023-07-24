import { useState, useRef, useEffect } from "react";
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone';
import PauseIcon from '@mui/icons-material/Pause';
import { CircularProgress } from "@mui/material";
import GraphicEqIcon from '@mui/icons-material/GraphicEq'

export default function AudioPlayer({ audioSrc, onPlayPause, selectedPodcast, episodeName, currentPlayingEpisodeName, currentPodcastImg}) {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showAudioPlayer, setShowAudioPlayer] = useState(false);


  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      console.log("paused");
      setShowAudioPlayer(false);
    } else {
      audioRef.current.play();
      
      setShowAudioPlayer(true);
      console.log("playing");
    }
    setIsPlaying((prevState) => !prevState);
  };

  const handleLoadedData = () => {
    setIsLoading(false);   
  }

  useEffect(() => {
    audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    return() => {
        audioRef.current.removeEventListener("ended", () => setIsPlaying(false))
    }
  }, []);

  useEffect(() => {
    if (onPlayPause) {
        onPlayPause(isPlaying)
    }
  }, [isPlaying, onPlayPause]);

  return (
    <div>
        <div className="details--audio-player">
            <audio
                ref={audioRef}
                src={audioSrc}
                preload="metadata"
                // onEnded={() => setIsPlaying(false)}
                onLoadedData={handleLoadedData}
            />

            {/* conditionally render the play/pause buttons */}
            {isLoading ? (
                <CircularProgress color="secondary" size={"1.5rem"} />
            ) : isPlaying ? (
                <div>
                <GraphicEqIcon style={{ opacity: "0.5" }} className="details--audio-equalizer" />
                <PauseIcon onClick={handlePlayPause} style={{ cursor: "pointer" }} />
                </div>
            ) : (
                <PlayCircleOutlineTwoToneIcon onClick={handlePlayPause} style={{ cursor: "pointer" }} />
            )}
        </div>

        {{handlePlayPause} && (
            <div style={{ position: "fixed", bottom: 50, left: 0, right: 0, backgroundColor: "hotpink", display: "flex", justifyContent: "center", padding: 10, flexDirection: "column" }}>
                <p>Title : {selectedPodcast.title}</p>
                <p>Episode : {episodeName}</p>
                <p>{currentPlayingEpisodeName}</p>
                <img src={currentPodcastImg} alt="podcast-image" width={"45"}/>
                <audio controls><source src={audioSrc}  type="audio/mpeg" /></audio>
                {/* add show title, show image, podcast name to audio player */}
            </div>
        )}


    </div>
  );
}