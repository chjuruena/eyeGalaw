
var popup1=  document.createElement( 'div' );
popup1.setAttribute('id', 'popup1'); 
popup1.setAttribute('class', 'overlay'); 
var popup=  document.createElement( 'div' );
popup.setAttribute('id', 'popup'); 
popup.setAttribute('class', 'popup'); 
var title=  document.createElement( 'h2' );
var close = document.createElement( 'a' );
close.setAttribute('id', 'close'); 
close.innerHTML= "&#215";
var content=  document.createElement( 'div' );
content.setAttribute('class', 'content'); 
content.innerHTML= "No face obstruction, Camera Lighting";
// popup1.appendChild(popup);
popup.appendChild(close);
popup.appendChild(title);
popup.appendChild(content);
document.body.appendChild(popup1);
document.body.appendChild(popup);

// document.getElementById("close").addEventListener("click", function(){
//       $('#popup1').fadeOut('slow',function(){$(this).remove();});
//             $('#popup').fadeOut('slow',function(){$(this).remove();});
// });


$(function() {

// alert( document.getElementById("popup1"));
      $("#close").on("click", function(){
            $('#popup1').fadeOut('slow',function(){$(this).remove();});
            $('#popup').fadeOut('slow',function(){$(this).remove();});
      });
      $("#popup1").on("click", function(){
             $('#popup1').fadeOut('slow',function(){$(this).remove();});
            $('#popup').fadeOut('slow',function(){$(this).remove();});

      });

});


