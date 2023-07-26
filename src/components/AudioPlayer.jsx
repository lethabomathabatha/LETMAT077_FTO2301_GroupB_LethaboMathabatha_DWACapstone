import { useState, useRef, useEffect } from "react";
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone';
import PauseIcon from '@mui/icons-material/Pause';
import { CircularProgress, duration } from "@mui/material";
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
// import { LinearProgress } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';


export default function AudioPlayer({ 
  audioSrc, 
  selectedPodcast, 
  episodeName, 
  currentPlayingEpisodeName, 
  currentPodcastImg,
  setCurrentPlayingEpisodeId,
}) {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [totalDuration, setTotalDuration] = useState(0);

  const handlePlayPause = () => {
    if (isPlaying) {
      // audioRef.current.pause();
      setShowAudioPlayer(false);
    } else {
      // audioRef.current.play();
      setShowAudioPlayer(true);
    }
    setIsPlaying((prevState) => !prevState);
  };

  const handleLoadedData = () => {
    setIsLoading(false);   
  }


 
  useEffect(() => {
    audioRef.current.addEventListener("ended", () => setIsPlaying(false));

    
    // audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetaData)

    
    return () => {
      audioRef.current.removeEventListener("ended", () => setIsPlaying(false))
      // audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetaData)
    }
  }, []);

  useEffect(() => {
    const onPlayPause = (playing) => {
      setIsPlaying(playing);
    };

    if (onPlayPause) {
      onPlayPause(isPlaying)
    }
  }, [isPlaying]);

  function closePlayer() {
    // close audio player when close button is clicked
    const confirmClose = window.confirm("Are you sure you want to close the audio player?")
    if (confirmClose) {
      audioRef.current.pause();
      setShowAudioPlayer(false)
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    // Add an event listener to the beforeunload event
    const handleBeforeUnload = (e) => {
      if (showAudioPlayer) {
        e.preventDefault();
        e.returnValue = "Are you sure you want to close the audio player?";
        return "Are you sure you want to close the audio player?";
      }

    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [showAudioPlayer]);


  return (
    <div>
      <div className="details--audio-player">
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onLoadedData={handleLoadedData}
        />

        {/* Conditionally render the play/pause buttons */}
        {/* stop playing audio when the audio player closes (showAudioPlayer=(false)) */}
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

      {/* Display additional information when audio player is shown */}
      {showAudioPlayer && (
        <div className="audio--bottom-player" 
          style={{ 
            position: "fixed", 
            bottom: 50, 
            left: 0, 
            right: 0, 
            display: "flex", 
            padding: 10, 
            flexDirection: "column",
            zIndex:"9999",
            }}>
          

          <div className="audio--bottom-header">
            <img src={currentPodcastImg} alt="podcast-image" className="audio--bottom-image"/>
            <div className="audio--bottom-text">
              <span className="audio--bottom-title">{selectedPodcast.title}</span>
              <span className="audio--bottom-episode">{episodeName}</span>
            </div>
            <CloseIcon onClick={closePlayer} />
          </div>


          <audio 
            controls 
            autoPlay 
            preload="auto" 
            style={{height:"2rem", width:"100%"}}
            ><source src={audioSrc} type="audio/mpeg" />
          </audio>
        </div>
      )}

    </div>
  );
}
