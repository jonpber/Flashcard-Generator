var basic = require("./BasicCard.js");
var cloze = require("./Clozecard.js");
var inquirer = require("inquirer");
var nodefs = require('fs');
var quizCounter = 0;
var cardDeck = [];

function createCard(type, frontText, backCloze){
	var tempCard;
	if (type === "Basic"){
		tempCard = basic(frontText, backCloze);
		
	}

	else {
		tempCard = cloze(frontText, backCloze);
	}

	nodefs.appendFile('../../cards.txt', "\r\n" + JSON.stringify(tempCard), function (err) {
		if (err) throw err;
	});
}

function flashCardApp(){
	inquirer.prompt([
	{
		name: "menu",
		message: "Welcome to the flashcard generator. What would you like to do?",
		type: "list",
		choices: ["Make a Flashcard", "Quiz Yourself", "Quit"]
	}
		]).then(function(menuResponse){
			if(menuResponse.menu === "Make a Flashcard"){
				makeCardMenu();
			}

			else if(menuResponse.menu === "Quiz Yourself"){
				quiz();
			}

			else {
				return;
			}
		})
}



function shuffleCards(){
		nodefs.readFile('../../cards.txt', "utf8", function(err, data) {
			cardDeck = data.split("\r\n");
			for (var i = 0; i < cardDeck.length; i++){
				cardDeck[i] = JSON.parse(cardDeck[i]);
			}

			var currentIndex = cardDeck.length; 
			var tempValue; 
			var randomIndex;

			while (currentIndex !== 0){
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				tempValue = cardDeck[currentIndex];
				cardDeck[currentIndex] = cardDeck[randomIndex];

				cardDeck[randomIndex] = tempValue;
			}
		});
		
	}

shuffleCards();

function quiz(){
	var question;

	if (cardDeck[quizCounter].hasOwnProperty("front")){
		question = cardDeck[quizCounter].front;
	}

	else {
		question = cardDeck[quizCounter].partialText;
	}

	inquirer.prompt([
	{
		message: question,
		name: "quizQuestion"
	}

	]).then(function(questionAnswer){
		var answer;
		if (cardDeck[quizCounter].hasOwnProperty("back")){
			answer = cardDeck[quizCounter].back
		}

		else {
			answer = cardDeck[quizCounter].cloze;
		}

		if (questionAnswer.quizQuestion === answer){
			console.log("Well done! That was the correct answer.\r\n")
		}

		else {
			console.log("Sorry! " + answer + " was the correct answer!\r\n");
		}

		if (quizCounter < 2){
			quizCounter += 1;
			quiz();
		}
	})
}


function makeCardMenu(){
	inquirer.prompt([
	{
		name: "cardType",
		message: "What type of card would you like to make?",
		type: "list",
		choices: ["Basic", "Cloze"]
	}

		]).then(function(cardTypeResponse){
			if(cardTypeResponse.cardType === "Basic"){
				inquirer.prompt([
					{
						name: "basicFront",
						message: "Please type the text for the card front (e.g. 'Who was the First President of the US?')"
					},

					{
						name: "basicBack",
						message: "Please type the text for the card back (e.g. 'George Washington')"
					}

				]).then(function(cardTypeResponse){
					createCard("Basic", cardTypeResponse.basicFront, cardTypeResponse.basicBack);
					flashCardApp();
				})
			}

			else {
				inquirer.prompt([
					{
						name: "clozeFullText",
						message: "Please type the full text for the card front (e.g. 'George Washington was the First President of the US?')"
					},

					{
						name: "clozeCloze",
						message: "Please type the cloze text for the card to be blanked out (e.g. 'George Washington')"
					}

				]).then(function(cardTypeResponse){
					if (cardTypeResponse.clozeFullText.includes(cardTypeResponse.clozeCloze)){
						createCard("Cloze", cardTypeResponse.clozeFullText, cardTypeResponse.clozeCloze);
						console.log("Card added to the deck!");
						console.log("\n");
						flashCardApp();
					}

					else {
						console.log("The Full Text appears to not include the Cloze Text. Please try again.");
						console.log("\n");
						makeCardMenu();
					}
					
				})
			}

		})
}

flashCardApp();


