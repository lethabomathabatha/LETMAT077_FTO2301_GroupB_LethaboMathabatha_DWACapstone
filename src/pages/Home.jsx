import '/src/pages/HomeStyles.css'
import TopNav from '../components/TopNav';
import TopPicks from "../components/TopPicks";
import Genres from "../components/Genres";
import LatestEps from "../components/LatestEps";
import BottomNav from '../components/BottomNav';

export default function Home() {
  return (
    <div>
        <TopNav />
        <TopPicks />
        <Genres />    
        <LatestEps />  
        <BottomNav />
    </div>
  );
}

