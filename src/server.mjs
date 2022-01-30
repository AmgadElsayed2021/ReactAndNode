import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();
app.use(bodyParser.json());
// app.get("/hello", (req, res) => res.send("Hello Amgad!"));
// app.post("/hello", (req, res) => res.send(`hello ${req.body.name}`));
// app.get("/hello/:name", (req, res) => res.send(`hello ${req.params.name}`));
app.get("/api/movies", async (req, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
    });
    const db = client.db("my-movies");
    const movieInfo = await db.collection("movies").find({}).toArray();
    console.log(movieInfo);
    res.status(200).json(movieInfo);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});
app.listen(8000, () => console.log("App is listening on port 8000"));
