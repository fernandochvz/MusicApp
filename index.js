// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB URI and LastFM API key
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/musicdb";
const LASTFM_API_KEY =
  process.env.LASTFM_API_KEY || "fcbdf5da1f5d312150845137d29db1bd";

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}
connectToMongoDB();

// Define album schema and model
const albumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  year: Number,
});
const Album = mongoose.model("Album", albumSchema);

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API routes
app.get("/api/getall", async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/add", async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/update/:id", async (req, res) => {
  try {
    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAlbum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Album deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search albums using LastFM API
app.get("/api/lastfmsearch/:query", async (req, res) => {
  try {
    const response = await axios.get("http://ws.audioscrobbler.com/2.0/", {
      params: {
        method: "album.search",
        album: req.params.query,
        api_key: LASTFM_API_KEY,
        format: "json",
        limit: 10,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Function to add or update an album
app.post("/api/addOrUpdateAlbum", async (req, res) => {
  try {
    const id = req.body._id;
    const title = req.body.title;
    const artist = req.body.artist;
    const year = req.body.year;

    const albumData = { title, artist, year };

    if (id) {
      const updatedAlbum = await Album.findByIdAndUpdate(
        id,
        albumData,
        { new: true }
      );
      res.status(200).json(updatedAlbum);
    } else {
      const newAlbum = new Album(albumData);
      await newAlbum.save();
      res.status(201).json(newAlbum);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
