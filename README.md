# Flashcard-Generator
A node-based API for users to create and use Flashcards, as well as an optional additional front-end. 

# Usage
Users are prompted to either Create a card or quiz themselves from the existing flash cards.

# Create a card
Users have the option to create either a Basic flashcard or a Cloze flashcard. A Basic Flashcard follows the functionality of one side having a question, such as "Who was the first president of the United States", with the back reading "George Washington."

A Cloze card takes a full text and cloze text that will be hidden. So "George Washington was the first president of the United States" and the close text "George Washington" will offer a front card value of "... was the first president of the United States" and a back card value of "George Washington".

In the node version, cards are saved to a text doc that stores all available cards. The web version uses firebase to store cards.

# Take a Quiz
The quiz draws from both the text doc or firebase db to get all available cards and shuffles them. It then presents users with a quiz, checking to ensure the values they input are correct.

# Technology Used
Flashcard-Generator was built using:
* Javascript
* JQuery
* Materialize
* Node.JS
* Firebase

