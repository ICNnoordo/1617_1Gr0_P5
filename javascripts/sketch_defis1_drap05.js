var drap5 = function( p ) {

    var carac = [ ['France',300,200,'#051440','#FFFFFF','#EC1920'],
                  ['Belgique',300,260,'#000000','#FFE936','#FF0F21'],
                  ["Rép.d'Irlande",300,150,'#169B62','#FFFFFF','#FF883E']
               ];
               
    p.drapeauBV = function drapeauBV(larg,haut,coul1,coul2,coul3) {
        p.noStroke();
        p.fill (coul1);
        p.rect(-larg/2, -haut/2, larg/3,haut); // rect(xmin, ymin, l, h)
        p.fill (coul2);
        p.rect(-larg/2+larg/3, -haut/2, larg/3,haut);
        p.fill (coul3);
        p.rect(-larg/2+2*larg/3, -haut/2, larg/3,haut);
    }
    
    p.mouseClicked = function() {
       ++k;
    }
    p.setup = function setup() {
        p.createCanvas(400, 300);
        p.noFill();
        k=0;
        nbr=carac.length;
    }
    p.draw = function draw() {
        p.clear();
        p.translate(p.width/2,p.height/2);
        p.drapeauBV(carac[k][1],carac[k][2],carac[k][3],carac[k][4],carac[k][5]);
    }
    
};
var mondrap5 = new p5(drap5,"div_drap5");