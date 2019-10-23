import {Game as GameManager} from "../game.js"
const gameManager = new GameManager(4, 4);
const DIRECTIONS = [
    "MOVE_UP",
    "MOVE_DOWN",
    "MOVE_LEFT",
    "MOVE_RIGHT"
]

export class OneMoveAgent {
    constructor(store) {
        this.store = store;
        console.log("creating one move agent");
    }

    async play() {
        console.log("start playing");
        while (!gameManager.isOver(this.store.getState().grid)) {
            const base = gameManager.cloneGrid(this.store.getState().grid);
            let nextStates = [];
            DIRECTIONS.forEach(dir => {
                nextStates.push(gameManager.score(gameManager.move(dir, base)));
            });
            console.log(nextStates);
            let i = nextStates.indexOf(Math.max(...nextStates));
            let nextMove = DIRECTIONS[i];
            this.store.dispatch({type:nextMove});
            console.log("One move Agent");
            await sleep(1000);
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}