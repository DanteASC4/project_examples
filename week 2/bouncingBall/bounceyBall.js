//Initial setup function
function setup(){
  createCanvas(600, 600); //Creating a canvas, (L, W)
  background(0); //Setting a background color
  textSize(16);
}

//Defining two variables, for the x and y coordinates of the circle setting them to a random position in the canvas
let xPos = Math.floor(Math.random() * 599) + 1;
let yPos = Math.floor(Math.random() * 599) + 1;

//Defining two variables for speed
let spdX = 3;
let spdY = 3;

//Defining varible for radius of ellipse
let rad = 25;

//Max speed, and the number the speed is increased by everytime it hits the wall
let maxSpeed = 5;
let speedIncrement = .5;

//Placeholder RGB color values
let r = 255;
let g = 255;
let b = 255;

//Defining a variable for the number of times the ball has been clicked
let clickCount = 0;

//A function that is called whenever you click
function mousePressed(){
  if((mouseX <= xPos+25 && mouseX >= xPos-25) && (mouseY <= yPos+25 && mouseY >= yPos-25)){ //This is checking if the mouse is in the ball
    //If it's in the ball get a random color by randomizing the 3 values used to color the ball
    r = Math.floor(random(0, 255));
    g = Math.floor(random(0, 255));
    b = Math.floor(random(0, 255));
    clickCount++;
  }
  return false; //Preventing default browser behavior
}



//The draw function create our scene!
function draw(){
  background(0); //Why do we need to set the background color here? Try commenting this out!
  fill(r, g, b); //Coloring the ball
  ellipse(xPos, yPos, rad*2, rad*2);
  text('You\'ve clicked the ball ' + clickCount + ' times!', 30, 30);

  // exit();
  //Adding the speed to the position of the ball to move it every time the draw function runs
  xPos += spdX;
  yPos += spdY;

  //A random number between -15 and 15
  let randomNum = Math.floor(random(-15, 15));

  if(xPos < 0){ //Checking if the ball's position is on the edge of the canvas
    xPos = 0; //Making sure it doesn't go beyond the edge

```
if(spdX == maxSpeed || spdX == -maxSpeed){ //Checking if the speed has reached our max speed
  spdX = spdX; //If it has, we will set it equal to itself from now on in order to prevent it from going higher
}
else if(spdX > 0){//Is our speed value positive
  spdX += speedIncrement; //If it's positive we add to it to make it faster
}else{
  spdX -= speedIncrement; //If it's negative we subtract to make it faster
}

spdX = -spdX; //Reversing the direction because it hit a wall
xPos += randomNum; //Making the ball go in a slightly random direction everytime it hits the wall
```

  }

  //Below we repeat this process for the other 3 sides of the canvas
  if(yPos < 0){
    yPos = 0;
    if(spdY == maxSpeed || spdY == -maxSpeed){
      spdY = spdY;
    }
    else if(spdY > 0){
      spdY += speedIncrement;
    }else{
      spdY -= speedIncrement;
    }
    spdY = -spdY;
    yPos += randomNum;
  }
  if(xPos > 600){
    xPos = 600;
    if(spdX == maxSpeed || spdX == -maxSpeed){
      spdX = spdX;
    }
    else if(spdX > 0){
      spdX += speedIncrement;
    }else{
      spdX -= speedIncrement;
    }
    spdX = -spdX;
    xPos -= randomNum;
  }
  if(yPos > 600){
    yPos = 600;
    if(spdY == maxSpeed || spdY == -maxSpeed){
      spdY = spdY;
    }
    else if(spdY > 0){
      spdY += speedIncrement;
    }else{
      spdY -= speedIncrement;
    }
    spdY = -spdY;
    yPos -= randomNum;
  }


}
