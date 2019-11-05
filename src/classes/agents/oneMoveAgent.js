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
            let i = getMaxInd(nextStates);
            let nextMove = DIRECTIONS[i];
            this.store.dispatch({type:nextMove});
            console.log("One move Agent");
            //await sleep(20);
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getMaxInd(arr){
    let ind = 0;
    let max = 0;
    for(let i = 0; i<arr.length;i++){
        if(arr[i] > max){
            max = arr[i];
            ind = i;
        }
    }
    return ind;
}