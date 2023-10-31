const express = require('express');
const fs = require('fs')
const path = require('path');

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const notes = require('./db/db.json');
    res.json(notes)
})

app.post('/api/notes', (req, res) => {
    const notes = require('./db/db.json');
    const newNotes = req.body;
    notes.push(newNotes);
    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), err => {
        if (err) throw err;
        res.json({
            message: 'Note saved!'
        })
    })
})













app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))