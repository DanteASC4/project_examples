function setup() {
  createCanvas(600, 600);
}


let c1 = 'blue';
let c2 = 'blue';


function mouseClicked() {
   //To check if we're in the first square, we only need to check the x since the square takes up the entire y.
  if(mouseX <= 300){
    c1 == 'blue' ? c1 = 'red' : c1 = 'blue'; //Is the color set to blue? if it is make it red, if it's not (the only other option is red so we just check if it's not blue) set it to blue

  }

  //If the mouse is not in the first half of the canvas, or the first square, we know the mouse must be in the second square
  else{
    c2 == 'blue' ? c2 = 'red' : c2 = 'blue'; //Same logic as above
  }
}

function draw() {

  fill(c1)
  rect(0, 0, 300, 300);

  fill(c2)
  rect(300, 0, 300, 300);

}
