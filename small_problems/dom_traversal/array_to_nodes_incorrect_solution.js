// Implement a function that converts a nested array of nodeNames (see Nodes to Array exercise for examples) to nodes. Go over the sample code and the corresponding return values below as a guide for what you will implement.

// error on first round: output HTML string instead of nodes!

function arrayToNodes([nodeTag, nodeChildren]) {
  const current = document.createElement(nodeTag);

  if (nodeChildren.length === 0) {
    return current;
  } else {
    for (child of nodeChildren) {
      current.appendChild(arrayToNodes(child));
    }
  }

  return current;
  // let newTag = `<${nodeTag.toLowerCase()}>`;
  // let newClosingTag = newTag.replace('<', '</');

  // let indent = ' '.repeat(generation * 2);

  // output = indent + newTag;

  // if (nodeChildren.length === 0) {
  //   return output + newClosingTag;
  // } else {
  //   output += '\n';
  //   for (const child of nodeChildren) {
  //     output += arrayToNodes(child, generation + 1);
  //     output += '\n';
  //   }

  //   return output + indent + newClosingTag;
  // }
}

let nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];
console.log('example 1');
console.log(arrayToNodes(nodes));

// <body>
//   <header></header>
//   <main></main>
//   <footer></footer>
// </body>

nodes = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]];
console.log('\nexample 2');
console.log(arrayToNodes(nodes));

// <body>
//   <div>
//     <div></div>
//     <div>
//       <div></div>
//     </div>
//   </div>
//   <div></div>
//   <div>
//     <div></div>
//     <div></div>
//     <div></div>
//   </div>
// </body>
