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
			if (!text.includes(cloze)){
				console.log("The Cloze does not appear to be included in the text. It will not work as intended.");
			} 
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
		console.log(createCard("Basic", $("#front").val(), $("#back").val()));
	})

	var testCard = createCard("Basic", "First Prez", "George Washington");
	console.log(testCard);
})
