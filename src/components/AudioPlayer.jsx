import { useState, useRef } from "react";
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone';
import PauseIcon from '@mui/icons-material/Pause';
import { CircularProgress } from "@mui/material";


export default function AudioPlayer({ audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);

    if (isPlaying) {
      audioRef.current.pause();
      console.log("paused");
    } else {
      audioRef.current.play();
      console.log("playing");
    }
  };

  const handleLoadedData = () => {
    setIsLoading(false);
      
  }

  return (
    <div>
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
        onLoadedData={handleLoadedData}
      />

      {/* conditionally render the play/pause buttons */}
      {isLoading ? (
        <CircularProgress color="secondary" size={"1.5rem"}/>
      ) : (
        isPlaying ? (
            <PauseIcon onClick={handlePlayPause} style={{ cursor: "pointer" }}  />
        ) : (
            <PlayCircleOutlineTwoToneIcon onClick={handlePlayPause} style={{ cursor: "pointer" }} />
        )
      
      )}
        
    </div>
  );
}