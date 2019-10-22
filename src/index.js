import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Game as GameManager} from './classes/game.js';
import './index.css';
import reducer from './reducers.js';
import { RandomAgent } from './classes/agents/randomAgent.js';

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
        this.gameManager = new GameManager(props.width, props.lines, store);
        this.gameManager.init();
        store.dispatch({ type: "NEW_GRID", grid: this.gameManager.grid });
        this.state = {
            lines: props.lines,
            width: props.width
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        switch (event.code) {
            case "ArrowUp":
                this.gameManager.move("MOVE_UP");
                break;
            case "ArrowDown":
                this.gameManager.move("MOVE_DOWN");
                break;
            case "ArrowRight":
                this.gameManager.move("MOVE_RIGHT");
                break;
            case "ArrowLeft":
                this.gameManager.move("MOVE_LEFT");
                break;
            case "KeyR":
                this.gameManager.restart();
                break;
            default:
                break;
        }
        this.setState({ grid: this.gameManager.grid })
        console.log(this.gameManager.score());
    }

    launchRandomAgent = () => {
        let randomAgent = new RandomAgent(this.gameManager);
        randomAgent.play();
    }

    render() {
        return (
            <div className="game">
                <Grid
                    grid={store.getState().grid}
                    width={this.state.width}
                    lines={this.state.lines}
                />
                <div className="score"> Score : {this.gameManager.score()}</div>
                <button onClick={this.launchRandomAgent}>RandomAgent</button>
            </div>
        )
    }
}


ReactDOM.render(
    <Game
        lines={4}
        width={4}
    />,
    document.getElementById('root')
);