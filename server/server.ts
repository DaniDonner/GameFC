import express, { Request, Response, Application, } from "express";
const cors = require('cors');
// const express = require ('express')
import bodyParser from "body-parser";
import { createPlayer, createGame, getGames, checkPlayer} from "./database";

const app: Application = express();
const port = 5001;
// const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));

// Don't change the code above this line!
// Write your enpoints here

// app.get("/api/carts", (req: Request, res: Response) => {
//   try {
//     res.json({ message: "You have reached the Cart API" });
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });
app.post('/api/newplayer', async (req, res) => {
    try {
        const name = req.body.name;
        if (!req.body.name){
            res.status(404).json({ message: "no name" });
        }
    else { 
    await createPlayer(name);
    // console.log(`New player name: ${name}`);
  
    res
    .status(201)
    .json({ message: `created successfully` })  };
  } catch {
    res.status(400).json({ message: "But you are in" });
  }
})

app.post('/api/newgame', async (req, res) => {
    try {
     const game = req.body;
     if (!req.body.gameName){
        res.status(404).json({ message: "no game" });
    }
    else { 
     await createGame(game);
     console.log(game)
   
     res
     .status(201)
     .json({ message: `created successfully` }) };
   } catch {
     res.status(400).json({ message: "But you are in" });
   }
 })


// app.post("/api/newplayer", async (req, res) => {
//   try {
//     const player = await createPlayer(req.body);
//     return res
//       .set("location", `/api/carts/${player.PlayerId}`)
//       .status(201)
//       .json(player);
//   } catch {
//     res.sendStatus(400).json({ message: "But you are in" });
//   }
// });

app.get("/api/games", async (req, res) => {
  try {
    const games = await getGames();
    if (!games) {
      res.status(200).json({ message: "sorry no games" });
    }
    res.status(200).json(games);
  } catch (error) {
    res.sendStatus(500);
  }
});


app.get("/api/player/:playername", async (req, res) => {
    try {
        const player = req.params.playername
        console.log(req.params.playername)
        const vallidation = await checkPlayer(player);
        console.log('server',vallidation)
      res.status(200).json(vallidation);
    } catch (error) {
      res.sendStatus(500);
    }
  });

//   app.get("/api/carts/:cartsId", async (req, res) => {
//     try {
//       const data = await getCart(req.params.cartsId);
//       if (!data) {
//         res.status(404).json({ message: "Cart not found" });
//       }
//       res.status(200).json(data);
//     } catch (error) {
//       res.sendStatus(500);
//     }
//   });

// app.post("/api/carts/:cartId/products/", async (req, res) => {
//   try {
//     const cartId = req.params.cartId;
//     const productId = req.body;
//     if (!req.body.productId || !req.body.quantity) {
//       return res
//         .status(400)
//         .json({ message: "Sorry the information is not complete." });
//     }
//     const cart = await addProductToCart(productId, cartId);
//     if (cart === "cart not found") {
//       return res.status(404).json({ message: "Cart not found" });
//     }
//     if (cart === "product not found") {
//       return res.status(400).json({ message: "Product not found" });
//     } else {
//       res.status(201).json(cart);
//     }
//   } catch (error) {
//     res.sendStatus(404);
//   }
// });

// app.delete(`/api/carts/:cartId`, (req, res) => {
//   try {
//     deleteCart(req.params.cartId);
//     res.status(204).send();
//   } catch (error) {
//     res.sendStatus(204);
//   }
// });

app.listen(5001, () => {console.log("server is listen to port 5001")})
// export = { app };