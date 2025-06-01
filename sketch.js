
let grid;
let rows, cols;
let scl=10;
let strokeSize=1;
let simSpeed=20;

function setup() {
  textFont('Verdana');
  createCanvas(windowWidth, windowHeight);
  rows=floor(height/scl);
  cols=floor(width/scl);
  grid=createGrid(cols, rows);
  //drawingContext.shadowBlur = 32;
  //drawingContext.shadowColor = color(255, 255, 255);
  fill(255);
  textSize(20);
}

function createGrid(cols, rows){
  arr = new Array(cols);
  for(let i=0; i<cols; i++){
    arr[i] = new Array(rows);
    for(let j=0; j<rows; j++){
      arr[i][j]=0;
    }
  }
  return arr;
}

let pauseFlag=true;
let eraseFlag = false;
let gen=0;
function draw() {
  background(0);
  frameRate(simSpeed);
  
  //adding new automata
  if(mouseIsPressed===true && pauseFlag===true){
    frameRate(60);
    let x = floor(mouseX/scl);
    let y = floor(mouseY/scl);
    
    modifyPixels(x,y,eraseFlag);
    
  }
  
  if(!pauseFlag){
    let nextGrid = createGrid(cols, rows);
    //applying rules
    for(let i=0; i<cols; i++){
      for(let j=0; j<rows; j++){
        let neighbours = neighboursAlive(i,j);
        if(grid[i][j]===1){
          if(neighbours>=2 && neighbours<=3){
            nextGrid[i][j]=1;
          }
        } else {
          if(neighbours===3){
            nextGrid[i][j]=1;
          }
        }
      }
    }
    
    grid=nextGrid;
    gen++;
  }
  
  //displaying
  for(let i=0; i<cols; i++){
    for(let j=0; j<rows; j++){
      if(grid[i][j]===1){
        //stroke(255);
        push();
        noStroke();
        rect(i*scl, j*scl, scl, scl);
        pop();
      }
    }
  }
  
  //stroke(0);
  //strokeWeight(3);
  text(gen, 100, 100);
  
  let padding = 30;
  let lineHeight = textAscent() + 6;

  fill(255);
  noStroke();

  let brushInfo = `Mode: ${eraseFlag ? "Eraser" : "Brush"}`;
  let brushSizeInfo = `Brush Size: ${strokeSize}`;
  let speedInfo = `Speed: ${simSpeed} fps`;
  let pauseInfo = `Status: ${pauseFlag ? "Paused" : "Running"}`;
  let infoLines = [pauseInfo, brushInfo, brushSizeInfo, speedInfo];

  for (let i = 0; i < infoLines.length; i++) {
    let textStr = infoLines[i];
    let w = textWidth(textStr);
    text(textStr, width - w - padding, height - padding - (infoLines.length - 1 - i) * lineHeight);
  }
}

function modifyPixels(x, y, flag){
//can add or remove pixels depending on the flag value
let extent=floor(strokeSize/2);
  
  if(extent===0){
    if(flag===false){
        if(grid[x][y]===0){
          grid[x][y]=1;
        }
      } else {
        if(grid[x][y]===1){
          grid[x][y]=0;
        }
      }
    return;
  }
    
 for(let i=-extent; i<extent; i++){
    for(let j=-extent; j<extent; j++){
      if(x+i>=0 && x+i<cols && j+y>=0 && j<rows){
        if(flag===false){
          if(grid[x+i][y+j]===0){
            grid[x+i][y+j]=1;
          }
        } else {
          if(grid[x+i][y+j]===1){
            grid[x+i][y+j]=0;
          }
        }
      }
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    pauseFlag = !pauseFlag;
    print(pauseFlag ? "Paused!" : "Continued!");
  } else if (key === 'e' || key === 'E') {
    eraseFlag = !eraseFlag;
    print(eraseFlag ? "Erase Mode!" : "Draw Mode!");
  } else if (key === '+' || key === '=') {
    simSpeed = min(60, simSpeed + 5);
    print("Speed:", simSpeed);
  } else if (key === '-' || key === '_') {
    simSpeed = max(1, simSpeed - 5);
    print("Speed:", simSpeed);
  }
}

function mouseWheel(event) {
  let movement = event.delta;
  if(movement>0){
    if(strokeSize+2<15){
       strokeSize+=2;
      print(strokeSize);
    }
  } else if(movement<0){
    if(strokeSize-2>0){
      strokeSize-=2;
    } else {
      strokeSize=1;
    }
    print(strokeSize);
  }
  //uncomment to block page scrolling
  //return false;
}
function neighboursAlive(i, j){
  
  let count=0;
  //N
  if(j-1>=0){
    if(grid[i][j-1]===1){
      count++;
    }
    //NW
    if(i-1>=0){
      if(grid[i-1][j-1]===1){
          count++;
      }
    }
    //NE
    if(i+1<cols){
      if(grid[i+1][j-1]===1){
        count++;
      }
    }
  }
    
  //S
  if(j+1<rows){
    if(grid[i][j+1]===1){
      count++;
    }
    if(count>3){
      return count;
    }
    
    //SW
    if(i-1>=0){
      if(grid[i-1][j+1]===1){
        count++;
      }
    }
    if(count>3){
      return count;
    }
    
    //SE
    if(i+1<cols){
      if(grid[i+1][j+1]===1){
        count++;
      }
    }
    if(count>3){
      return count;
    }
  }
    
  //E
  if(i-1>=0){
    if(grid[i-1][j]===1){
      count++;
    }
  }
  if(count>3){
    return count;
  }
  //W
  if(i+1<cols){
    if(grid[i+1][j]===1){
      count++;
    }
  }
  
  return count;
}