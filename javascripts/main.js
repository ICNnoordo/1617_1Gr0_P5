///////////////////////////////////////////////////////////////////////////// DEBUT1
// Définition d'une fonction SupprAcc pour remplacer des lettres accentuées.
var regles = {  a:"àáâãäå",
                A:"ÀÁÂ",
                e:"èéêë",
                E:"ÈÉÊË",
                i:"ìíîï",
                I:"ÌÍÎÏ",
                o:"òóôõöø",
                O:"ÒÓÔÕÖØ",
                u:"ùúûü",
                U:"ÙÚÛÜ",
                y:"ÿ",
                c: "ç",
                C:"Ç",
                n:"ñ",
                N:"Ñ"
    }; 
function  getJSONKey(key){
    for (acc in regles){
        if (regles[acc].indexOf(key)>-1){return acc}
    }
}
function SupprAcc(Texte){
    regstring=""
    for (acc in regles){
        regstring+=regles[acc]
    }
    reg=new RegExp("["+regstring+"]","g" )
    return Texte.replace(reg,function(t){ return getJSONKey(t) });
}
///////////////////////////////////////////////////////////////////////////// FIN1

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}


var sectionHeight = function() {
  var total    = $(window).height(),
      $section = $('section').css('height','auto');

  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height','auto');
  }
}

function getStyle(el, styleProp) {
    if (el.currentStyle)
        return el.currentStyle[styleProp];
    else if (window.getComputedStyle)
        return document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
}

$(document).ready(function(){
  $("title").html(config.projet.title);
  $("header h1").html(config.projet.h1);
  $("header p").html(config.projet.h1p);
  $("#a_home").attr("href",config.liens.home);
  $("#a_home_VO").attr("href",config.liens.home+config.liens.nomgit);
  $("#a_home_VD").attr("href",config.liens.hubio+config.liens.nomgit);
  $("#a_fichiers_VO").attr("href",config.liens.vo+config.liens.nomgit);
  $("#a_fichiers_VD").attr("href",config.liens.vd+config.liens.nomgit);
  $("footer").html(pieddepage);
  
  $("section h2").each(function(){
    var idsection = SupprAcc($(this).text()).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'');
    
    var tit = ($(this).data('text')) ? $(this).data('text') : $(this).text();
    $("div.div_home ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + idsection + "' class='button'>" + tit + "</a></li>");
    if(!$(this).hasClass("presentation")){
        $("nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + idsection + "' class='button'>" + $(this).text() + "</a></li>");
        $("nav ul li:first-child a").parent().addClass("active");
    } 
    $(this).attr("id",idsection);
  });
  
  $("nav ul li, div.div_home ul li").on("click", "a", function(event) {  
    var banner = $("#banner")[0];
    var position = $($(this).attr("href")).offset().top - ((parseInt(getStyle(banner,'top')))+(parseInt(getStyle(banner,'height')))+50);
    $("html, body").animate({scrollTop: position}, 400);
    $("nav ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();    
  });

    $("a.newonglet").click(function(){
        window.open(this.href);
        return false;    
    });
    
  switch(window.location.hostname) {
    case extractDomain(config.liens.home):
        $("body > header > p").prepend("Dernière version supervisée (VO) du ");
        $(".VO").css("display","inline-block");
        $(".VD").css("display","none");
        break;  
    case extractDomain(config.liens.hubio):
        document.title = 'DEV-'+document.title;
        $("body > header > h1").prepend("DEV-");
        $("body > header > h1").css("background-color","red");
        $("body > header > p").prepend("Version de développement (VDev) du ");
        $(".VO").css("display","none");
        $(".VD").css("display","inline-block");
        break;  
    default:
        document.title = 'LOC-'+document.title;
        $("body > header > h1").prepend("LOC-");
        $("body > header > h1").css("background-color","green");
        $("body > header > p").prepend("Version locale du ");
        $(".VO").css("display","inline-block");
        $(".VD").css("display","inline-block");
        break;  
  }
  
  $(window).resize(function() {    
    var banner = $("#banner")[0];
    var position = (parseInt(getStyle(banner,'top')))+(parseInt(getStyle(banner,'height')))-135;
    $("html, body").animate({scrollTop: position}, 400);
    
    sectionHeight();
  });

  sectionHeight();
  
  $('img').load(sectionHeight);
  
      $("#div_comm").mouseover(function () {
        $('#div_comm').removeClass('dessous');
        $('#div_comm').addClass('dessus');
    });
    $("#div_comm").mouseout(function () {
        $('#div_comm').removeClass('dessus');
        $('#div_comm').addClass('dessous');
    });

});

pieddepage = function() {
    var pied = "<p class='small'>";
    pied += "Projet maintenu par<br />";
    pied += "le groupe ISN "+config.equipe.groupe+" :<br />";
    $.each(config.equipe.developpeurs, function() {
        pied += this.prenom+" (<a href='"+this.url+"'>"+this.pseudo+"</a>)<br />";
    });
    pied += "et supervisé par <a href='"+config.equipe.superviseur.url+"'>"+config.equipe.superviseur.pseudo+"</a><br />";
    pied += "Page hébergée sur GitHub Pages</p>";
    return pied;
};

fixScale = function(doc) {

  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }

  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [.25, 1.6];
    doc[addEvent](type, fix, true);
  }
};