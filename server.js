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


  console.log(newNote)
  function combineNewWithOld() {

    console.log("array count " + db.length)
    let noteCount = db.length;
    newNote.id = noteCount;

    db.push(newNote)
    console.log(db)
    fs.writeFile("db.json", JSON.stringify(db), (err) => {

      if (err) throw err;
      console.log('The file has been saved!');
      res.sendfile(path.join(__dirname, "db.json"));
    });
  }
})



//delete note function

app.delete("/api/notes/:id", function (req, res) {
  let id = req.params.id;
  let db = [];
  console.log("delete note ID " + req.params.id)

  let noteData = fs.readFileSync("db.json");
  console.log("db.json = " + noteData);
  db = JSON.parse(noteData);
  // found slice at https://flaviocopes.com/how-to-remove-item-from-array/
  let dbFiltered = db.slice(0, id)
  console.log("db length" + db.length)
  dbFiltered.concat(db.slice(id + 1, db.length - 1))

  // fs.readFile("db.json", "utf8", function (err, notes) {
  //   if (err) throw err;
  //   console.log("notes array = " + notes);
  //   db = JSON.parse(notes);
  //   // found slice at https://flaviocopes.com/how-to-remove-item-from-array/
  //   db = db.slice(0, id).concat(db.slice(id + 1, db.length))
  // });

  // save db now that the note is deleted and sent it to client
  fs.writeFile("db.json", JSON.stringify(dbFiltered), (err) => {

    if (err) throw err;
    console.log('The file has been saved!' + JSON.stringify(dbFiltered));
    res.sendfile(path.join(__dirname, "db.json"));

  });

});

// Starts the server to begin listening

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
