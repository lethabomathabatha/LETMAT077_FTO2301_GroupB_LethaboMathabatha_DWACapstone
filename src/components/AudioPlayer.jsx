import { useState, useRef, useEffect } from "react";
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone';
import PauseIcon from '@mui/icons-material/Pause';
import { CircularProgress } from "@mui/material";
import GraphicEqIcon from '@mui/icons-material/GraphicEq'

export default function AudioPlayer({ audioSrc, onPlayPause }) {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      console.log("paused");
    } else {
      audioRef.current.play();
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
  );
}