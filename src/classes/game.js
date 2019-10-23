const MOVE_UP = "MOVE_UP";
const MOVE_DOWN = "MOVE_DOWN";
const MOVE_LEFT = "MOVE_LEFT";
const MOVE_RIGHT = "MOVE_RIGHT";

export class Game{

  constructor(width, height, store = null){
    this.width = width;
    this.height = height;
    this.grid = Array(width).fill(0).map(el => Array(height).fill(null));
    this.initValues = [2, 4];
    this.store = store;
  }

  print(){
    console.log(this.grid);
  }

  init(){
    let grid = Array(this.width).fill(0).map(el => Array(this.height).fill(null));
    const c1 = this.getFreeCell(grid);
    grid[c1.x][c1.y] = this.initValues[getRandomInt(2)];
    const c2 = this.getFreeCell(grid);
    grid[c2.x][c2.y] = this.initValues[getRandomInt(2)];
    //this.store.dispatch({ type: "NEW_GRID", grid: this.grid });
    return grid;
  }

  isFree(grid, coordinate){
    if(coordinate.x === undefined) return false;
    return grid[coordinate.x][coordinate.y] === null ? true : false
  }

  getFreeCell(grid){
    const c = {};
    while(!this.isFree(grid, c)){
      c.x = getRandomInt(this.width);
      c.y = getRandomInt(this.height);
    }
    return c;
  }

  moveUp(grid){
    let moved = false;
    console.log(grid);
    let transposed = this.transpose(grid);
    console.log(transposed);
    let newGrid = this.cloneGrid(transposed);
    console.log(newGrid);

    newGrid = newGrid.map(col => {
      const newCol = col.slice();
      //start at one because first cell cannot move further up
      for(let i = 1; i<col.length; i++){
        let ind = i - 1;
        let previous = newCol[ind];
        while(previous === null && ind !== 0){
          ind--;
          previous = newCol[ind];
        }
        if(previous === null && newCol[i] !== null){
          moved = true;
          newCol[ind] = newCol[i];
          newCol[i] = null;
        }else if(previous === newCol[i] && newCol[i] !== null){
          moved = true;
          newCol[ind] = 2 * newCol[i];
          newCol[i] = null;
        }else{
          if(newCol[i] !== null){
            newCol[ind + 1] = newCol[i]
            if(ind + 1 !==i){
              moved = true;
              newCol[i] = null;
            }
          }
        }
      }
      return newCol;
    });
    newGrid = this.transpose(newGrid);
    console.log(newGrid);
    return {moved: moved, newGrid: newGrid};
  }

  moveLeft(grid){
    let moved = false;
    let newGrid = this.cloneGrid(grid);
    newGrid = newGrid.map(row => {
      const newRow = row.slice();
      //start at one because first cell cannot move further up
      for(let i = 1; i<row.length; i++){
        let ind = i - 1;
        let previous = newRow[ind];
        while(previous === null && ind !== 0){
          ind--;
          previous = newRow[ind];
        }
        if(previous === null && newRow[i] !== null){
          moved = true;
          newRow[ind] = newRow[i];
          newRow[i] = null;
        }else if(previous === newRow[i] && newRow[i] !== null){
          moved = true;
          newRow[ind] = 2 * newRow[i];
          newRow[i] = null;
        }else{
          if(newRow[i] !== null){
            newRow[ind + 1] = newRow[i]
            if(ind + 1 !==i){
              moved = true;
              newRow[i] = null;
            }
          }
        }
      }
      return newRow;
    });
    return {moved: moved, newGrid: newGrid};
  }

  moveDown(grid){
    let moved = false;
    let transposed = this.transpose(grid);
    let newGrid = this.cloneGrid(transposed);

    newGrid = newGrid.map(col => {
      const newCol = col.slice().reverse();
      //start at one because first cell cannot move further up
      for(let i = 1; i<col.length; i++){
        let ind = i - 1;
        let previous = newCol[ind];
        while(previous === null && ind !== 0){
          ind--;
          previous = newCol[ind];
        }
        if(previous === null && newCol[i] !== null){
          moved = true;
          newCol[ind] = newCol[i];
          newCol[i] = null;
        }else if(previous === newCol[i] && newCol[i] !== null){
          moved = true;
          newCol[ind] = 2 * newCol[i];
          newCol[i] = null;
        }else{
          if(newCol[i] !== null){
            newCol[ind + 1] = newCol[i]
            if(ind + 1 !==i){
              moved = true;
              newCol[i] = null;
            }
          }
        }
      }
      return newCol.reverse();
    });
    newGrid = this.transpose(newGrid);
    return {moved: moved, newGrid: newGrid};
  }

