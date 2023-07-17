import SearchIcon from "@mui/icons-material/Search"
import '/src/pages/HomeStyles.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';



export default function BottomNav() {
    return (
        <div className="home--bottom-nav">
          <HomeOutlinedIcon />
          <SearchIcon />
          <FavoriteBorderOutlinedIcon />
          <PermIdentityOutlinedIcon />
        </div>
    )
}