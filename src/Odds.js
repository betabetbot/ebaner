import { useEffect, useState, useRef } from "react";
import "./App.css";

function Odds({ event }) {
  const [oddsData, setOddsData] = useState([]);
  useEffect(() => {
    fetch(
      `https://eapi.enetpulse.com/preodds/event/?odds_providerFK=180&outcome_typeFK=1&username=brobetapiusr&token=9851ce958d2c588be4eba8597b9d0750&outcome_subtypeFK=1&objectFK=${event.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        let arrTeams = Object.values(data.preodds);
        let odds = [];

        for (let i = 0; i < arrTeams.length; i++) {
          let preodds = arrTeams[i].preodds_bettingoffers;
          odds.push(preodds[Object.keys(preodds)[0]].odds);
        }
        setOddsData(odds);
      });
  }, [event]);

  return (
    <div className="event">
      {oddsData.length ? (
        <>
          <div className="start">{event.startdate}</div>
          <div className="name">{event.name}</div>
          <div className="tournament">{event.tournament_stage_name}</div>
          {oddsData.map((odd, i) => (
            <div key={i} className="blk">
              {odd}
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}

export default Odds;
