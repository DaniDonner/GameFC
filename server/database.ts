
const { MongoClient, ServerApiVersion } = require('mongodb');
import { v4 as uuidv4 } from "uuid";
import { Player,Game,Dbgame } from "./types";



// client.connect(err => {
//   const collection = client.db("sample_airbnb").collection('Mustafa');
//   // perform actions on the collection object
//   client.close()});

const uri = "mongodb+srv://daangeven:123456789D.@meerkats1.hk3d0eh.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const database = "GameFC";
const colplayers = "Players1";
const colgames = "games";
const generateCartId = () => uuidv4();

  const createPlayer = async (name: string) => {
    const newPlayer: Player = {
      PlayerId : generateCartId(),
      Name: name,
      Ownedgames: [],
    };
    
    try {
    const client = await MongoClient.connect(uri);
    const db = client.db(database);
    const collection = db.collection(colplayers);
    await collection.insertOne(newPlayer);
    await client.close();

      console.log(newPlayer)
    } catch (error) {
      throw error;
    }
  };


  const createGame = async (game: Game) => {
    const newGame: Dbgame = {
      gameId: generateCartId(),
      gameName: game.gameName,
      date: game.date,
      time: game.time,
      players: game.players,
    };
    
    try {
    const client = await MongoClient.connect(uri);
    const db = client.db(database);
    const collection = db.collection(colgames);
    await collection.insertOne(newGame);
    await client.close();

      console.log(newGame)
    } catch (error) {
      throw error;
    }
  };

  const getGames = async () => { 
    try {
    const client = await MongoClient.connect(uri);
    const db = client.db(database);
    const collection = db.collection(colgames);
    const games = await collection.find({}).toArray();
    await client.close();
    return games

    } catch (error) {
      throw error;
    }
  };
  
  const checkPlayer = async (valplayer: string) => {
    try {
      const name = valplayer
      const client = await MongoClient.connect(uri);
      const db = client.db(database);
      const collection = db.collection(colplayers);
      const player = await collection.findOne({ Name: `${name}` });
      console.log('db',player)
      await client.close();
      return player
    } catch (error) {
      throw error;
    }
  };
  
  // const updateCart = async (cartId, changedCart) => {
  //   try {
  //     const client = await new MongoClient.connect(uri, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     });
  //     const db = client.db(database);
  //     const collection = db.collection(col);
  //     await collection.updateOne(
  //       { cartId: cartId },
  //       {
  //         $set: {
  //           products: changedCart.products,
  //           totalNumberOfItems: changedCart.totalNumberOfItems,
  //           totalPrice: changedCart.totalprice,
  //         },
  //       }
  //     );
  //     await client.close();
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  
  // const deleteCartDb = async (cartId) => {
  //   try {
  //     const client = await new MongoClient.connect(uri, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     });
  //     const db = client.db(database);
  //     const collection = db.collection(col);
  //     await collection.deleteOne({ cartId: cartId });
  //     await client.close();
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  export {
    createPlayer,
    createGame,
    getGames,
    checkPlayer,
  };