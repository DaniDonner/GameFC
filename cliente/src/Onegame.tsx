import React, { useRef, useState, useEffect } from 'react';
import GameInfo from './GameInfo'


interface Game {
  gameId: string,
  gameName: string,
  date: string,
  time: string,
  players: [],
  }
  
  interface Dbgame extends Game {
    gameId: string,
  }   

  export const Onegame = (props: { game: Game }) => {
    const [moreInfo, setMoreInfo ] = useState(false)

    const handleToggle = () => {
      setMoreInfo(!moreInfo);
    };
  
    return (
      <div>{props.game.gameName}
      <button onClick={handleToggle}>
        game
      </button>      
      {moreInfo &&<div> 
      <p>Date:{props.game.date}</p>
      <p>Time:{props.game.time}</p>
      <p>Players{props.game.players}</p>
      <button>join</button>

        </div>}
      </div>
    )
  }


export default Onegame