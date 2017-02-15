var StateEnd ={    
    
   preload:function()
    {  
       //Load Assets
       game.load.image("logo","assets/bomberman_logo.png");
       game.load.spritesheet('buttons', 'assets/buttons2.png', 265, 75);
       game.load.audio('goodluck', 'assets/goodluck.wav');
    },
    
    create:function()
    
    {  //Load Logo
       this.logo=game.add.sprite(game.world.centerX,180,"logo");
       this.logo.anchor.set(0.5,0.5);
       this.reStartSound = game.add.audio('goodluck');
        
       //Play Again Button
       this.btnStart = game.add.button(game.world.centerX,game.world.height-100,"buttons",this.startGame,this,7,6,7);
       this.btnStart.anchor.set(0.5,0.5);
        
        $("#scoreform").prepend("<form id='Initials'> Initials: <input id='score' name='message' type='text'/><button type='submit'>Submit</button></form><br>")
       
       
    },
    
    startGame: function(){
        this.reStartSound.play();
        game.state.start("main");
        
    },
    
    
    
    update:function()
    {   //Align to center   
        this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
        
    }    
    
}