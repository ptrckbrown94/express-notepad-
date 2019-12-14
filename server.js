// Dependencies

const express = require("express");
const path = require("path");

const index = require("notes");
const note2 = require("index");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// array to hold the notes (DATA)

const notes = [
  {
    
  },
  {
 
  },
  {

  }
];
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});
// Displays notes
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});
// Displays a single character, or returns false
app.get("/api/notes/:notes", function(req, res) {
  const chosen = req.params.notes;
  console.log(chosen);
  for (const i = 0; i < notes.length; i++) {
    if (chosen === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }
  return res.json(false);
});
// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNote = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  console.log(newNote);
  characters.push(newNote);
  res.json(newNote);
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});