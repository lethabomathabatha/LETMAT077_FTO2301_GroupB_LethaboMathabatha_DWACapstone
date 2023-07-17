import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import '/src/pages/HomeStyles.css'

export default function TopNav() {
    
    // greeting based on the time of day
  // let user = JSON.parse(localStorage.getItem("user"));
  let user = "Lethabo"
  const time = new Date().getHours();
  // if it's before 12pm, it's morning, if it's after 12pm but before 6pm, it's afternoon, if it's after 6pm but before 3am, it's evening
  let greeting = "";
  if (time >= 3 && time < 12) {
    greeting = `Good Morning, ${user} `;
  } else if (time >= 12 && time < 18) {
    greeting = `Good Afternoon, ${user} `;
  } else if (time >= 18 && time < 24) {
    greeting = `Good Evening, ${user} `;
  } else {
    greeting = `Good Night, ${user} `;
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