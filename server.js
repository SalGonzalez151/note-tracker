const express = require('express');
const fs = require('fs')
const path = require('path');
const { readFromFile, readAndRemove, readAndAppend } = require('./helpers/fsUtils')

//function to create a random number for the notes
function randomNumber() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//home path to notes html page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//get path to api/notes
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then(data => res.json(JSON.parse(data)));
})

//post path to api/notes and puts id on the notes
app.post('/api/notes/', (req, res) => {
   const newNotes = {title: req.body.title, text: req.body.text, id: randomNumber()}
   readAndAppend(newNotes, './db/db.json')
   res.json(newNotes)
});

app.delete('/api/notes/:id', (req, res) => {
    readAndRemove(req.params.id, './db/db.json');
    res.json('note deleted')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))