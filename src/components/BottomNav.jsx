import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '/src/pages/HomeStyles.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

export default function BottomNav() {
  const location = useLocation();
  const [iconColor, setIconColor] = useState('#EEDDEF');

  function handleIconClick() {
    setIconColor('#3D2A75');
  }

  return (
    <div className="bottom-nav">
      <Link to="/" onClick={handleIconClick} style={{ textDecoration: 'none' }}>
        <HomeOutlinedIcon
          className="home--icon"
          style={{
            cursor: 'pointer',
            color: location.pathname === '/' ? '#3D2A75' : iconColor,
          }}
        />
      </Link>

      <Link to="/search" onClick={handleIconClick} style={{ textDecoration: 'none' }}>
        <SearchIcon
          className="search--icon"
          style={{
            cursor: 'pointer',
            color: location.pathname === '/search' ? '#3D2A75' : iconColor,
          }}
        />
      </Link>

      <Link to="/favourites" onClick={handleIconClick} style={{ textDecoration: 'none' }}>
        <FavoriteBorderOutlinedIcon
          className="favourite--icon"
          style={{
            cursor: 'pointer',
            color: location.pathname === '/favourites' ? '#3D2A75' : iconColor,
          }}
        />
      </Link>

      <Link to="/login" onClick={handleIconClick} style={{ textDecoration: 'none' }}>
        <PermIdentityOutlinedIcon
          className="profile--icon"
          style={{
            cursor: 'pointer',
            color: location.pathname === '/login' ? '#3D2A75' : iconColor,
          }}
        />
      </Link>
    </div>
  );
}