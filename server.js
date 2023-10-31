const express = require('express');
const fs = require('fs')
const path = require('path')

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))