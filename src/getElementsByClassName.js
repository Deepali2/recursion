// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
/** 
 * input: className as a string, node
 * outpput: array
 * pseudocode:
 * define an output Array called matchingElements
 * set node as document.body on the first run
 *   check if node is a match
 *     push node to matching elements
 * concat matchingElements with the result of running getElementsBy ClassName on each child
*/
var getElementsByClassName = function(className, node = document.body) {
  var matchingElements = [];
  if (node.className && node.className.includes(className)) {
    matchingElements.push(node);
  }
  node.childNodes.forEach(child => {
    matchingElements = matchingElements.concat(getElementsByClassName(className, child));
  });
  return matchingElements;
};
