import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import '/src/pages/HomeStyles.css'

export default function TopNav() {
    
  const time = new Date().getHours();
  let greeting = "";
  if (time >= 3 && time < 12) {
    greeting = `Good Morning`;
  } else if (time >= 12 && time < 18) {
    greeting = `Good Afternoon`;
  } else if (time >= 18 && time < 24) {
    greeting = `Good Evening`;
  } else {
    greeting = `Good Night`;
  }

  return (
    <nav className="home--navigation">
    <img src="../pods-logo-light.png" width="70px" className="home--logo"/>
      <p className="home--title">{greeting} 
        <WbSunnyOutlinedIcon 
          style={{fontSize: 15}}
        />
      </p>
  </nav>
  )
}