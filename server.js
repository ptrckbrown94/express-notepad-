// Dependencies

const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser")
// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});
//app.get("*", function(req, res) {
//  res.sendFile(path.join(__dirname, "index.html"));
//});
// Displays notes
app.get("/api/notes", function (req, res) {
  fs.readFile("db.json", "utf8", function (err, notes) {
    console.log(notes)
    return res.json(notes);
  });
});

//save notes


app.post("/api/notes", function (req, res) { //req.body === the stuff from the front end
let db;
let newNote = req.body;

  fs.readFile("db.json", "utf8", function (err, notes) {
    db = JSON.parse(notes)
    combineNewWithOld();
  });
  
  // console.log("db" + db)
  console.log(newNote)
function combineNewWithOld(){

  db.push(newNote)
  console.log(db)
  fs.writeFile("db.json", JSON.stringify(db), (err) => {
    
    if (err) throw err;
    console.log('The file has been saved!');
    res.sendfile(path.join(__dirname,"db.json"));
  });
}
})
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

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
})
