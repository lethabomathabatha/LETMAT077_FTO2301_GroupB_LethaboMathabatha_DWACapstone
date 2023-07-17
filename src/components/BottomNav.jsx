import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search"
import '/src/pages/HomeStyles.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';



export default function BottomNav() {
const [homeIconColor, setHomeIconColor] = useState("#3D2A75");

    function sendToHome() {
        window.location.href = "/";
        setHomeIconColor("#3D2A75");

        // change icon color
        // document.getElementsByClassName("home--icon")[0].style.color = "#3D2A75";

    }
    function sendToLogin() {
        window.location.href = "/login";
    }

    return (
        <div className="bottom-nav">
          <HomeOutlinedIcon 
            className="home--icon"
            onClick={sendToHome}
            style={{cursor: "pointer", color: homeIconColor}}
    
          />

          <SearchIcon 
            className="search--icon"
            style={{cursor: "pointer"}} 
          />

          <FavoriteBorderOutlinedIcon
            className="favorite--icon"
            style={{cursor: "pointer"}}
          />

          <PermIdentityOutlinedIcon 
            className="profile--icon"
            // onClick, take the user to /login
            onClick={sendToLogin}
            style={{cursor: "pointer"}}
          />
        </div>
    )
}