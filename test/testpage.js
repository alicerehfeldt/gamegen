'use strict';
let express = require('express');
let app = express();

let gamegen = require('../src/index');

app.get('/', function (req, res) {

  let list = '';

  for (let i = 0; i < 200; i++) {
    let game = gamegen();
    list += `<p>${i+1}. ${game.string} (${game.string.length})</p>`;
  }
  let page = `
<!doctype html>
<html>
  <head>
    <title>gamegen test page v2</title>
  </head>
  <body>
    ${list}
  </body>
</html>`;

  res.send(page);
});

app.listen(3000, function() {

});