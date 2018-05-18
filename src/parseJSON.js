//understanding how JSON.parse works
const json = JSON.stringify('hello');

console.log(typeof json);
console.log(json); //""hello""

const parsedJson = JSON.parse(json);

console.log(JSON.parse('"hello"'));

console.log(JSON.parse('2'));

console.log(typeof parsedJson);
console.log(parsedJson);

/*
  { key <- string : value }

  primitives:
    boolean
    numbers
    string
*/

/*
  input: has to accept json (string)
  output: 
  
  Base, if the value is primative return the primative value

  base: if the string is empty return ''
  base: if our string === 'true' then return true
  base: if our string === 'false' then return false
  base: if Number function works then return the int
  base: if the string starts with a double quote, 
    return all characters between the double quotes

  recursive: if the value is a reference, we then  
*/

function parseJSON(value) {
  // base cases
  if (value === '') { return '';}
  if (value === 'true') { return true; }
  if (value === 'false') { return false; }

  //if a number needs to be returned
  if (Number(value) || value === '0') { return Number(value); }

  //if a string needs to be returned
  if (value[0] === '"' && value[value.length - 1] === '"') {
    return value.slice(1, -1);
  }

  //recursive cases
  //if an array needs to be returned
  if (value[0] === '[' && value[value.length - 1] === ']') {
    if (value === '[]') { return []; }
    const acc = [];
    const contents = value.slice(1, -1);
    const stringifiedValues = contents.split(',');

    for (let value of stringifiedValues) {
      acc.push(parseJSON(value));
    }
    return acc;
  }
  console.log(value);

  //if an object needs to be returned

  // const input = JSON.stringify({ 'a': { 'a_1': true, 'a_2': {}, 'b': { 'c': 'hello' } } });

  // console.log(input);

  // const output = JSON.parse('{"a":{"a_1":true,"a_2":{},"b":{"c":"hello"}}}');

  // console.log(output);

  if (value[0] === '{' && value[value.length - 1] === '}') {
    if (value === '{}') {
      return {};
    }
    const acc = {};
    let colonIndex;
    for (let i = 1; i < value.length - 1; i++) {
      if (value[i] === ':') {
        colonIndex = i;  //colon index gives the index of the colon
        break;
      }
    }
    const key = value.slice(2, colonIndex - 1);
    console.log(parseBrackets(value, colonIndex - 1));
    const keyValue = value.slice(colonIndex + 1, parseBrackets(value, colonIndex - 1));
    console.log(keyValue);
    acc[key] = parseJSON(keyValue);
    return acc;
  }

//helper function for if an object needs to be returned

function parseBrackets(string, start) {
  //intilize an array stack
  const stack = [];
  const bracketDic = { '{': '}', '[': ']' };
  //iterate through string starting from start
  for (let i = start; i < string.length; i++) {
    let c = string[i];
    //if we come across an open [ or { we can push to stack
    if (c === '[' || c === '{') {
      stack.push(c);
    }
    //if we come across a } or ] we can remove from stack
    if (stack.length === 0 && (c === ',' || c === '}')) {
      return i;
    }
    if ((c === ']' || c === '}') && c === bracketDic[stack[stack.length - 1]]) {
      stack.pop();
    }

    //if array is empty
    // when we come to a , return the end
  }
}

  /*
    look for curly bracket
    return empty objects
 
    find the first colon,
      slice everything before and set the key as a string
      call parseBrackets
        slice from the start and end
        set as the value of the key
      check if we're at the end bracket or a comma
        
 
    "{ a: { b: 'hello' }}"
  */
}

// '{"a":{"a_1":true,"a_2":{},"b":{"c":"hello"}}'
//  0123456789

//parses a string and matches brackets
/*
  input: value -> string
  input: index of "start" (character after the first colon)

  output: index of the "end (the comma outside of the closing bracket)

    stack = [  ]
    ...{"a_1":true,"a_2":},"b":{"c":"hello"}}'

*/
"[12, 'hello', {}]"
["12", " hello", " {}"];


//Test-Suite
// if passed zero, should return zero
console.log(parseJSON(JSON.stringify(0)));

//the type should be a number
console.log(typeof parseJSON(JSON.stringify(0))); // number

// if passing a string, shouldn't return a number
console.log(parseJSON(JSON.stringify('0hello')));

// should return negatives
console.log(parseJSON(JSON.stringify(-1)));
console.log(typeof parseJSON(JSON.stringify(-1)));

// should return floats
console.log(parseJSON(JSON.stringify(0.1)));
console.log(typeof parseJSON(JSON.stringify(0.1)));

console.log(typeof parseJSON('true'));

// "true" -> true

//should return strings
console.log(parseJSON(JSON.stringify('hello')));
console.log(typeof parseJSON(JSON.stringify('hello')));

console.log(parseJSON(JSON.stringify([12, 'hello', true])));
const values = parseJSON(JSON.stringify([12, 'hello', true]));

console.log(parseJSON(JSON.stringify([''])));

values.forEach(val => console.log(typeof val));

//should return empty array if passed empty array
console.log(parseJSON(JSON.stringify([])));

// parse brackets should return index of first comma outside of brackets
//console.log(parseBrackets('{"a_1":true,"a_2":},"b":{"c":"hello"}}'));

//shoud parse simple object
console.log(parseJSON(JSON.stringify({ a: "hello" })));


