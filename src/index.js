import data from 'data';

const charCodeBase = 98;

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

function intdecode(code) {
  if (code.length > 1) {

  }

  

  
}

function decode(code) {
  let keys = {};
  code.match(/([A-Z])([a-z]+)/g).forEach((match) => {
    let keyCode = match[0];
    if (!data.keys[keyCode]) {
      throw new Error("invalid code");
    }
    let key = data.keys[keyCode];

  });
}

function generate() {
  let code;  
  function parse(string) {
    let regex = /{{(.*?)}}/g;
    return string.replace(regex, (match, key, offset) => {
      if (!data[key]) {
        return match;
      }

      let options = data[key];
      let index = rand(0, options.length);
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
  let string = parse('{{format}}');
  // capitalize first character
  string = string.replace(/^[a-z]/, (match) => {
    return match.toUpperCase();
  });

  return {
    string: string,
    code: code
  };
}

window.addEventListener('DOMContentLoaded', function(){ 

  let game = generate();

  document.body.innerHTML = `<h1>${game.string}</h1>`;
  console.log('CODE', game.code);
  decode(game.code);
  //window.history.pushState(null, null, `/${game.code}`);
});
