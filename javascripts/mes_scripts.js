$(document).ready(function(){

    $("button").on('click',function(){
        if ($(this).parent().find('textarea').is(':visible')) {
            $(this).parent().find('textarea').css( "display","none" );
            $(this).parent().find('div').css( "display","block" );
        } else {
            $(this).parent().find('textarea').css( "display","block" );
            $(this).parent().find('div').css( "display","none" );
        }        
        
    });

});
