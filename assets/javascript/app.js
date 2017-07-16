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
		
	})

})
