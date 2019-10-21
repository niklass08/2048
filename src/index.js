import React from 'react';
import ReactDOM from 'react-dom';
import { Game as GameLogic} from './classes/game.js';
import './index.css';

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
        this.gameLogic = new GameLogic(props.width, props.lines);
        this.gameLogic.init();
        this.state = {
            lines: props.lines,
            width: props.width,
            grid : this.gameLogic.grid,
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        switch (event.code) {
            case "ArrowUp":
                this.gameLogic.move("MOVE_UP");
                break;
            case "ArrowDown":
                this.gameLogic.move("MOVE_DOWN");
                break;
            case "ArrowRight":
                this.gameLogic.move("MOVE_RIGHT");
                break;
            case "ArrowLeft":
                this.gameLogic.move("MOVE_LEFT");
                break;
            case "KeyR":
                this.gameLogic.restart();
                break;
            default:
                break;
        }
        this.setState({grid: this.gameLogic.grid})
        console.log(this.gameLogic.score());
    }

    render() {
        return (
            <div className="game">
                <Grid
                    grid={this.state.grid}
                    width={this.state.width}
                    lines={this.state.lines}
                />
                <div className = "score"> Score : {this.gameLogic.score()}</div>
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