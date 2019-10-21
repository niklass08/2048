import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Cell(props) {
    return (
        <div className="cell">
            <p className="cellValue">
                {props.value}
            </p>
        </div>
    )
}

class Grid extends React.Component {
    renderCell(i) {
        return (
            <Cell
                value={this.props.grid[i]}
            />
        )
    }

    render() {
        const len = this.props.grid.length;
        const width = this.props.width;
        const rows = [];
        for (let i = 0; i < len; i += width){
            rows.push(
                <div className = "row">
                    {this.renderCell(i)}
                    {this.renderCell(i + 1)}
                    {this.renderCell(i + 2)}
                </div>
            )
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
        this.state = {
            lines: props.lines,
            width: props.width,
            grid : Array(props.lines * props.width).fill(0)
        }
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        console.log(event.keyCode);
        const newGrid = this.state.grid.map(el => el + 1);
        this.setState({ grid: newGrid });
    }

    render() {
        return (
            <span className="game">
                <Grid
                    grid={this.state.grid}
                    width={3}
                />
            </span>
        )
    }
}


ReactDOM.render(
    <Game
        lines={3}
        width={3}
    />,
    document.getElementById('root')
);