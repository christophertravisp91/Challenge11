// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

// Server set-up
const app  = express();

app.use(express.static("./develop/public"));

// "Get" Request
app.get("/api/notes", (req,res) => {
    readFileAsync(".develop/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

// "Post" Request
app.post("/api/notes", (req,res) => {

})




// HTML Routes
app.get("/notes",  (req,res) => {
    res.sendFile(path.join(__dirname, "develop/public/notes.html"));
});

app.get("/",  (req,res) => {
    res.sendFile(path.join(__dirname, "develop/public/index.html"));
});

app.get("*",  (req,res) => {
    res.sendFile(path.join(__dirname, "develop/public/index.html"));
});

// Listener
app.listen(3001, () => {
    console.log("API server now on port 3001!")
});