var express = require('express');
const { createUser, getUser, updateUser, deleteUser } = require('./utils');


var app = express();

app.use(express.json());


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/users', (req, res) => {
    let body = req.body;
    const newUser = createUser(body);
    res.status(201).json(newUser);
 });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

