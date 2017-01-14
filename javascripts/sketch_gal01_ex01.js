var sketch1 = function( p ) {

    var theta;   

    p.setup = function() {
        p.createCanvas(640, 360);
    };

    p.draw = function() {
        p.background(51);
        // Let's pick an angle 0 to 90 degrees based on the mouse position
        theta = p.map(p.mouseX,0,p.width,0,p.PI/2);

        // Start the tree from the bottom of the screen
        p.translate(p.width/2, p.height);
        p.stroke(255);
        p.branch(120);
    };

    p.branch = function(len) {
          // Each branch will be 2/3rds the size of the previous one

          //float sw = map(len,2,120,1,10);
          //strokeWeight(sw);
          p.strokeWeight(2);
              
          p.line(0, 0, 0, -len);
          // Move to the end of that line
          p.translate(0, -len);

          len *= 0.66;
          // All recursive functions must have an exit condition!!!!
          // Here, ours is when the length of the branch is 2 pixels or less
          if (len > 2) {
                p.push();    // Save the current state of transformation (i.e. where are we now)
                p.rotate(theta);   // Rotate by theta
                p.branch(len);       // Ok, now call myself to draw two new branches!!
                p.pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state

                // Repeat the same thing, only branch off to the "left" this time!
                p.push();
                p.rotate(-theta);
                p.branch(len);
                p.pop();
        }
    };
    
};
var monsketch1 = new p5(sketch1,"div_sketch1");
