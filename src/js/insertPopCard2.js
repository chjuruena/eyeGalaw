/**
 * this document inserts the startup wlecome page dynamically
 */

var screenwidth = screen.width;

var page3 = "<h1 class=\"texts-h3\"  >Things to remember:</h1> \n      <div class=\"\" id=\"list-remem\">\n        \n             <ul class=\"ul-list\">\n      <li>Remove any face obstructions</li>\n      <li>Wearing of eyeglasses is acceptable. </li>\n      <li>Turn the lights on.</li>\n      <li>Reangle webcam.</li>\n      <li>If adjusted settings does not apply or show, or an error occurs, always remember to restart the webpage</li>\n    </ul>\n </div>";
var video="<video  controls=\"controls\" id=\"demovid\"  >\n  <source src=\"chrome-extension://ilgdhcbhjnidiblajhalcalmcacdbgef/src/img/movie.mp4\" type=\"video/mp4\">\n   Your browser does not support the video tag.\n</video>";
var string = "<div id=\"popup1\"><div class=\"carousel\">\n   <div class=\"carousel-inner\">\n        <input class=\"carousel-open\" type=\"radio\" id=\"carousel-1\" name=\"carousel\" aria-hidden=\"true\" hidden=\"\" checked=\"checked\">\n        <div class=\"carousel-item\" id=\"item1\" style=\"width:\"+screenwidth+\";\">\n<!--        start of eye    -->\n          <div class=\"surface\">\n  <div id=\"hover_one\"></div>\n  <div id=\"hover_two\"></div>\n  <div id=\"hover_three\"></div>\n  <div id=\"hover_four\"></div>\n  <div id=\"hover_five\"></div>\n  <div id=\"hover_six\"></div>\n  <div id=\"hover_seven\"></div>\n  <div id=\"hover_eight\"></div>\n  <div id=\"hover_nine\"></div>\n  <div id=\"hover_ten\"></div>\n  <div id=\"hover_eleven\"></div>\n  <div id=\"hover_twelve\"></div>\n  <div id=\"hover_thirteen\"></div>\n  <div id=\"hover_fourteen\"></div>\n  <div id=\"hover_fifteen\"></div>\n  <div id=\"hover_sixteen\"></div>\n  \n    <div id=\"eye\">\n      <div id=\"eyewhite\">\n        <div id=\"iris\">\n          <div id=\"shine\"></div>\n        </div>\n      </div>\n    </div>\n</div>\n          <!--        start of eye    -->\n          <!--        start of eye    -->\n          <div class=\"surface\" id=\"second-eye\">\n  <div id=\"hover_one\"></div>\n  <div id=\"hover_two\"></div>\n  <div id=\"hover_three\"></div>\n  <div id=\"hover_four\"></div>\n  <div id=\"hover_five\"></div>\n  <div id=\"hover_six\"></div>\n  <div id=\"hover_seven\"></div>\n  <div id=\"hover_eight\"></div>\n  <div id=\"hover_nine\"></div>\n  <div id=\"hover_ten\"></div>\n  <div id=\"hover_eleven\"></div>\n  <div id=\"hover_twelve\"></div>\n  <div id=\"hover_thirteen\"></div>\n  <div id=\"hover_fourteen\"></div>\n  <div id=\"hover_fifteen\"></div>\n  <div id=\"hover_sixteen\"></div>\n  \n    <div id=\"eye\">\n      <div id=\"eyewhite\">\n        <div id=\"iris\">\n          <div id=\"shine\"></div>\n        </div>\n      </div>\n    </div>\n</div>\n          <!--        start of eye    -->\n          <br><br><br><br><h1 class=\"texts\" id=\"hithere\"> Oh, hi there!<br> I am eyeGalaw.</h1>\n\n        </div>\n        <input class=\"carousel-open\" type=\"radio\" id=\"carousel-2\" name=\"carousel\" aria-hidden=\"true\" hidden=\"\">\n        <div class=\"carousel-item\" id=\"item2\">\n           <h1 class=\"texts-h3\"> Navigate using my help. <br> Demo video here:</h1>\n          "+ video+"        </div>\n        <input class=\"carousel-open\" type=\"radio\" id=\"carousel-3\" name=\"carousel\" aria-hidden=\"true\" hidden=\"\">\n        <div class=\"carousel-item\" id=\"item3\">\n " + page3+        "\n        </div>\n        <label for=\"carousel-3\" class=\"carousel-control prev control-1\">‹</label>\n        <label for=\"carousel-2\" class=\"carousel-control next control-1\">›</label>\n        <label for=\"carousel-1\" class=\"carousel-control prev control-2\">‹</label>\n        <label for=\"carousel-3\" class=\"carousel-control next control-2\">›</label>\n        <label for=\"carousel-2\" class=\"carousel-control prev control-3\">‹</label>\n        <label for=\"carousel-1\" class=\"carousel-control next control-3\">›</label>\n        <ol class=\"carousel-indicators\">\n            <li>\n                <label for=\"carousel-1\" class=\"carousel-bullet\">•</label>\n            </li>\n            <li>\n                <label for=\"carousel-2\" class=\"carousel-bullet\">•</label>\n            </li>\n            <li>\n                <label for=\"carousel-3\" class=\"carousel-bullet\">•</label>\n            </li>\n        </ol>\n    </div>\n</div> <a href=\"#\" class=\"close\"> </div>";
// strings to create DOM nodes

// return array of DOM Nodes
// convert html string to jQuery object
var jqueryObject = $($.parseHTML(string));

$('body').append(jqueryObject);
$("#item1").css("width", screenwidth);
$("#item2").css("width", screenwidth);
$("#item3").css("width", screenwidth);
    
$(".close").on("click", function(){
    $('#popup1').fadeOut('slow',function(){$(this).remove();});
    $('#popup').fadeOut('slow',function(){$(this).remove();});
    var obj= {
             "starting-page" : true 
         };
         setObjectdata(obj); 
});


function getObjectdata(callback) {
    chrome.storage.local.get(null, callback);
}
function setObjectdata(obj){
    chrome.storage.local.set(obj, function () {
    });
}

		             
