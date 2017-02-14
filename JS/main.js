// Create our 'main' state that will contain the game

var hills;
var highScore = 0;

var mainState = {
    preload: function() { 
    // Load the bird sprite
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
    game.load.image('hills', 'assets/mario.jpg');
    game.load.audio('jump', 'assets/jump.wav');
    game.load.audio('gameover', 'assets/game-over.wav');
},

    create: function() { 
    // Change the background color of the game to blue
    hills = game.add.tileSprite(0,0,500,590,"hills");
       
    
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird at the position x=100 and y=245
    this.bird = game.add.sprite(100, 245, 'bird');

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird to make it fall
    this.bird.body.gravity.y = 1000;  

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
        
    // Create an empty group
    this.pipes = game.add.group();
    this.timer = game.time.events.loop(2000, this.addRowOfPipes, this); 
        
    this.score = 0;
    this.labelScore = game.add.text(150, 20,"SCORE: 0", 
    { font: "35px Impact", fill: "#ffffff" });
        
    // Move the anchor to the left and downward
    this.bird.anchor.setTo(-0.2, 0.5);
    
    // Add sound Clip
    this.jumpSound = game.add.audio('jump');
    this.gameoverSound = game.add.audio('gameover'); 

},

    update: function() {
        
    hills.tilePosition.x += .5;    
    
    // If the bird is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (this.bird.y < 0 || this.bird.y > 490){
        if(highScore < this.score){
            highScore = this.score;
        }
        $("h1").text("HIGH SCORE: " + highScore);
        console.log(highScore);
        this.restartGame();
    }
    game.physics.arcade.overlap(
    this.bird, this.pipes, this.hitPipe, null, this);
        
    if (this.bird.angle < 20)
    this.bird.angle += 1;
        
    this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
},
    
// Make the bird jump 
jump: function() {
    
    if (this.bird.alive == false){
    return;
    }
    
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
    game.add.tween(this.bird).to({angle: -20}, 100).start();
    
    // Jump Sound
    this.jumpSound.play();
},

// Restart the game
    restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('end');
},
    hitPipe: function() {
    // If the bird has already hit a pipe, do nothing
    // It means the bird is already falling off the screen
    if (this.bird.alive == false)
        return;

    // Set the alive property of the bird to false
    this.bird.alive = false;
        
    // Game Over
    this.gameoverSound.play();

    // Prevent new pipes from appearing
    game.time.events.remove(this.timer);

    // Go through all the pipes, and stop their movement
    this.pipes.forEach(function(p){
        p.body.velocity.x = 0;
    }, this);
},
    addOnePipe: function(x, y) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, 'pipe');

    // Add the pipe to our previously created group
    this.pipes.add(pipe);

    // Enable physics on the pipe 
    game.physics.arcade.enable(pipe);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200; 

    // Automatically kill the pipe when it's no longer visible 
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
},
    
    addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes 
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1) 
            this.addOnePipe(400, i * 60 + 10);
        
    this.score += 1;
    this.labelScore.text = "SCORE: " + this.score;
},
};
// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490,Phaser.AUTO,"phaser");

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 
game.state.add('title', StateTitle)
game.state.add('end', StateEnd);
// Start the state to actually start the game
game.state.start('title');