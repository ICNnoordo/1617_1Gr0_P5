var drapeauBV = function(sk,larg,haut,coul1,coul2,coul3) {
        sk.noStroke();
        sk.fill (coul1);
        sk.rect(-larg/2, -haut/2, larg/3,haut); // rect(xmin, ymin, l, h)
        sk.fill (coul2);
        sk.rect(-larg/2+larg/3, -haut/2, larg/3,haut);
        sk.fill (coul3);
        sk.rect(-larg/2+2*larg/3, -haut/2, larg/3,haut);
    }

var num = 0;
var idx_pays = 0;

var creationExemple = function( sketch, idx, titreh2="" ){
    ++num;
    idx_pays = idx;
    if(titreh2===""){
        var derniernode = $('div[id^="div_drapeau"]').last();
        var node = $("<div id='div_drapeau"+num+"'></div>");
        var mondrap = new p5(sketch, "div_drapeau"+num);
        derniernode.after(node);
    } else {
        var mondrap = new p5(sketch, "div_drapeau"+num);
        var node = $("<section>"
                        +"<h2>"+titreh2+"</h2>"
                        +"<p>"+mondrap.commentaire+"</p>"
                        +"<div class='div_drapeau'>"
                            +"<button>C</button>"
                            +"<div id='div_drapeau"+num+"'></div>"
                            +"<textarea rows='30' cols='100'>"+sketch+"</textarea>"
                        +"</div>"
                    +"</section>");
        $("#wrapper").append(node);
    }
}

// =========================
// Définition du drapeau 1 : drapeau statique
// =========================
var drapeau_statique = function( p ) {
    
    p.commentaire = "<p>Le drapeau est statique.</p>";
    
    var k = idx_pays;
    
    p.setup = function setup() {
        p.createCanvas(400, 300);
        p.noFill();
    }
    p.draw = function draw() {
        p.translate(p.width/2,p.height/2);
        drapeauBV(p,drap[k][1],drap[k][2],drap[k][3],drap[k][4],drap[k][5]);
    }
    
};

// =========================
// Définition du drapeau 2 : drapeau pouvant changer de taille
// =========================
var drapeau_grossissant = function( p ) {

    p.commentaire = "<p>Le drapeau change de taille.</p>";
    
    var k = idx_pays;
    
    p.setup = function setup() {
        p.createCanvas(400, 300);
    }
    p.draw = function draw() {
        p.clear();
        p.translate(p.width/2,p.height/2);
        p.scale(p.mouseX/(p.width/2));
        drapeauBV(p,drap[k][1],drap[k][2],drap[k][3],drap[k][4],drap[k][5]);
    }
    
};

// =========================
// Définition du drapeau 3 : drapeau qui tourne
// =========================
var drapeau_tournant = function( p ) {

    p.commentaire = "<p>Le drapeau tourne.</p>";

    var k = idx_pays;
    
    p.setup = function setup() {
        p.createCanvas(400, 300);
    }
    p.draw = function draw() {
        p.clear();
        p.translate(p.width/2,p.height/2);
        p.rotate(p.mouseX/20);
        drapeauBV(p,drap[k][1],drap[k][2],drap[k][3],drap[k][4],drap[k][5]);
    }
    
};

// =========================
// Définition du drapeau 4 : drapeau qui roule
// =========================
var drapeau_roulant = function( p ) {

    p.commentaire = "<p>Le drapeau roule.</p>";

    var k = idx_pays;
    
    p.setup = function setup() {
        p.createCanvas(400, 300);
    }
    p.draw = function draw() {
        p.clear();
        p.translate(p.mouseX,p.height/2);
        p.rotate(p.mouseX/20);
        drapeauBV(p,drap[k][1],drap[k][2],drap[k][3],drap[k][4],drap[k][5]);
    }
    
};

// =========================
// Définition du drapeau 5 : drapeau qui change de pays en cliquant
// =========================
var drapeau_changeant = function( p ) {

    p.commentaire = "<p>Le drapeau change de pays quand on clique.</p>";

    var k = idx_pays;
    var nbr = drap.length;
    var can;
    
    p.setup = function setup() {
        can = p.createCanvas(400, 300);
        p.noFill();
        can.mouseClicked(function() {
            console.log(nbr);
            k = (++k)%nbr;    
        });
    }
    p.draw = function draw() {
        p.clear();
        p.translate(p.width/2,p.height/2);
        drapeauBV(p,drap[k][1],drap[k][2],drap[k][3],drap[k][4],drap[k][5]);
    }
    
};

// =========================
// Création des drapeaux
// =========================
var drap = [ ['France',300,200,'#051440','#FFFFFF','#EC1920'],          // idx = 0
             ['Belgique',300,260,'#000000','#FFE936','#FF0F21'],        // idx = 1
             ["Rép.d'Irlande",300,150,'#169B62','#FFFFFF','#FF883E']    // idx = 2
           ];

$(document).ready(function(){
    creationExemple(drapeau_statique,0,"Drapeau 1");
    creationExemple(drapeau_statique,1);
    creationExemple(drapeau_grossissant,1,"Drapeau 2");
    creationExemple(drapeau_grossissant,0);
    creationExemple(drapeau_tournant,2,"Drapeau 3");
    creationExemple(drapeau_roulant,0,"Drapeau 4");
    creationExemple(drapeau_changeant,1,"Drapeau 5");
});






/**

  <script>
    window._p5jsExample = '../assets/examples/en/00_Structure/00_Coordinates.js';
    window.addEventListener('load', function() {
      // examples.init('../assets/examples/en/00_Structure/00_Coordinates.js');
      if (false) {
        var isMobile = window.matchMedia("only screen and (max-width: 480px)");
        document.getElementById('exampleFrame').style.display = 'none';
        if (isMobile.matches) {
          document.getElementById('notMobile-message').style.display = 'none';
          document.getElementById('isMobile-displayButton').style.display = 'block';
        } else {
          document.getElementById('notMobile-message').style.display = 'block';
          document.getElementById('isMobile-displayButton').style.display = 'none';
          document.getElementById('runButton').style.display = 'none';
          document.getElementById('resetButton').style.display = 'none';
        }
      }
    }, true);
  </script>

  **/