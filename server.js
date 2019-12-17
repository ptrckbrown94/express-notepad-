// Dependencies

const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Routes

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});
//app.get("*", function(req, res) {
//  res.sendFile(path.join(__dirname, "index.html"));
//});
// Displays notes
app.get("/api/notes", function(req, res) {
  fs.readFile("db.json", "utf8", function(err, notes){
    console.log(notes)
    return res.json(notes);
  });
});

//save notes

const db = require("db.json");

app.post("/api/notes", function(req, res){ //req.body === the stuff from the front end
  console.log(req.body)
  const newArray = [...db, req.body]
  fs.writeFile("db.json", newArray, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});
// // Displays a single character, or returns false
// app.get("/api/notes/:notes", function(req, res) {
//   const chosen = req.params.notes;
//   console.log(chosen);
//   console.log(chosen);
//   for (const i = 0; i < notes.length; i++) {
//     if (chosen === notes[i].routeName) {
//       return res.json(notes[i]);
//     }
//   }
//   return res.json(false);
// });
// // Create New Characters - takes in JSON input
// app.post("/api/notes", function(req, res) {
//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body parsing middleware
//   const newNote = req.body;
//   // Using a RegEx Pattern to remove spaces from newCharacter
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
//   console.log(newNote);
//   characters.push(newNote);
//   res.json(newNote);
// });
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});