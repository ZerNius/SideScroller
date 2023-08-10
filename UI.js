export class Ui{
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.liveImage = document.getElementById('lives');
    }
    draw(context){
        context.save();
        context.shadowOffestX = 2;
        context.shadowOffestY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        //score
        context.fillText('Score: ' + this.game.score, 20, 50);
        //timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        //lives
        for(let i = 0; i< this.game.lives; i++){
        context.drawImage(this.liveImage, 25 * i + 20, 95, 25,25);

        }

        //game over messages
        if(this.game.gameover){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if(this.game.score > 5){
                context.fillText('You Win', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('What are creatures of the night afraid of? YOU!!!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else {
                context.fillText('You Lose!!!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize* 0.7 + 'px ' + this.fontFamily;
                context.fillText('Better luck next time!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
        }
        context.restore();
    }
}