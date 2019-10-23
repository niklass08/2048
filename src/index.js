import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import reducer from './reducers.js';
import { RandomAgent } from './classes/agents/randomAgent.js';
import {OneMoveAgent} from './classes/agents/oneMove.js';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function Cell(props) {
    return (
        <div className={"cell-" + props.value}>
            <p className="cellValue">
                {props.value}
            </p>
        </div>
    )
}

class Grid extends React.Component {
    renderCell(i,j) {
        return (
            <Cell
                value={this.props.grid[i][j]}
            />
        )
    }

    render() {
        const lines = this.props.lines;
        const width = this.props.width;
        const rows = [];
        let row;
        for (let i = 0; i < lines; i++){
            row = [];
            for(let j = 0; j<width;j++){
                row.push(this.renderCell(i, j));
            }
            rows.push(
                <div className="row">
                    {row.slice()}
                </div>
            );
        }
        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        store.dispatch({ type: "NEW_GRID"});
        this.state = {
            lines: props.lines,
            width: props.width
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        const grid = store.getState().grid;
        switch (event.code) {
            case "ArrowUp":
                store.dispatch({type: "MOVE_UP"});
                break;
            case "ArrowDown":
                store.dispatch({type: "MOVE_DOWN"});
                break;
            case "ArrowRight":
                store.dispatch({type: "MOVE_RIGHT"});
                break;
            case "ArrowLeft":
                store.dispatch({type: "MOVE_LEFT"});
                break;
            case "KeyR":
                store.dispatch({type: "NEW_GRID"});
                break;
            default:
                break;
        }
    }

    async launchRandomAgent() {
        store.dispatch({type: "NEW_GRID"});
        let randomAgent = new RandomAgent(store);
        await randomAgent.play();
    }

    async launchOneMoveAgent() {
        store.dispatch({type: "NEW_GRID"});
        let oneMoveAgent = new OneMoveAgent(store);
        await oneMoveAgent.play();
    }

    render() {
        return (
            <div className="game">
                <Grid
                    grid={store.getState().grid}
                    width={this.state.width}
                    lines={this.state.lines}
                />
                <div className="score"> Score : {store.getState().score}</div>
                <button onClick={this.launchRandomAgent}>RandomAgent</button>
                <button onClick={this.launchOneMoveAgent}>OneMoveAgent</button>
            </div>
        )
    }
}

function render(){
    ReactDOM.render(
        <Game
            lines={4}
            width={4}
        />,
        document.getElementById('root')
    );
}
render();
store.subscribe(render);
