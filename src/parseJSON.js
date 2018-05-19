// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

//understanding JSON.stringify() and JSON.parse()
//a string
var testing = 'hello';
var stringified = JSON.stringify(testing);
console.log(stringified);
console.log(typeof (stringified));
console.log(JSON.parse(stringified));
console.log(typeof (JSON.parse(stringified)));

//a number
var testing1 = 453 - 56;
var stringified = JSON.stringify(testing1);
console.log(stringified);
console.log(typeof (stringified));
console.log(JSON.parse(stringified));
console.log(typeof (JSON.parse(stringified)));

//an array
var testing2 = [5, 'hello', [2, 'love'], { 'a': 'math', 'b': 7 }];
var stringified = JSON.stringify(testing2);
console.log(stringified);
console.log(typeof (stringified));
console.log(JSON.parse(stringified));
console.log(typeof (JSON.parse(stringified)));

//an object
var testing2 = { 'c': 9, 'd': 'calculus', 'e': [2, 'Tintin'], 'f': { 'g': 'book', 'h': 'Enid Blyton' } };
var stringified = JSON.stringify(testing2);
console.log(stringified);
console.log(typeof (stringified));
console.log(JSON.parse(stringified));
console.log(typeof (JSON.parse(stringified)));

// Here is where the code starts
//parseJSON code

var parseJSON = json => {

  // Initial paramater
  var index = 0;
  var character = ' ';

  //helper function next()
  //it assists in moving to the next character in the json string
  //it accepts the character ch to check for expected characters
  //it returns the character at the next index
  var next = ch => {
    //console.log (ch);
    if (ch && ch !== character) {
      throw new SyntaxError("Expected '" + ch + "' instead of '" + character + "'");
    }
    character = json.charAt(index);
    index++;
    return character;
  };

  //helper function whitespace finder
  //clean the whitespace until a character is found
  var whitespace = () => {
    while (character && character <= ' ') {
      next();
    }
  };

  // parseString() - innerParser
  // parse a "string" value
  // return the parsed string
  var parseString = () => {
    var str = '';
    var exception = {
      '"': '"',
      '\\': '\\',
      '/': '/',
      b: '\b',
      f: '\f',
      n: '\n',
      r: '\r',
      t: '\t'
    };

    if (character === '"') {
      while (next()) {
        if (character === '"') {
          next('"');
          return str;
        } else if (character === '\\') {
          next();
          if (typeof exception[character] === 'string') {
            str += exception[character];
          } else {
            break;
          }
        } else {
          str += character;
        }
      }
    }
    throw new SyntaxError('Bad string');
  };  // parseNumber() - innerParser
  // parse a number value [negative, positive, floats]
  // return the parsed number


  var parseNumber = () => {
    var str = "";
    var number;

    if (character === '-') {
      str += '-';
      next();
    }

    while (character >= '0' && character <= '9') {
      str += character;
      next();
    }

    if (character === '.') {
      str += character;
      while (next() && character >= '0' && character <= '9') {
        str += character;
      }
    }
    console.log(str);
    number = Number(str);

    if (isNaN(number)) {
      throw new SyntaxError("Bad number");
    } else {
      return number;
    }
  };

  //parsing an Array. 
  //parseArray() is inner parse function expression
  var parseArray = () => {
    var arr = [];
    if (character === '[') {
      next();
      whitespace();
      if (character === ']') {
        next();
        return arr;
      }
      while (character) {
        arr.push(parseValue());
        whitespace();
        if (character === ']') {
          next();
          return arr;
        }
        next();
        whitespace();
      }
    }
    throw new SyntaxError('Bad array');
  };

  //parsing an Object
  // parseObject() is inner parse function expression
  var parseObject = () => {
    var obj = {};

    if (character === '{') {
      next();
      whitespace();
      if (character === '}') {
        next();
        return obj;
      }
      while (character) {
        var key = parseString();
        whitespace();
        next(':');
        var value = parseValue();
        obj[key] = value;
        whitespace();
        if (character === '}') {
          next();
          return obj;
        }
        next(',');
        whitespace();
      }
    }
    throw new SyntaxError('Bad object');
  };

  // parseSpecial() - innerParser
  // parse some special values [booleans, null]  
  var parseSpecial = () => {
    if (character === 't') {
      next('t');
      next('r');
      next('u');
      next('e');
      return true;
    }

    if (character === 'f') {
      next('f');
      next('a');
      next('l');
      next('s');
      next('e');
      return false;
    }

    if (character === 'n') {
      next('n');
      next('u');
      next('l');
      next('l');
      return null;
    }
  };

  // main function parseValue() 
  // call the right parser depending on what he need to parse [string, number, array, object, special]
  // return the innerParser result accordingly
  var parseValue = () => {
    whitespace();
    if (character === '"') {
      return parseString();
    } else if (character === '-' || character >= '0' && character <= '9') {
      return parseNumber();
    } else if (character === '[') {
      return parseArray();
    } else if (character === '{') {
      return parseObject();
    } else {
      return parseSpecial();
    }
  };

  return parseValue();
};

// testing the parsing function
var json = JSON.stringify('713-385.7101');
console.log(parseJSON(json));

