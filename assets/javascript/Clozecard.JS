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

module.exports = ClozeCard;
