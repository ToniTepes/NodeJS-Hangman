var Word = require('./Word.js');
var prompt = require('prompt');


console.log("Welcome to Thought.");
console.log("Take the word or phrase that you discover and give it some... Well, Thought.");
console.log("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-");

var game = {
    wordBank: ['epistemology'],
    wordsWon: 0,
    guessesRemaining: 10,
    currentWord: null,
    
    startGame: function (wrd) {
        this.resetGuesses();
        this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
        
        this.promptUser();
    },

    resetGuesses: function(){
        this.guessesRemaining = 10;
    },

    promptUser: function(){
        var self = this;
        prompt.get(['guessLet'], function(err, result){
            console.log("You guessed: " + result.guessLet);
            var manyGuessed = self.currentWrd.checkLetter(result.guessLet);

            if(manyGuessed ==0) {
                console.log("WRONG");
                self.guessesRemaining--;
                
            } else {
                console.log("CORRECT");
                    if(self.currentWrd.findWord()){
                        console.log("You won!");
                        console.log("-------------------");
                        return;
                    }
            }

            console.log("Guesses remaining: " + self.guessesRemaining);
            console.log("-------------------");
            if((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
                self.promptUser();
            }
            else if(self.guessesRemaining ==0){
                console.log("Game over. Correct Word ", self.currentWrd.target);
            } else {
                console.log(self.currentWrd.wordRender());
            }
        });

    }


};

game.startGame();
