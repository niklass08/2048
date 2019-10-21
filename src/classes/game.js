const MOVE_UP = "MOVE_UP";
const MOVE_DOWN = "MOVE_DOWN";
const MOVE_LEFT = "MOVE_LEFT";
const MOVE_RIGHT = "MOVE_RIGHT";

export class Game{

  constructor(width, height){
    this.width = width;
    this.height = height;
    this.grid = Array(width).fill(0).map(el => Array(height).fill(null));
    this.initValues = [2, 4];
  }

  print(){
    console.log(this.grid);
  }

  init(){
    const c1 = this.getFreeCell();
    this.grid[c1.x][c1.y] = this.initValues[getRandomInt(2)];
    const c2 = this.getFreeCell();
    this.grid[c2.x][c2.y] = this.initValues[getRandomInt(2)];
  }

  isFree(coordinate){
    if(coordinate.x === undefined) return false;
    return this.grid[coordinate.x][coordinate.y] === null ? true : false
  }

  getFreeCell(){
    const c = {};
    while(!this.isFree(c)){
      c.x = getRandomInt(this.width);
      c.y = getRandomInt(this.height);
    }
    return c;
  }

  moveUp(){
    let moved = false;
    this.transpose();
    const newGrid = this.cloneGrid();

    this.grid = newGrid.map(col => {
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
    this.transpose();
    return moved;
  }

  moveLeft(){
    let moved = false;
    const newGrid = this.cloneGrid();
    this.grid = newGrid.map(row => {
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
    return moved;
  }

  moveDown(){
    let moved = false;
    this.transpose();
    const newGrid = this.cloneGrid();

    this.grid = newGrid.map(col => {
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
    this.transpose();
    return moved;
  }

  moveRight(){
    let moved = false;
    const newGrid = this.cloneGrid();
    this.grid = newGrid.map(row => {
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
    return moved;
  }

  cloneGrid(){
    return this.grid.slice().map(el => el.slice());
  }

  //Might break due to confusion between width and height
  transpose() {
    const newGrid = Array(this.height).fill(0).map(el => Array(this.width).fill(null));
    for(let i = 0; i<this.grid.length; i++){
      for(let j = 0; j<this.width; j++){
        newGrid[i][j] = this.grid[j][i];
      }
    }
    this.grid = newGrid;
  }

  move(direction){
    let moved;
    switch (direction) {
      case MOVE_UP:
        moved = this.moveUp();
        break;
      case MOVE_LEFT:
        moved = this.moveLeft();
        break;
      case MOVE_DOWN:
        moved = this.moveDown();
        break;
        case MOVE_RIGHT:
          moved = this.moveRight();
          break;
      default:
        moved = false;
        break;
    }
    if(moved){
      this.newRandomCell();
    }
  }

  newRandomCell() {
    const cell = this.getFreeCell();
    this.grid[cell.x][cell.y] = this.initValues[getRandomInt(2)];
  }

  restart(){
    this.grid = Array(this.width).fill(0).map(el => Array(this.height).fill(null));
    this.init();
  }

  score(){
   let score = 0;
   this.grid.forEach(el => {
     el.forEach(cell =>{
       score += cell;
     });
   });
   return score;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
