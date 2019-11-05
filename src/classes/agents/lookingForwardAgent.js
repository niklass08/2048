import {Game as GameManager} from "../game.js"

const gameManager = new GameManager(4, 4);
const DIRECTIONS = [
    "MOVE_UP",
    "MOVE_LEFT",
    "MOVE_DOWN",
    "MOVE_RIGHT"
]

export class LookingForwardAgent {
    constructor(store) {
        this.store = store;
        console.log("creating LookingForwardAgent");
    }

    async play() {
        console.log("start playing");
        let nSequence = 400;
        let seqLen = 1;
        while (!gameManager.isOver(this.store.getState().grid)) {
            let history = new Map();
            let scoreHistory = new Map();
            let base = gameManager.cloneGrid(this.store.getState().grid);
            for (let k = 0; k < DIRECTIONS.length; k++) {
                history.set(DIRECTIONS[k], []);
                scoreHistory.set(DIRECTIONS[k], []);
            }
            for (let i = 0; i < nSequence; i++) {
                let seq = generateRandomSequence(seqLen);
                history.get(seq[0]).push(seq);
                scoreHistory.get(seq[0]).push(gameManager.evaluateScore(base,seq));
            }

            let bestMove;
            let bestScore = 0;
            for (let k = 0; k < DIRECTIONS.length; k++) {
                //compute mean best score
                scoreHistory.set(DIRECTIONS[k], scoreHistory.get(DIRECTIONS[k]).reduce((p,c,i) => {return p+(c-p)/(i+1)},0));
                let score = gameManager.evaluateScore(base, [DIRECTIONS[k]]);
                let baseScore = gameManager.score(base);
                if(scoreHistory.get(DIRECTIONS[k]) > bestScore && score > baseScore){
                    bestScore = scoreHistory.get(DIRECTIONS[k]);
                    bestMove = DIRECTIONS[k];
                }
            }
            this.store.dispatch({type: bestMove});
            console.log("player " + bestMove);
            console.log(history);
            console.log(scoreHistory);
            history.clear();
            scoreHistory.clear();
            await sleep(3);
        }
    }

    playOneMove(){
        let nSequence = 100;
        let seqLen = 10;
        let history = new Map();
        let scoreHistory = new Map();
        let base = gameManager.cloneGrid(this.store.getState().grid);
        for (let k = 0; k < DIRECTIONS.length; k++) {
            history.set(DIRECTIONS[k], []);
            scoreHistory.set(DIRECTIONS[k], []);
        }
        for (let i = 0; i < nSequence; i++) {
            let seq = generateRandomSequence(seqLen);
            history.get(seq[0]).push(seq);
            scoreHistory.get(seq[0]).push(gameManager.evaluateScore(base,seq));
        }

        let bestMove;
        let bestScore = 0;
        for (let k = 0; k < DIRECTIONS.length; k++) {
            //compute mean best score
            //scoreHistory.set(DIRECTIONS[k], scoreHistory.get(DIRECTIONS[k]).reduce((p,c,i) => {return p+(c-p)/(i+1)},0));
            const len = scoreHistory.get(DIRECTIONS[k]).length;
            scoreHistory.set(DIRECTIONS[k], scoreHistory.get(DIRECTIONS[k]).reduce((acc, current) => {
                return acc + current;
            }, 0)/len);
            let score = gameManager.evaluateScore(base, [DIRECTIONS[k]]);
            let baseScore = gameManager.score(base);
            if(scoreHistory.get(DIRECTIONS[k]) > bestScore && score > baseScore){
                bestScore = scoreHistory.get(DIRECTIONS[k]);
                bestMove = DIRECTIONS[k];
            }
        }
        this.store.dispatch({type: bestMove});
        console.log("player " + bestMove);
        console.log(history);
        console.log(scoreHistory);
        history.clear();
        scoreHistory.clear();
    }
}

function generateRandomSequence(seqLen) {
    let seq = [];
    for (let i = 0; i < seqLen; i++) {
        seq.push(DIRECTIONS[getRandomInt(4)]);
    }
    return seq;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getMaxInd(arr) {
    let ind = 0;
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
            ind = i;
        }
    }
    return ind;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}