/**
 * A number (integer) is returned randomly between the numbers 1 and 10 where the mininimum number (1) is inclusive and the maximum number
 * (10) is exclusive.
 * 
 * @returns int 
 */

function rollDie () {
  return Math.ceil(Math.random() * 10)
}

/**
 * Sets the constructors for the pool object and encompasses the possibilities of what the user can do with the dice (outcomes of the program). 
 *  
 * @param int dices
 * @param array obj
 */

Pool = function(){
    
  //Dice, weak, reroll variables for this instance of the object being constructed.
  this.dices = 0
  this.weak = false
  this.rerollOn = 10

  //Checks to see which condition is satisfied and whether the item in the array parses equates to the words 'number' or 'object'.
  if (typeof arguments[0] === "number") {
    this.dices = parseInt(arguments[0], 10)
  }
  
  if (typeof arguments[0] === "object") {
    var config = arguments[0]
    
    //If the item in the array is an object, then reset the variables accordingly.
    this.dices    = config.dices || this.dices
    this.weak     = config.weak || this.weak
    this.rerollOn = config.rerollOn || this.rerollOn
  }
};

/**
 * Adds the dice to the current number of dices in the pool to keep track of how many dices the user has.
 * 
 * @param int dices
 * @returns int 
 * 
 */

Pool.prototype.addDice = function (dices) {
  
  //Resets dice count
  this.dices = this.dices + parseInt(dices, 10)

  return this;
};

/**
 * Removes the dice(s) from the current number of dices in the pool to keep track of how many dices the user has left.
 * 
 * @param int dices
 * @returns int 
 */

Pool.prototype.removeDice = function (dices) {
  this.dices = this.dices - parseInt(dices, 10)

  return this;
};

/**
 * Removes the dice number from being added to the current number of dices in the pool to penalize the user for doing something "illegal" in the game.
 * 
 * @param int penalty
 * @returns int 
 */

Pool.prototype.penalty = function (penalty) {
    
  //Excludes dice number roll from the total dice count to penalize user
  return this.removeDice(penalty)
};

/**
 * Selection and situation of the dices imposed on the user based on the pool is characterized as "weak".
 * 
 * @returns boolean 
 */

Pool.prototype.isWeak = function () {
  this.weak = true

  return this;
};

/**
 * Sets the pool of dices to accomodate what is rerolled by the user.
 * 
 * @param int threshold
 * @returns int  
 */

Pool.prototype.reroll = function (threshold) {
  this.rerollOn = parseInt(threshold, 10)

  return this;
};

/**
 * Allows the user to gain more points even though the game should technically be over based on the number of times they have rolled the dice.
 * 
 * @returns boolean
 */

Pool.prototype.isChanceRoll = function () {
  return (this.dices < 1)
}

/**
 * Establishes the conditions of the game based on how the user rolls the dice. Also, it establishes how the user can lose or gain points, and it gives the user addditional chances to gain points even after the game is technically
 * over if the user rolls a 10. 
 * 
 * @returns int
 */

Pool.prototype.roll = function () {
  
  //Sets a counter for user's points
  var successes = 0,
      
      //Variable to track state of rolled dice
      roll;

  //Allows the user to reroll dice
  if (this.isChanceRoll()) {
    while (true) {
      roll = rollDie()
      
      //Add points for user if they roll a 10
      if (roll === 10) {
        successes++
      
      //Subtract points for user if they roll a 1
      } else if(roll === 1) {
        successes--
      }
      
      //If the roll is weak or the dice lands on something less than 10, the user is unable to reroll.
      if (this.weak || roll < 10) {
        break
      }
    }
  } else {
      
    //Keeps the dice rolling until the dices are gone.
    for (var i = 0; i < this.dices; i++) {
      roll = rollDie()
      
      //Adds points to user's score
      if (roll >= 8) {
        successes++
      }
      
      //Gives dices back to user
      if (!this.weak && roll >= this.rerollOn) {
        this.dices++
      }
      
      //Subtracts points from user's score if the roll is weak and if the dice rolls on 1
      if (this.weak && roll === 1) {
        successes--
      }
    }
  }
  
  //Allows the user to roll another time depending on their progress in the game.
  return (this.isChanceRoll()) ? successes : Math.max(0, successes);
};

exports.Pool = Pool;
