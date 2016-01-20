require("WoD-Dice");

//variable to see if user should be penalized
var commitPenalty = new Pool(9);

//takes away 5 dices from the pool
commitPenalty.penalty(5);