import {Game as GameManager } from "./classes/game.js"
const gameManager = new GameManager(4, 4);
const direction = {
    MOVE_UP: "MOVE_UP",
    MOVE_DOWN: "MOVE_DOWN",
    MOVE_LEFT: "MOVE_LEFT",
    MOVE_RIGHT: "MOVE_RIGHT"
};

export default function play(state = {score: 0, grid: null}, action) {
    let newState = {}
    let newGrid;
    let score;
    switch (action.type) {
        case "NEW_GRID":
            newState = { ...state, grid: gameManager.init() };
            break;
        case direction.MOVE_UP:
            newGrid = gameManager.move(direction.MOVE_UP, state.grid);
            score = gameManager.score(newGrid);
            newState = { ...state, grid: newGrid, score: score};
            break;
        case direction.MOVE_DOWN:
            newGrid = gameManager.move(direction.MOVE_DOWN, state.grid);
            score = gameManager.score(newGrid);
            newState = { ...state, grid: newGrid, score: score};
            break;
        case direction.MOVE_LEFT:
            newGrid = gameManager.move(direction.MOVE_LEFT, state.grid);
            score = gameManager.score(newGrid);
            newState = { ...state, grid: newGrid, score: score};
            break;
        case direction.MOVE_RIGHT:
            newGrid = gameManager.move(direction.MOVE_RIGHT, state.grid);
            score = gameManager.score(newGrid);
            newState = { ...state, grid: newGrid, score: score};
            break;
        default:
            return state;
    }
    return newState;
}