
var backdrop=  document.createElement( 'div' );
backdrop.setAttribute('id', 'backdrop'); 
// backdrop.setAttribute('id', 'overlay'); 
var modal=  document.createElement( 'div' );
modal.setAttribute('id', 'modal'); 
modal.setAttribute('class', 'modal'); 
var title=  document.createElement( 'h2' );
title.innerHTML = "About eyeGalaw!"
var close = document.createElement( 'h5' );
close.setAttribute('id', 'close'); 
close.innerHTML= "&#215";
var content=  document.createElement( 'div' );
content.setAttribute('class', 'content'); 

// var arr = ["list", "items", "here"];

var strs = [ "eyeGalaw is a google chrome extension that uses eye-movements to navigate the browser. The user can normally browse through web pages(normal click and scroll) and navigate using the eyes. "]
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




// creatung eyes

// var surface=  document.createElement( 'div' );
// surface.setAttribute('id', 'surface'); 
// var hover_one=  document.createElement( 'div' );
// hover_one.setAttribute('id', 'hover_one'); 
// var hover_two=  document.createElement( 'div' );
// hover_two.setAttribute('id', 'hover_two'); 
// var hover_three=  document.createElement( 'div' );
// hover_three.setAttribute('id', 'hover_three'); 
// var hover_four=  document.createElement( 'div' );
// hover_four.setAttribute('id', 'hover_four'); 
// var hover_five=  document.createElement( 'div' );
// hover_five.setAttribute('id', 'hover_five');
// var hover_six=  document.createElement( 'div' );
// hover_six.setAttribute('id', 'hover_six'); 
// var hover_seven=  document.createElement( 'div' );
// hover_seven.setAttribute('id', 'hover_seven');  
// var hover_eight=  document.createElement( 'div' );
// hover_eight.setAttribute('id', 'hover_eight'); 
// var hover_nine=  document.createElement( 'div' );
// hover_nine.setAttribute('id', 'hover_nine'); 

// var hover_ten=  document.createElement( 'div' );
// hover_ten.setAttribute('id', 'hover_ten'); 
// var hover_eleven=  document.createElement( 'div' );
// hover_eleven.setAttribute('id', 'hover_eleven'); 
// var hover_twelve=  document.createElement( 'div' );
// hover_twelve.setAttribute('id', 'hover_twelve'); 
// var hover_thirteen=  document.createElement( 'div' );
// hover_thirteen.setAttribute('id', 'hover_thirteen'); 
// var hover_fourteen=  document.createElement( 'div' );
// hover_fourteen.setAttribute('id', 'hover_fourteen'); 
// var hover_fifteen=  document.createElement( 'div' );
// hover_fifteen.setAttribute('id', 'hover_fifteen'); 
// var hover_sixteen=  document.createElement( 'div' );
// hover_sixteen.setAttribute('id', 'hover_sixteen'); 



// var eye=  document.createElement( 'div' );
// eye.setAttribute('id', 'eye'); 
// var eyewhite=  document.createElement( 'div' );
// eyewhite.setAttribute('id', 'eyewhite'); 
// var iris=  document.createElement( 'div' );
// iris.setAttribute('id', 'iris'); 
// var shine=  document.createElement( 'div' );
// shine.setAttribute('id', 'shine'); 

// surface.appendChild(hover_one);
// surface.appendChild(hover_two);
// surface.appendChild(hover_three);
// surface.appendChild(hover_four);
// surface.appendChild(hover_five);
// surface.appendChild(hover_six);
// surface.appendChild(hover_seven);
// surface.appendChild(hover_eight);
// surface.appendChild(hover_nine);
// surface.appendChild(hover_nine);
// surface.appendChild(hover_ten);
// surface.appendChild(hover_eleven);
// surface.appendChild(hover_twelve);
// surface.appendChild(hover_thirteen);
// surface.appendChild(hover_fourteen);
// surface.appendChild(hover_fifteen);
// surface.appendChild(hover_sixteen);
// surface.appendChild(eye);
// eye.appendChild(eyewhite);
// eyewhite.appendChild(iris);
// iris.appendChild(shine);


// <div id="eye">
//       <div id="eyewhite">
//         <div id="iris">
//           <div id="shine"></div>
//         </div>
//       </div>
//     </div>

backdrop.appendChild(modal);
// backdrop.appendChild(surface);
// backdrop.appendChild(welcome);
modal.appendChild(close);
modal.appendChild(title);
modal.appendChild(content);
// document.body.appendChild(modal);
document.body.appendChild(backdrop);



// document.body.appendChild(modal);

// document.getElementById("close").addEventListener("click", function(){
//       $('#backdrop').fadeOut('slow',function(){$(this).remove();});
//             $('#modal').fadeOut('slow',function(){$(this).remove();});
// });


$(function() {

// alert( document.getElementById("backdrop"));
      $("#close").on("click", function(){
            $('#backdrop').fadeOut('slow',function(){$(this).remove();});
            $('#modal').fadeOut('slow',function(){$(this).remove();});
      });
      $("#backdrop").on("click", function(){
             $('#backdrop').fadeOut('slow',function(){$(this).remove();});
            $('#modal').fadeOut('slow',function(){$(this).remove();});

      });



});


