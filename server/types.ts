
type Game = {
gameName: string,
date: string,
time: string,
players: [],
}

interface Dbgame extends Game {
  gameId: string,
}

 type Player = {
   PlayerId : string,
   Name: string
   Ownedgames : [],
 };

//  type Valplayer = {
//   name: string,
//  }

export { Game, Dbgame, Player };
