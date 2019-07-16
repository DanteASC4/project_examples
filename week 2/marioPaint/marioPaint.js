function setup() {
  createCanvas(window.innerWidth, window.innerHeight); //A big canvas size
  background(0);
  noStroke();
  ellipseMode(CENTER);
  rectMode(CENTER);
  cursor(CROSS);
}

const r = (min, max) => Math.floor(Math.random() * max) + min; //A random number with min and max to be used outside of just p5 functions

let brush = 'random';

function mouseClicked() {
  //Checking if user clicks on buttons:

  if(mouseX >= 50 && mouseX <= 150 && mouseY >= 25 && mouseY <= 75){ //Checking if mouse is in bounds of rectangle button
    brush = 'rectangle'; //Changing the brush variable to 'rectangle'
  }
  if(mouseX >= 212.5 && mouseX <= 287.5 && mouseY >= 12.5 && mouseY <= 87.5){ //Checking if the user is clicking in the area of the circle, plus some. Doesn't have to be exact
    brush = 'circle';
  }
  if(mouseX >= 325 && mouseX <= 425 && mouseY >= 5 && mouseY <= 85 ){
    brush = 'triangle';
  }
  if(mouseX >= 462.5 && mouseX <= 537.5 && mouseY >= 12.5 && mouseY <= 87.5){ //Checking if mouse is in the bounds of the reset button
    clear() //Clear the canvas
    background(0) //Black background
    brush = 'random'; //Setting the brush back to default
  }
}

function mouseDragged() {
  fill(r(0, 255), r(0, 255), r(0, 255)); //Random color

  //Shape drawn is based on the brush variable. Default is random
  if(brush == 'random'){
    if(r(1, 3) === 1) triangle(mouseX, mouseY - 50,  mouseX + 50, mouseY + 50, mouseX - 50, mouseY + 50);
    if(r(1, 3) === 2) ellipse(mouseX, mouseY, r(25, 75), r(25, 75));
    if(r(1, 3) === 3) rect(mouseX, mouseY, r(25, 75), r(25, 75));
  }
  if(brush == 'circle'){
    ellipse(mouseX, mouseY, 75);
  }
  if(brush == 'triangle'){
    triangle(mouseX, mouseY - 50,  mouseX + 50, mouseY + 50, mouseX - 50, mouseY + 50)
  }
  if(brush == 'rectangle'){
    rect(mouseX, mouseY, 100, 50)
  }
}



function draw() {


  fill(255);
  rect(100, 50, 100, 50); //Rectangles button
  ellipse(250, 50, 75); //Circles button
  triangle(375, 10, 425, 85, 325, 85); //Triangles button
  rect(500, 50, 75, 75) //Reset button

  //Labeling each button:
  fill(0);
  textStyle(BOLD);
  textSize(16);
  text('Rectangles', 60, 55);
  text('Circles', 225, 55);
  textSize(13);
  text('Triangles', 350, 65)
  textSize(16);
  text('Reset', 480, 55);





}
