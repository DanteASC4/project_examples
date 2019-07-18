
function createEnemies(x, y){ // function to populate array of enemey coordinates with array holding x and y vals based on given values
  enemiesCoordsArr.push([x, y]);
}

function setup(){
  createCanvas(600, 400);
  rectMode(CENTER);
  for(let i = 0; i < 5; i++){
    createEnemies(i*100+100, 60); // populating the array of enemies coordinates on setup
  }
  noStroke(); // no outlines
  frameCount = 68; // for bullet purposes
}


let shipX = 300; // ship starts in the middle

let originalY = 335; // the y value that bullets start from so it looks like it comes from the 'ship'
let bulletY = 335; // actual y that will be changed when it's moving
let bulletX = -100; // bullet stays off screen until fired

let fired = false; // when the initial key for firing is down, the bullet has been 'fired' that's when we begin moving it
let bulletAnim = false; // until it has moved for it's set distance, it's still in the bullet 'animation'

let enemiesCoordsArr = [] // array that will hold five nested arrays each holding the coordinates of the enemies
const spdArr = [7, 7, 7, 7, 7]; // speed of each enemy
const enemyStatus = [1, 1, 1, 1, 1]; // how we'll know if they're alive or 'dead' when they get hit
const distanceArr = [0, 0, 0, 0, 0]; // array that will have each value set to the distance between the enemy and the bullet, will determine collision

let dropSpeed = 25; // how far down the enemies move when they hit the wall

// grabbing the x value of the 'ship' only when it is fired, not 60 times a second, and setting the bulletX value to it
// This keeps the bullet moving in a straight line
const shipXGrabber = () =>{
  bulletX = shipX;
}

// creating the ship
function drawShip(){
  fill(255);
  rect(shipX, height-25  , 20, 50);
  // rect mode is center so the height of the canvas minus half the height of the rect is at the bottom
}


function drawEnemies(x, y){ // creating the enemies!
  for(let i = 0; i < 5; i++){
    if(enemyStatus[i] == 0){ // checking if they're ded  if they are hide em.
      fill('#333333');
      // camo and blowing them offscreen into outerspace
      enemiesCoordsArr[i][0] = -1000;
      enemiesCoordsArr[i][1] = -1000;
      ellipse(enemiesCoordsArr[i][0], enemiesCoordsArr[i][1], 40, 40);
    }
    else{ // if they're alive they're alive and should be seen.
      fill('#f54263');
      ellipse(enemiesCoordsArr[i][0], enemiesCoordsArr[i][1], 40, 40);
    }
  }
}


function moveBullet(){ // function that initiates the bullet movement
  if(bulletY < 0) bulletY = originalY; // resetting the position of the bullet if it goes off screen
  fired = true; // our bullet has been fired
  bulletAnim = true; // we begin the animation here
}

function moveShip(){ // function for controlling ship movement
  if(keyIsDown(RIGHT_ARROW) ) shipX += 2; // increase / decrease x val based on keys
  if(keyIsDown(LEFT_ARROW)  ) shipX -= 2; // separate from key pressed so that you can hold down the keys
}

function keyPressed(){
  if(keyCode === UP_ARROW && !fired){ // if you haven't already fired a bullet and pressed up arrow...
    shipXGrabber(); // move bullet to ship
    moveBullet(); // begin bullet 'movement'
  }
  if(keyCode === 82){ // restart key
    location.reload();
  }
}

function ender(){ // checks if you've won or lost
  let sum = 0; // will tell us if they're all alive
  enemyStatus.map(x => sum += x);  // sum of status array is 5, as they're all alive to start, 1 indicates alive, as there are 5 enemies.
  if(sum == 4) dropSpeed = 35; // increasing how far down they go based on how many are left
  if(sum == 3) dropSpeed = 45;
  if(sum == 2) dropSpeed = 55;
  if(sum == 1) dropSpeed = 65;

  if(sum === 0){ // if the sum is zero, they're all dead! Nice!
    fill(0);
    rect(300, 200, 600, 400);
    textAlign(CENTER);
    textSize(56);
    fill(255);
    text('YOU WIN!', 300, 200)
    textSize(48);
    text('PLAY AGAIN? PRESS R!', 300, 300);
  }

  enemiesCoordsArr.map(x =>{ // if any get too close to the ship, you lose. Iterating through the array of coordinates and checking the y values
    if(x[1] >= 350){
      fill(0);
      rect(300, 200, 600, 400);
      textAlign(CENTER);
      textSize(56);
      fill(255);
      text('YOU LOSE!', 300, 200)
      textSize(48);
      text('PLAY AGAIN? PRESS R!', 300, 300);
      noLoop();
    }
  })
}


function draw(){
  background(51);
  drawShip();
  moveShip();
  drawEnemies();
  for(let i = 0; i < 5; i++){ // moving the 5 enemies based on their 5 individual speeds
    enemiesCoordsArr[i][0] += spdArr[i];
    if(enemiesCoordsArr[i][0] >= 590 || enemiesCoordsArr[i][0] <= 10){ // checking if they hit the walls
      spdArr[i] = -spdArr[i]; // if so, reverse direction
      enemiesCoordsArr[i][1] += dropSpeed; // and move them down
    }
  }


  for(let i = 0; i < 5; i++){ // populating the distance array
    distanceArr[i] = int(dist(bulletX, bulletY, enemiesCoordsArr[i][0], enemiesCoordsArr[i][1]));
  }
  for(let i = 0; i < 5; i++){ // checking if the distance is less than 50, as that means a bullet has hit!
    if(distanceArr[i] <= 50){
      enemyStatus[i] = 0; // that particular enemy is now 'dead'
      bulletY = 3350; // move bullet off screen instantly so you can only kill one enemy with one bullet
    }
  }

  fill('#f54263'); // coloring the bullet
  ellipse(bulletX, bulletY, 15, 15); // bullet creation


  if(fired === true && bulletAnim === true){ // if the bullet has been fired, and the bullet animation has begun
    frameCount = 0; // set the frame count to 0
    bulletAnim = false; // the bullet animation has been triggered, so this is set to false to stop it from going infinitely

  }
  if(frameCount < 67){ // while the frameCount is less than 67
    // 67 because that's the distance between the ship and the top of the canvas dividied by 5, and 5 is the bullet speed.
    // So in 67 frames it's guarnteed to hit the top if the speed is 5
    bulletY -= 5;
  }
  if(frameCount >= 67){ // once we KNOW it's hit the top, we reset all the conditions required to get it going
    fired = false;
    bulletY = originalY;
    bulletX = -100;
  }



  ender(); // checking if the player has one or lost at the end, so the shapes will cover everything. 
}
