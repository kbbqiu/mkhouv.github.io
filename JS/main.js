// Create our 'main' state that will contain the game
var Messages = firebase.database().ref('/messages')
        
var stars;
var highScore = 0;

var mainState = {
    preload: function() { 
    // Load the Game Assets
    game.load.image('bomberman', 'assets/bomberman.png');
    game.load.image('block', 'assets/block.png');
    game.load.image('stars', 'assets/stars.jpg');
    game.load.audio('jump', 'assets/jump.wav');
    game.load.audio('gameover', 'assets/game-over.wav');
},

    create: function() { 
    // Change the background
    stars = game.add.tileSprite(0,0,500,590,"stars");
       
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Where the charcter is first rendered
    this.bomberman = game.add.sprite(100, 245, 'bomberman');

    // Add physics to the charcter
    game.physics.arcade.enable(this.bomberman);

    // Add gravity to the charcter to make it fall
    this.bomberman.body.gravity.y = 1000;  

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
    
    this.input.onDown.add(this.jump, this);    
    
    // Create an empty group
    this.blocks = game.add.group();
        
    
    this.timer = game.time.events.loop(2000, this.addRowOfBlocks, this); 
    
        
    //Add Score to Game
    this.score = 0;  
        
    this.labelScore = game.add.text(115, 20,"SCORE: 0", 
    { font: "35px Orbitron", fill: "#ffffff" });
        
    // Move the anchor to the left and downward
    this.bomberman.anchor.setTo(-0.2, 0.5);
    
    // Add sound Clip
    this.jumpSound = game.add.audio('jump');
    this.gameoverSound = game.add.audio('gameover'); 

},

    update: function() {
        
    stars.tilePosition.x += .5;    
    
    // If the character goes off screen
    // Call the 'restartGame' function
    if (this.bomberman.y < 0 || this.bomberman.y > 490){
        if(highScore < this.score){
            highScore = this.score;
            var Messages = firebase.database().ref("/messages")
                Messages.on("value", function(data){
                Messages.child
                var currentData = data.val();
                 for (var i in currentData) {
                    if (currentData[i].id === window.userID) {
                        console.log(currentData[i]);
                        if (currentData[i].score < highScore){
                        currentData[i].set({
                            score: highScore
                        })
                        }
                    }
                }
        })
        
        $("h1").text("HIGH SCORE: " + highScore);
        this.restartGame();
        }
    }
    
    //Add Collsion detection
    game.physics.arcade.overlap(
    this.bomberman, this.blocks, this.hitBlock, null, this);
    
    //Adjust character angle
    if (this.bomberman.angle < 20)
    this.bomberman.angle += 1;
    
    //Align the Game in the center of the page
    this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
},
    
// Make the character jump 
jump: function() {
    
    if (this.bomberman.alive == false){
    return;
    }
    
    // Add a jump velocity
    this.bomberman.body.velocity.y = -350;
    game.add.tween(this.bomberman).to({angle: -20}, 100).start();
    
    // Jump Sound
    this.jumpSound.play();
},

// Restart the game
    restartGame: function() {
    // Loads the End State
    game.state.start('end');
},
    
    hitBlock: function() {
    // If the character has already hit a block, do nothing
    // It means the character is already falling off the screen
    if (this.bomberman.alive == false)
        return;

    // Set the alive property of the character to false
    this.bomberman.alive = false;
        
    // Game Over
    this.gameoverSound.play();

    // Prevent new blocks from appearing
    game.time.events.remove(this.timer);

    // Go through all the blocks, and stop their movement
    this.blocks.forEach(function(blocks){
        blocks.body.velocity.x = 0;
    }, this);
},
    
    addOneBlock: function(x, y) {
        
    // Create a block at the position x and y
    var block = game.add.sprite(x, y, 'block');

    // Add the block to our previously created group
    this.blocks.add(block);

    // Enable physics on the block 
    game.physics.arcade.enable(block);

    // Add velocity to the block to make it move left
    block.body.velocity.x = -200; 

    // Automatically kill the block when it's no longer visible 
    block.checkWorldBounds = true;
    block.outOfBoundsKill = true;
},
    
    addRowOfBlocks: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 blocks 
    // With one big hole at position 'hole' and 'hole + 1'
    // After Score of 10 block gap changes to 2
    if(this.score <= 8){
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1 && i != hole + 2) 
            this.addOneBlock(400, i * 60 + 10);
    } else {
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1) 
            this.addOneBlock(400, i * 60 + 10);
    }
    this.score += 1;
    this.labelScore.text = "SCORE: " + this.score;
},
};

// Initialize Phaser
var game = new Phaser.Game(400, 490,Phaser.AUTO,"phaser");

// Add states of Game
game.state.add('main', mainState); 
game.state.add('title', StateTitle)
game.state.add('end', StateEnd);

// Start the state to actually start the game
game.state.start('title');