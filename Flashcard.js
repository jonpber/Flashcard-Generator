var basic = require("./BasicCard.js");

var cloze = require("./Clozecard.js");

var washington = cloze("George Washington is the first president of us", "George Washington");

console.log(washington.partialText);
console.log(washington.cloze);
console.log(washington.fullText);