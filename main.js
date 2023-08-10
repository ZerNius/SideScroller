import { Player } from "./player.js";
import { InputHandeler } from "./input.js";
import { Background } from "./backgound.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy} from "./Enemy.js";
import { Ui } from "./UI.js";
window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1080;
    canvas.height = 720;

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 40;
            this.speed = 0;
            this.maxSpeed = 6;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandeler(this);
            this.Ui = new Ui(this);
            this.enemies = [];
            this.particle = [];
            this.collision = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.maxParticles = 100;
            this.lives = 5;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 10000;
            this.gameover = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();

        }
        update(deltaTime){
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameover = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            //handle Enemies
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;    
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);

            });

            // Handles Particles
            this.particle.forEach((particle, index) => {
                particle.update();
                if(particle.markedForDeletion) this.particle.splice(index, 1);
            });
            if(this.particle.length > this.maxParticles){
               this.particle = this.particle.slice(0, this.maxParticles);  
            }
            // handle collision sprites
            this.collision.forEach((collisoin, index) =>{
               collisoin.update(deltaTime);
                if(collisoin.markedForDeletion) this.collision.splice(index, 1);
            });
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particle.forEach(particle => {
                particle.draw(context);
            });
            this.collision.forEach(collision => {
                collision.draw(context);
            });
            this.Ui.draw(context);
        }
        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp)
    {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        
       if(!game.gameover) requestAnimationFrame(animate);
    }
    animate(0);
});
