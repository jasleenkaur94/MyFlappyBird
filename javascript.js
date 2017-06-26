var GameState2 = {
    
    init:function(){
            this.world.setBounds(0,0,800,600);
    },
    preload:function(){
        this.load.image('bird','Images/flappy.gif');
        this.load.image('tree','Images/pipe.png');
        this.load.image('treeup','Images/pipeup.png');
        this.load.image('ground','Images/greenground.png');
        game.load.audio('jump', 'Sounds/jump.wav');
        game.load.audio('game_over', 'Sounds/crash.wav');
        
    },
    create:function(){
        
        this.s=0;
        this.textBox = this.add.text(100,100,"Score : 0");
        this.textBox.fixedToCamera=true;

        this.stage.backgroundColor =  "#7ec0ee";
        //this.add.sprite(0,0,'background').scale.setTo(1.5);
        
        this.ground = this.add.tileSprite(0,this.world.height-50,this.world.width,50,'ground');
        
        this.physics.arcade.enable(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;
        
        this.bird = this.add.sprite(100,this.world.height/2,'bird');
        
        this.bird.scale.setTo(.5);
        //this.bird.anchor.setTo(.5,.5);
        this.bird.anchor.setTo(-0.2, 0.5); 

        this.bird.enableBody=true;
        this.physics.arcade.enable(this.bird);
        this.bird.body.setSize(256,256,60,25);
        
        this.physics.arcade.enable(this.bird);
        this.bird.body.allowGravity = true;
        
        this.physics.arcade.enable(this.bird);
        this.jumpBtn = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.input.onDown.add(this.jump,this);
        
        this.bird.collideWorldBounds = true;
        
        this.pipesGroup1 = this.add.group();
        this.pipesGroup1.enableBody = true;
        
        this.pipesGroup2 = this.add.group();
        this.pipesGroup2.enableBody = true;
        
        this.game.add.tween(this.bird).to({angle: -20}, 100).start(); 

        
        //Create a ball after every 2 seconds
        this.pipeMaker = this.time.events.loop(1000,this.makepipe,this);
        
        this.score = 0;
        
        this.jump1= game.add.audio('jump');
        this.game_over= game.add.audio('game_over');
    
    },
    makepipe:function(){
        
        
        
        var pipe1,pipe2,pipe3,pipe4,pipe5,pipe6;
        
        pipe1 = this.pipesGroup1.getFirstExists(false);
        
         pipe2 = this.pipesGroup2.getFirstExists(false);
        
        pipe3 =this.pipesGroup1.getFirstExists(false);
        
        pipe4 =this.pipesGroup2.getFirstExists(false);
        
        pipe5 =this.pipesGroup1.getFirstExists(false);
        
        pipe6 =this.pipesGroup2.getFirstExists(false);
        
        if(!pipe1){
           pipe1 =this.pipesGroup1.create(100,0,'tree');
            pipe1.scale.setTo(0.5,0.5);
            pipe1.body.setSize(400,400,98,20);
        }
        else{
            pipe1.reset(100,0);
            pipe1.scale.setTo(0.5,0.5);
            pipe1.body.setSize(400,400,98,20);

            
        }
        if(!pipe2){
             pipe2 = this.pipesGroup2.create(100,this.world.height,'treeup');   
                        pipe2.scale.setTo(0.5,-0.5);
                        pipe2.body.setSize(400,400,98,20);


        }
        else{
            pipe2.reset(100,this.world.height-100);
                                    pipe2.scale.setTo(0.5,0.5);
                                    pipe2.body.setSize(400,400,98,20);


        }
        
        if(!pipe3){
           pipe3 =this.pipesGroup1.create(350,0,'tree');
            //var i =Math.random();
          //  pipe1.scale.setTo(1,-1);
            pipe3.scale.setTo(0.4,0.4);
            pipe3.body.setSize(400,400,98,20);
            
        }
        else{
            pipe3.reset(350,0);
            pipe3.scale.setTo(0.4,0.4);
                        pipe3.body.setSize(400,400,98,20);

            
        }
        if(!pipe4){
             pipe4 = this.pipesGroup2.create(350,this.world.height,'treeup'); 
            pipe4.scale.setTo(0.4,0.4);
                                    pipe4.body.setSize(400,400,98,20);

        }
        else{
            pipe4.reset(350,this.world.height);
            pipe4.scale.setTo(0.4,0.4);
            
            pipe4.body.setSize(400,400,98,20);

        }
            
        if(!pipe5){
           pipe5 =this.pipesGroup1.create(700,0,'tree');
            //var i =Math.random();
          pipe5.scale.setTo(0.6,0.6);
                        pipe5.body.setSize(400,400,98,20);

            
        }
        else{
            pipe5.reset(700,0);
            pipe5.scale.setTo(0.6,0.6);
                                    pipe5.body.setSize(400,400,98,20);

            
        }
        if(!pipe6){
             pipe6 = this.pipesGroup2.create(700,this.world.height,'treeup'); 
             pipe6.scale.setTo(0.6,0.6);
             pipe6.body.setSize(400,400,98,20);


        }
        else{
            pipe6.reset(700,this.world.height);
            pipe6.scale.setTo(0.6,0.6);
            pipe6.body.setSize(400,400,98,20);


        }
        
        pipe1.body.velocity.x = -400;
        pipe2.body.velocity.x = -400;
        pipe3.body.velocity.x = -400;
        pipe4.body.velocity.x = -400;
        pipe5.body.velocity.x = -400;
        pipe6.body.velocity.x = -400;
        
        
        pipe1.body.allowGravity = false;
        pipe2.body.allowGravity = false;
        pipe3.body.allowGravity = false;
        pipe4.body.allowGravity = false;  
        pipe5.body.allowGravity = false;
        pipe6.body.allowGravity = false;
                                            
    },    
    update:function(){
        
//console.log(this.input.activePointer.clientX+","+this.input.activePointer.clientY);
   //this.textBox.setText("Score : "+this.score);       
      self=this;
                

         this.pipesGroup1.forEach(function(pipe){
            if( pipe.x<100&&pipe.x>90){
                self.scored();
             // pipe.kill();
            } 
            
        }); 
        
         this.pipesGroup1.forEach(function(pipe){
            if(pipe.x<0){
               // self.scored;
              pipe.kill();
            } 
            
        }); 

         this.pipesGroup2.forEach(function(pipe){
            if(pipe.x<0){
                
                pipe.kill();
                 // self.scored();
            }
        });
        

        this.physics.arcade.collide(this.bird,this.pipesGroup1,this.game_over,null,this);
        this.physics.arcade.collide(this.bird,this.pipesGroup2,this.game_over,null,this);
        
        if(this.bird.angle>=-20){
            this.bird.angle -= 1;
        }
        
        
        if(this.jumpBtn.isDown){
           this.jump();
        }
        else
            {
                this.bird.body.velocity.y = 50;
            }

        this.physics.arcade.collide(this.bird,this.ground,this.game_over,null,this);
        
        
    },
    
    scored: function(){
        this.score+=1;
                this.textBox.setText("Score : "+this.score);
    },
    jump:function(){
         this.bird.body.velocity.y = -50;
               this.game.add.tween(this.bird).to({angle: -20}, 100).start();

                //this.jump1.play();

          //  this.bird.angle += 10;
    },
    game_over:function(){
        this.game_over.play();
       alert("Game Over");
       this.game.state.start('Level2');
        
    },
    render:function(){
      this.game.debug.spriteBounds(this.pipesGroup1);
              this.game.debug.spriteBounds(this.pipesGroup2);

    }
}


var game = new Phaser.Game(800,600,Phaser.AUTO,'gamediv');
game.state.add('Level2',GameState2);

//game.state.add('Level2',GameState2);
game.state.start('Level2');