import {Game as GameManager} from "../game.js"
const gameManager = new GameManager(4, 4);
const DIRECTIONS = [
    "MOVE_UP",
    "MOVE_DOWN",
    "MOVE_LEFT",
    "MOVE_RIGHT"
]

export class RandomAgent {
    constructor(store) {
        this.store = store;
        console.log("creating random agent");
    }

    async play() {
        console.log("start playing");
        while (!gameManager.isOver(this.store.getState().grid)) {
            let nextMove = DIRECTIONS[getRandomInt(4)];
            this.store.dispatch({type:nextMove});
            console.log("RandomAgentPlayed");
            //await sleep(30);
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}