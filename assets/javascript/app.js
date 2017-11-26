$(function(){
	var config = {
		apiKey: "AIzaSyA7yLOGeQ5PvDAwUqIdSgUHGQU4hOaf_6w",
		authDomain: "flashcards-ca68e.firebaseapp.com",
		databaseURL: "https://flashcards-ca68e.firebaseio.com",
		projectId: "flashcards-ca68e",
		storageBucket: "flashcards-ca68e.appspot.com",
		messagingSenderId: "363929299065"
	};
	firebase.initializeApp(config);

	database = firebase.database();

	var cardCreationMode = "Basic";

	var cardQuiz = [];

	var answer;

	var questionCount = 0;

	database.ref("Cards").on("child_added", function(snapshot){
		cardQuiz.push(snapshot.val());
	});

	function BasicCard(front, back){
		if(this instanceof BasicCard) {
			this.front = front;
			this.back = back;
		} 
		else {
			return new BasicCard(front, back);
		}
	}

	function ClozeCard(text, cloze){
		if(this instanceof ClozeCard) {
			this.cloze = cloze;
			this.partialText = text.replace(cloze, "...");
			this.fullText = text;
		} 
		else {
			return new ClozeCard(text, cloze);
		}
	}

	function createCard(type, frontText, backCloze){
		if (type === "Basic"){
			return BasicCard(frontText, backCloze);
		}

		else {
			return ClozeCard(frontText, backCloze);
		}
	}

	$(".submitBtn").on("click", function(){
		if(cardCreationMode === "Basic"){
			database.ref("Cards").push(createCard("Basic", $("#front").val(), $("#back").val()));
		}

		else {
			database.ref("Cards").push(createCard("Cloze", $("#fullText").val(), $("#clozeText").val()));
		}
	})

	$(".lever").on("click", function(){
		if(cardCreationMode === "Basic"){
			cardCreationMode = "Cloze";
			$(".ClozeCreator").css("display", "block");
			$(".BasicCreator").css("display", "none");
			var fadeBG = $("<div>");
			fadeBG.attr("Id", "bg2").addClass("bg").css("background-color", "rgb(78, 33, 33)").hide()
			.appendTo(".bgPool").fadeIn(function(){
				$("#bg1").css("background-color", "rgb(78, 33, 33)");
				$("#bg2").remove();
			});
		}

		else {
			cardCreationMode = "Basic";
			$(".ClozeCreator").css("display", "none");
			$(".BasicCreator").css("display", "block");
			var fadeBG = $("<div>");
			fadeBG.attr("Id", "bg2").addClass("bg").css("background-color", "#161e26").hide()
			.appendTo(".bgPool").fadeIn(function(){
				$("#bg1").css("background-color", "#161e26");
				$("#bg2").remove();
			});
		}
		
	});

	$(".quizNav").on("click", function(){
		$(".flashCard").hide("drop", {direction: "left"}, 200, function(){
			$(".quizCard").show("slide", {direction: "right"});
		});
		
		var fadeBG = $("<div>");
		fadeBG.attr("Id", "bg2").addClass("bg").css("background-color", "rgb(25, 49, 39)").hide()
			.appendTo(".bgPool").fadeIn();
	})

	$(".createNav").on("click", function(){
		$(".quizCard").hide("slide", {direction: "right"}, 200, function(){
			$(".flashCard").show("slide", {direction: "left"}, function(){
				resetQuiz();
			});
		});
		$("#bg2").fadeOut(function(){
			$("#bg2").remove();
		});
	})

	$(".startQuizButton").on("click", function(){
		shuffleCards();
		$(".quizSpace").css("display", "block");
		$(".preQuiz").css("display", "none");
		
		quizRound();
		
	});

	function quizRound(){
		if (questionCount < 2){
			if (cardQuiz[questionCount].hasOwnProperty("back")){
				$(".quizText").text(cardQuiz[questionCount].front);
				answer = cardQuiz[questionCount].back;
			}

			else {
				$(".quizText").text(cardQuiz[questionCount].partialText);
				answer = cardQuiz[questionCount].cloze;
			}
		}

		else {
			resetQuiz();
		}
	}

	function shuffleCards(){
		var currentIndex = cardQuiz.length; 
		var tempValue; 
		var randomIndex;

		while (currentIndex !== 0){
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			tempValue = cardQuiz[currentIndex];
			cardQuiz[currentIndex] = cardQuiz[randomIndex];

			cardQuiz[randomIndex] = tempValue;
		}
	}

	function resetQuiz(){
		$(".quizSpace").css("display", "none");
		$(".preQuiz").css("display", "block");
		$(".quizText").text("Quiz");
		questionCount = 0;
	}

	$(".quizSubmitBtn").on("click", function(){
		if ($("#quizAnswer").val() === answer){
			$(".quizText").text("Correct!");
		}

		else {
			$(".quizText").text("Sorry, the correct answer was " + answer);
		}

		$(".answerSlot").css("display", "none");

		questionCount += 1;

		setTimeout(function(){
			$("#quizAnswer").val("");
			$(".answerSlot").css("display", "block");
			quizRound();
		}, 3500);
	});

})
