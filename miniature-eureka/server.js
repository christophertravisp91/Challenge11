// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


// Server set-up
const app  = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./develop/public"));

// "Get" Request
app.get("/api/notes", (req, res) => {
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

// "Post" Request
app.post("/api/notes", (req, res) => {
    const note = req.body;
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});


// HTML Routes
app.get("/notes",  (req, res) => {
    res.sendFile(path.join(__dirname, "develop/public/notes.html"));
});

app.get("/",  (req, res) => {
    res.sendFile(path.join(__dirname, "develop/public/index.html"));
});

app.get("*",  (req, res) => {
    res.sendFile(path.join(__dirname, "develop/public/index.html"));
});

// Listener
app.listen(port, () => {
    console.log("API server now on port " + port + "!")
});