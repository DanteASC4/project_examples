function setup() {
    createCanvas(1000,1000);
    cursor(CROSS);
  }
  /*
  Note: This project was a bit rushed, so it's somewhat messy. Also, Students definitely do NOT have to animate the attacks or anything

  Example Psuedo code:
  -----
  Main goal: A simple pokemon battle

  Tasks:
  1. create background / enviornment
  2. create buttons / attacks
    - Reset button, and button for attack(s)
  3. create simple representations of pokemon
  4. create a way for the user to attack, followed by the computer attacking
  5. check if either pokemon's hp has reached 0
    - Display either win or lose screen

  Extra time:
  1. Make the 'pokemon' look a bit more like pokemon
  2. Maybe some simple animations for the attacks
  3. Choose between pikachu and squirtle

  Now: Working on endScreen function which should replace the attack buttons with see desc. Might have to make current attack buttons to it's own function, and before drawing them check if endscreen or not. To make sure the correct buttons are drawn
  Next: Check whose turn it is, player or computer, check for computer first. User noCursor() during cpu turn
  Then: Finish up animations for the attacks.

  */
  const r = (min, max) => Math.floor(Math.random() * max) + min;
  const f = n => console.log('flag ' + n)



  let tackle = false;
  let thunderbolt = false;

  let attackAnim = false;
  let faintAnim = false;
  let faintState = false;

  let anim = false;
  let cAnim = false;
  let winlose = 'na';

  let turn = 0;


  let pikachu = {
    name: 'Pikachu',
    hp: 100,
    attack: 25,
    defense: 10,
    hpBar: 300,
    x: 250,
    y: 650,
    fainted: false
  }

  let charmander = {
    name: 'Charmander',
    hp: 100,
    attack: 20,
    defense: 25,
    hpBar: 300,
    x: 760,
    y: 360,
    fainted: false
  }
  function keyPressed(){ // A simple function that will stop the draw loop when you press 'c'
    if(keyCode === 67){
      noLoop();
    }
  }

  const faintChecker = (t, dmg) =>{
    //Will need to tweak this in the future if I decide to add selection for pokemon
    if(t == 'Charmander'){
      return charmander.hp - dmg <= 0 ? charmander.fainted = true : false;
    }else{
      return pikachu.hp - dmg <= 0 ? pikachu.fainted = true : false;
    }
  }

  const fainted = (t) => {
    if(t == 'Charmander'){
      charmander.hpBar = 0;
      charmander.hp = 0;
      faintAnim = true;
      faintState = true;
    }else{
      pikachu.hpBar = 0;
      pikachu.hp = 0;
      faintAnim = true;
      faintState = true;
    }
  }

  function attack(c, tName) {
    if(tName == 'Charmander'){
      if(c == 'tackle'){
        //Attack damage = attack - defense/10
        let damage = pikachu.attack - (charmander.defense/10) - r(1, 10); //Damage calculation, just some math, nothing crazy.
        faintChecker('Charmander', damage); //Checking if the attack would cause target to faint
        if(charmander.fainted){ //If the attack would kill them, the hp should be shown as 0
          fainted('Charmander')
        }else{
          charmander.hpBar -= Math.floor((damage*300)/100);
          charmander.hp -= damage;
        }
        tackle = true;
        attackAnim = true;
        setTimeout(function () {
          turn = 1;
        }, 1000);
      }
      if(c == 'thunderbolt'){
        //Attack damage = attack - defense/10
        let damage = (pikachu.attack*2.25) - (charmander.defense/10) - r(1, 20);
        faintChecker('Charmander', damage);
        if(charmander.fainted){
          fainted('Charmander');
        }else{
          charmander.hpBar -= Math.floor((damage*300)/100);
          charmander.hp -= damage;
        }
        thunderbolt = true;
        attackAnim = true;
        setTimeout(function () {
          turn = 1;
        }, 1000);
      }

    }else{
      // This is where charmander 'attacks' pikachu.
      let damage = (charmander.attack*2) - (pikachu.defense/10) - r(1, 20);
      faintChecker('Pikachu', damage);
      if(pikachu.fainted){
        fainted('Pikachu');
      }else{
        pikachu.hpBar -= Math.floor((damage*300)/100);
        pikachu.hp -= damage;
      }
		turn = 0;
	  }
  }

  const cAttack = () =>{
    attack('default', 'pikachu');
  }

  function mouseClicked() {
    if(mouseX <= 340 && mouseX >=80 && mouseY <= 900 && mouseY >= 840 && turn === 0 && !anim && winlose == 'na'){
      attack('tackle', 'Charmander');

    }
    if(mouseX <= 910 && mouseX >= 450 && mouseY <= 900 && mouseY >= 840 && turn === 0 && !anim && winlose == 'na'){
      attack('thunderbolt', 'Charmander');
    }
    if(mouseX <= 910 && mouseX >= 450 && mouseY <= 900 && mouseY >= 840 && turn === 0 && !anim && winlose=='win'){
      location.reload();
    }
  }


  function draw(){
    if(charmander.x == 760 && charmander.y == 360){
      cAnim = false;
    }else{
      cAnim = true;
    }
    if(pikachu.x == 250 && pikachu.y == 650){
      anim = false;
    }else{
      anim = true;
    }
    if(!cAnim && turn == 1){
      attack('default', 'pikachu');
    }
    // grass
    background('#51FF3B');

    // sky
    fill('#2b9ace')
    rect(0, 0, width, 300)

    // creating the platforms
    fill(255);
    stroke(0);
    strokeWeight(4);
    strokeCap(SQUARE);
    fill('#E5D29A');
    ellipse(750, 400, 500, 65);
    ellipse(250, 700, 500, 65);



    // tackle animation logic, need to get this out so slack me if you want an explanation of it
    if(attackAnim){
      frameCount = 0;
      attackAnim = false;
    }
    if(tackle == true && frameCount < 32){
      if(frameCount <= 16){
        pikachu.x += 8;
        pikachu.y -= 8;
      }if(frameCount > 16){
        pikachu.x -= 8;
        pikachu.y += 8;
      }
    }
    if(frameCount == 32 && tackle == true){
      pikachu.x = 250;
      pikachu.y = 650;
      tackle = false;
    }
    if(thunderbolt == true && frameCount < 32){
      // thunderbolt
      fill('yellow');
      quad(262, 600, 278, 612, 542, 416, 516, 416)
      quad(542, 416, 516, 416, 577, 302, 600, 301)
      quad(542, 416, 516, 416, 701, 357, 726, 380)
    }
    if(frameCount == 32 && thunderbolt == true){
      thunderbolt = false; // stopping the thunderbold animation
    }


    // faint 'animation' logic
    if(charmander.fainted && faintAnim){ // checking if the pokemon has fainted and the faint animation has been started
      setTimeout(function () { //Waiting a second for any in-progress attack animation to finish
        if(faintState){
          frameCount = 100; // changing the framecount to control how long an the animation lasts
          faintState = false; // we only want to change the frames once
        }
        if(faintAnim && frameCount < 132){
          charmander.y += 24; // sliding charmander off screen
        }
        if(frameCount == 132){
          faintAnim = false; // ending the faint animation
          winlose = 'win'; // if charmander fainted you won!
        }
      }, 1000);
    }
    if(pikachu.fainted && faintAnim){
      setTimeout(function () { //Waiting a second for any in-progress attack animation to finish
        if(faintState){
          frameCount = 100;
          faintState = false;
        }
        if(faintAnim && frameCount < 132){
          pikachu.y += 24;
        }
        if(frameCount == 132){
          faintAnim = false;
          winlose = 'lose';
        }
      }, 1000);
    }

    // 'pikachu'
    fill('yellow');
    ellipse(pikachu.x, pikachu.y, 100);

    // 'charmander'
    fill('orange');
    ellipse(charmander.x, charmander.y, 100);

    // button white bg area
    fill(255);
    rect(0, 750, width, height - 750);
    rect(25, 770, width - 50, height - 790);

    fill('red')
    rect(550, 500, 300, 30); //Hp bar red bg
    rect(200, 200, 300, 30); //Hp bar red bg

    fill('green')
    rect(550, 500, pikachu.hpBar, 30); //Pikachu hp bar
    rect(200, 200, charmander.hpBar, 30); //Charmander hp bar

    // attack buttons
    if(winlose == 'na'){
      fill('rgba(144, 156, 175, .5)');
      stroke(0);
      rect(80, 840, 260, 60)
      rect(450, 840, 460, 60)

      fill(0);
      noStroke();
      textSize(56);
      text('TACKLE', 95, 890)
      text('THUNDER BOLT', 460, 890)
    }

    // text showing remaining hp
    noStroke();
    textSize(16);
    textStyle(BOLD);
    fill(0);
    text('Charmander \nHP: ' + charmander.hp + '/100', 200, 175)
    text('Pikachu \nHP: ' + pikachu.hp + '/100', 550, 475)

    // Uncomment these next few lines for text showing where your cursor is, and the frame count
    // noStroke();
    // fill(255, 0 , 0);
    // text(mouseX + '\n' + mouseY, mouseX + 10, mouseY + 10);
    // text(mouseX + '\n' + mouseY, 50 , 50);
    // text(frameCount, 50, 90)


    // end screen
    if(charmander.fainted && winlose == 'win'){
      fill('rgba(144, 156, 175, .5)');
      stroke(0);
      rect(80, 840, 265, 60)
      rect(450, 840, 460, 60)

      fill(0)
      noStroke();
      textSize(56);
      text('YOU WIN!', 85, 890)
      text('REPLAY?', 560, 890)

    }
    if(pikachu.fainted && winlose == 'lose'){
      fill('rgba(144, 156, 175, .5)');
      stroke(0);
      rect(80, 840, 265, 60)
      rect(450, 840, 460, 60)

      fill(0)
      noStroke();
      textSize(26);
      text('PIKACHU \nFAINTED!', 150, 862)
      textSize(54);
      text('REPLAY?', 560, 890)    }

  }
