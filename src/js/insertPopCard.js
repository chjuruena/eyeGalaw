
var popup1=  document.createElement( 'div' );
popup1.setAttribute('id', 'popup1'); 
// popup1.setAttribute('id', 'overlay'); 
var popup=  document.createElement( 'div' );
popup.setAttribute('id', 'popup'); 
popup.setAttribute('class', 'popup'); 
var title=  document.createElement( 'h2' );
title.innerHTML = "Reminders!"
var close = document.createElement( 'h5' );
close.setAttribute('id', 'close'); 
close.innerHTML= "&#215";
var content=  document.createElement( 'div' );
content.setAttribute('class', 'content'); 

var arr = ["list", "items", "here"];

var strs = [ "Remove any face obstructions.",
"Wearing of eyeglasses is acceptable." ,
"Turn the lights on.", 
"Reangle webcam." ];

var list = document.createElement("ul");
for (var i in strs) {
  var anchor = document.createElement("h5");
  // anchor.href = "#";
  anchor.innerText = strs[i];

  var elem = document.createElement("li");
  elem.appendChild(anchor);
  list.appendChild(elem);
}
content.appendChild(list);




// content.innerHTML= "No face obstruction, Camera Lighting";

var welcome=  document.createElement( 'div' );
welcome.setAttribute('class', 'welcome'); 
welcome.innerHTML= "Welcome to eyeGalaw!";


popup1.appendChild(popup);
popup1.appendChild(welcome);
popup.appendChild(close);
popup.appendChild(title);
popup.appendChild(content);
document.body.appendChild(popup1);
// document.body.appendChild(popup);

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


