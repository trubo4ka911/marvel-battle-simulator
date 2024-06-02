const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://trubo4ka911:f7L9nz0gntgAxoQd@cluster0.3s5uksf.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const heroSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
});

const Hero = mongoose.model("Hero", heroSchema);

app.get("/api/heroes", (req, res) => {
  Hero.find()
    .then((heroes) => res.json(heroes))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/api/heroes", (req, res) => {
  const { name, description, imageUrl } = req.body;
  const newHero = new Hero({ name, description, imageUrl });
  newHero
    .save()
    .then((hero) => res.json(hero))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/api/heroes/:id", (req, res) => {
  Hero.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
