const DIRECTIONS = [
    "MOVE_UP",
    "MOVE_DOWN",
    "MOVE_LEFT",
    "MOVE_RIGHT"
]

export class RandomAgent {
    constructor(gameManager) {
        this.gameManager = gameManager;
        console.log("creating random agent");
    }

    play() {
        console.log("start playing");
        this.gameManager.init();
        console.log(this.gameManager.isOver());
        while (!this.gameManager.isOver()) {
            let nextMove = DIRECTIONS[getRandomInt(3)];
            this.gameManager.move(nextMove);
            console.log("RandomAgentPlayed");
            console.log("RandomAgentScore:" + this.gameManager.score());
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}