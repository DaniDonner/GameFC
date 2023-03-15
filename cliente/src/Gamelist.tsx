import React,  { useRef, useState, useEffect } from "react";
import Onegame from './Onegame';



// interface FormInPut {
   
//     gameName: string
//     date: string
//     time: string
//     players: []
//   }

    interface Game {
        gameName: string,
        date: string,
        time: string,
        players: [],
        }
        
        interface Dbgame extends Game {
          gameId: string,
        }   

   

export const Gamelist = () => {
       
    const [formInPut, setFormInput] = useState<Game>(
        {
            gameName:'' ,
            date:  '' ,
            time: '',
            players: [],
        }
    );

    const [games, setGames] = useState<Dbgame[]>([]);
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5001/api/games");
            const games = await response.json();
            setGames(games);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5001/api/newgame", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formInPut),
            });
            // if (response.ok) {
            //   return response;
            // }
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: Dbgame = await response.json();
            setFormInput(data);
            setGames([...games, data]);
          } catch (error) {
            console.error("Error sending request:", error);
          }
        };
        fetchData();
      }, [formInPut]);
    
      const inputForm = useRef<HTMLFormElement>(null);
    
      
      const submitInput = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(inputForm.current!);
        if (!formData.get("First_name") || !formData.get("Last_name")) {
          alert("Please fill in all the fields");
        } else {
            const gameName = formData.get("First_name") as string;
            const date = formData.get("Last_name") as string;
            const time = formData.get("time") as string;
            const players:[] = []
            setFormInput({ gameName, date, time, players});
            // setGames([...games, formInPut]);
          inputForm.current!.reset();
        }
    }
    
      const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.key === "Enter") {
          submitInput(event);
        }
      };
    
    




  return (
    <div>Gamelist
         <form
      className="input__form"
      id="addDeveloperForm"
      onSubmit={submitInput}
      ref={inputForm}
    >
      <label>Game name:</label>
      <input
        type="text"
        className="input__form--name addDeveloperFirstNameInput"
        name="First_name"
        placeholder="Enter first name"
      ></input>
      <label>Date:</label>
      <input
        type="date"
        className="input__form--name addDeveloperLastNameInput"
        name="Last_name"
        placeholder="Enter last name"
      ></input>
          <input
        type="time"
        className="input__form--name addDeveloperLastNameInput"
        name="time"
        placeholder="Enter last name"
      ></input>
      <button
        className="Bootcamp__selecter--button addDeveloperBtn"
        id="addDeveloperBtn"
        type="submit"
      >
        Create game
      </button>
    </form>

    <div>
    {games && games.map((item : Game & Dbgame )=>{
       return (
        <Onegame key={item.gameId} game={item} />
     );})}
        </div>

    
    </div>
  );
}
export default Gamelist;