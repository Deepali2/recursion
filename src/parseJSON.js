const json = JSON.stringify('hello');

console.log(typeof json);
console.log(json); //""hello""

const parsedJson = JSON.parse(json);

console.log(JSON.parse('"hello"'));

console.log(JSON.parse('2'));


/*
  { key <- string : value }

  primitives:
    boolean
    numbers
    string
*/

console.log(typeof parsedJson);
console.log(parsedJson);


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

function parse(value) {
  // base cases
  if (value === '') return '';
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (Number(value) || value === '0') return Number(value);
  if (value[0] === '"' && value[value.length - 1] === '"') {
    return value.slice(1, -1);
  }

  //recursive cases
  if (value[0] === '[' && value[value.length - 1] === ']') {
    if (value === '[]') return [];
    const acc = [];
    const contents = value.slice(1, -1);
    const stringifiedValues = contents.split(',');

    for (let value of stringifiedValues) {
      acc.push(parse(value));
    }
    return acc;
  }
  console.log(value);
  if (value[0] === '{') {

    if (value === '{}') {
      return {};
    }
    const acc = {};
    let colonIndex;
    for (let i = 1; i < value.length; i++) {
      if (value[i] === ':') {
        colonIndex = i;
        break;
      }
    }
    const key = value.slice(2, colonIndex - 1);
    console.log(parseBrackets(value, colonIndex - 1))
    const keyValue = value.slice(colonIndex + 1, parseBrackets(value, colonIndex - 1));
    console.log(keyValue)
    acc[key] = parse(keyValue);
    return acc;
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
    //if we come across an } or ] we can remove from stack
    if (stack.length === 0 && (c === ',' || c === '}')) {
      return i;
    }
    if ((c === ']' || c === '}') && c === bracketDic[stack[stack.length - 1]]) {
      stack.pop();
    }

    //if array is empty
    // when we come to an , return the end
  }
}


"[12, 'hello', {}]"
["12", " hello", " {}"];


//Test-Suite
// if passed zero, should return zero
console.log(parse(JSON.stringify(0)));

//the type should be a number
console.log(typeof parse(JSON.stringify(0))) // number

// if passing a string, shouldn't return a number
console.log(parse(JSON.stringify('0hello')))

// should return negatives
console.log(parse(JSON.stringify(-1)));
console.log(typeof parse(JSON.stringify(-1)));

// should return floats
console.log(parse(JSON.stringify(0.1)))
console.log(typeof parse(JSON.stringify(0.1)));

console.log(typeof parse('true'));

// "true" -> true

//should return strings
console.log(parse(JSON.stringify('hello')))
console.log(typeof parse(JSON.stringify('hello')));

console.log(parse(JSON.stringify([12, 'hello', true])));
const values = parse(JSON.stringify([12, 'hello', true]));

console.log(parse(JSON.stringify([''])));

values.forEach(val => console.log(typeof val));

//should return empty array if passed empty array
console.log(parse(JSON.stringify([])));

// parse brackets should return index of first comma outside of brackets
console.log(parseBrackets('{"a_1":true,"a_2":},"b":{"c":"hello"}}'))

//shoud parse simple object
console.log(parse(JSON.stringify({ a: "hello" })))