  moveRight(grid){
    let moved = false;
    let newGrid = this.cloneGrid(grid);
    newGrid = newGrid.map(row => {
      const newRow = row.slice().reverse();
      //start at one because first cell cannot move further up
      for(let i = 1; i<row.length; i++){
        let ind = i - 1;
        let previous = newRow[ind];
        while(previous === null && ind !== 0){
          ind--;
          previous = newRow[ind];
        }
        if(previous === null && newRow[i] !== null){
          moved = true;
          newRow[ind] = newRow[i];
          newRow[i] = null;
        }else if(previous === newRow[i] && newRow[i] !== null){
          moved = true;
          newRow[ind] = 2 * newRow[i];
          newRow[i] = null;
        }else{
          if(newRow[i] !== null){
            newRow[ind + 1] = newRow[i]
            if(ind + 1 !==i){
              moved = true;
              newRow[i] = null;
            }
          }
        }
      }
      return newRow.reverse();
    });
    return {moved: moved, newGrid: newGrid};
  }

  cloneGrid(grid){
    return grid.slice().map(el => el.slice());
  }

  //Might break due to confusion between width and height
  transpose(grid) {
    const newGrid = Array(this.height).fill(0).map(el => Array(this.width).fill(null));
    for(let i = 0; i<grid.length; i++){
      for(let j = 0; j<this.width; j++){
        newGrid[i][j] = grid[j][i];
      }
    }
    return newGrid;
  }

  move(direction, grid){
    let moveGrid;
    switch (direction) {
      case MOVE_UP:
        moveGrid = this.moveUp(grid);
        break;
      case MOVE_LEFT:
        moveGrid = this.moveLeft(grid);
        break;
      case MOVE_DOWN:
        moveGrid = this.moveDown(grid);
        break;
      case MOVE_RIGHT:
          moveGrid = this.moveRight(grid);
          break;
      default:
        moveGrid = {moved:false, newGrid: grid};
        break;
    }
    if(moveGrid.moved){
      moveGrid.newGrid = this.newRandomCell(moveGrid.newGrid);
      console.log("moved");
    }
    console.log("Game is over" + this.isOver(moveGrid.newGrid).toString());
    return moveGrid.newGrid;
  }

  newRandomCell(grid) {
    const cell = this.getFreeCell(grid);
    let newGrid = this.cloneGrid(grid)
    newGrid[cell.x][cell.y] = this.initValues[getRandomInt(2)];
    return newGrid;
  }

  restart(grid){
    let newGrid = this.init();
  }

  score(grid){
   let score = 0;
   grid.forEach(el => {
     el.forEach(cell =>{
       score += cell;
     });
   });
   return score;
  }

  //notComplete
  isOver(grid) {
    let isOver = true;
    for (let i = 0; i < this.width; i++){
      for (let j = 0; j < this.height; j++){
        isOver = isOver && this.checkNeighbors(grid, i, j)
      }
    }
    return isOver;
  }


  checkNeighbors(grid, i, j) {
    const cell = grid[i][j];
    let neighbors = [];
    if(i !==0){
      //i - 1
      neighbors.push(cell === grid[i-1][j] || grid[i-1][j] === null);
    }
    if(i !== this.width - 1){
      //i+1
      neighbors.push(cell === grid[i+1][j] || grid[i+1][j] === null);
    }
    if(j !==0){
      //j - 1
      neighbors.push(cell === grid[i][j-1] || grid[i][j-1] === null);
    }
    if(j !== this.height - 1){
      //j+1
      neighbors.push(cell === grid[i][j+1] || grid[i][j+1] === null);
    }
    return neighbors.reduce((acc, cur) => {
      acc = acc && !cur;
      return acc;
    },true);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
