var StateTitle={    
    
   preload:function()
    {  
       //Load our Assets
       game.load.image("logo","assets/bomberman_logo.png");
       game.load.spritesheet('buttons', 'assets/buttons.png', 265, 75);
       game.load.audio('start', 'assets/start.wav');
    },
    
    create:function(){
        
       //Set canvas color
       game.stage.backgroundColor = '#697e96';
       
       //Logo
       this.logo=game.add.sprite(game.world.centerX,180,"logo");
       this.logo.anchor.set(0.5,0.5);
       this.startSound = game.add.audio('start');
        
       //Start Button
       this.btnStart = game.add.button(game.world.centerX,game.world.height-100,"buttons",this.startGame,this,7,6,7);
       this.btnStart.anchor.set(0.5,0.5);
       
       
    },
    
    startGame: function(){
        this.startSound.play();
        game.state.start("main");
        
    },
    
    
    
    update:function()
    {   
        //Align in center
        this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
    }    
    
}