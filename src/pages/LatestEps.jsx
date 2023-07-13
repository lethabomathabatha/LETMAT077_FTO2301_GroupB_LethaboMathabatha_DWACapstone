import { useEffect, useState } from "react";

export default function LatestEps() {
    const [latestEp, setLatestEp] = useState([]);

    useEffect(() => {
        fetch("https://podcast-api.netlify.app/shows")
        .then((res) => res.json())
        .then((data) => {
            setLatestEp(data);
            console.log(data)
        })
        .catch((error) => console.log(error));
    }, []);

    return (
        <div className="latest--podcasts">
            <h3>Latest Episodes</h3>
            
            {latestEp.map((data) => {
            return (
                <div key={data.id} className="latest--card">
                    
                    <li className="latest--card-label">{data.title} : {data.updated}</li>
                    {/* <h2 className="home--card-genres"> <strong>Genres</strong> {data.genres}</h2> */}
                    
                </div>
            );
            })}
           
            
        </div>
        

    )
}