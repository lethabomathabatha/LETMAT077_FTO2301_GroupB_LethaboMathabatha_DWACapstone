import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search"
import '/src/pages/HomeStyles.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';



export default function BottomNav() {
const [iconColor, setIconColor] = useState("");

    function sendToHome() {
        window.location.href = "/";
        setIconColor("#3D2A75");

        // change icon color
        // document.getElementsByClassName("home--icon")[0].style.color = "#3D2A75";

    }

    function sendToSearch() {
        window.location.href = "/search";
        setIconColor("#3D2A75");
    }

    function sendToLogin() {
        window.location.href = "/login";
        setIconColor("#3D2A75");
    }

    function sendToFavourites() {
      window.location.href = "/favourites";
      setIconColor("#3D2A75");
  }

    return (
        <div className="bottom-nav">
          <HomeOutlinedIcon 
            className="home--icon"
            onClick={sendToHome}
            style={{cursor: "pointer", color: iconColor}}
    
          />

          <SearchIcon 
            className="search--icon"
            onClick={sendToSearch}
            style={{cursor: "pointer", color: iconColor}}
          />

          <FavoriteBorderOutlinedIcon
            className="favourite--icon"
            onClick={sendToFavourites}
            style={{cursor: "pointer", color: iconColor}}
          />

          <PermIdentityOutlinedIcon 
            className="profile--icon"
            // onClick, take the user to /login
            onClick={sendToLogin}
            style={{cursor: "pointer", color: iconColor}}
          />
        </div>
    )
}