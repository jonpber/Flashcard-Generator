var basic = require("./BasicCard.js");
var cloze = require("./Clozecard.js");

function createCard(front, back, type){
	if (type === "Basic"){
		var tempCard = basic(front, back);
		console.log(tempCard);
	}
}


