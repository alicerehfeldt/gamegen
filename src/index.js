'use strict';
let fs = require('fs');
let data = require('./data');

const lastPath = __dirname + '/last.json';
const charCodeBase = 98;

let last;

// inverse shortcodes and keys
data.keys = {};
for(let k in data.shortcodes) {
  let v = data.shortcodes[k];
  data.keys[v] = k;
}


function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function intcode(int) {
  let base = '';
  if (int > 25) {
    base = intcode(int - 25);
    int -= 25;
  }
  return String.fromCharCode(122 - int) + base;
}

function getFormat() {

  if (last.format !== 'base') {
    last.format = 'base';
    return data.format[0];
  }


  let int = rand(0,100);
  // Exploration
  if (int > 90) {
    last.format = 'exploration';
    return data.format[2];
  // Clone
  } else if (int < 20) {
    last.format = 'clone';
    return data.format[1];
  }
  return data.format[0];
}



function decode(code) {
  let keys = {};
  code.match(/([A-Z])([a-z]+)/g).forEach(function(match){
    let keyCode = match[0];
    if (!data.keys[keyCode]) {
      throw new Error("invalid code");
    }
    let key = data.keys[keyCode];

  });
}


function loadLast() {
  return JSON.parse(fs.readFileSync(lastPath, 'utf8'));
}

function saveLast(last) {
  fs.writeFileSync(lastPath, JSON.stringify(last, null, ' '));
}



function getIndex(key) {
  let options = data[key];
  let index;
  let totalOptions = options.length;

  // check if last exists for key
  if (!last[key]) {
    index = rand(0, totalOptions);
    last[key] = [index]
  } else {
    let done = false;
    let tries = 0;
    while (!done) {
      tries++;
      index = rand(0, totalOptions);
      done = (last[key].indexOf(index) === -1);
      // Prevent infinite loops
      if (!done && tries > 50) {
        console.log('GAVE UP');
        done = true;
      }
    }

    last[key].push(index);
    if (last[key].length >= (totalOptions * 0.75)) {
      last[key].shift();
    }
  }
  return index;
}



function generate() {
  let code;  

  function parse(string) {
    let regex = /{{(.*?)}}/g;
    return string.replace(regex, function(match, key, offset){
      if (!data[key]) {
        return match;
      }

      let options = data[key];
      let index = getIndex(key);
      let value = options[index];

      let shortcode = data.shortcodes[key];

      code += shortcode + intcode(index);

      if (value.match(regex)) {
        return parse(value);
      }
      return value;
    });
  }

  code = '';
  last = loadLast();
  let format = getFormat();
  let string = parse(format);
  // capitalize first character
  string = string.replace(/^[a-z]/, function(match) {
    return match.toUpperCase();
  });

  saveLast(last);

  return {
    string: string,
    code: code
  };
}

module.exports = generate;
