const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const pug = require('pug');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','pug');


app.use(express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/users', async (req, res) => {
  const { username } = req.body;
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();

  const profile  = pug.compileFile('views/components/profile.pug');
  res.send(profile(data));
});


app.listen(PORT);
console.log('root app listening on port: 3000');
