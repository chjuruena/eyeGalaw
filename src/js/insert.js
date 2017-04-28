function getObjectdata(callback) {
    chrome.storage.local.get(null, callback);
}

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        sendResponse(document.all[0].outerHTML);
    }
});


document.documentElement.style.height = '100%';
document.documentElement.style.width = '100%';


// create arrows
var arrow_up = document.createElement( 'div' );
var line_arrow_up = document.createElement( 'div' );
var arrow_down = document.createElement( 'div' );
var line_arrow_down = document.createElement( 'div' );
// var prev_page = document.createElement( 'div' );

var hide_div = document.createElement( 'div' );
var hold_div = document.createElement( 'div' );
var hide = document.createElement( 'a' );
var hold = document.createElement( 'a' );
hide.innerHTML="HIDE";
hold.innerHTML="HOLD";
hide_div.appendChild(hide);
hold_div.appendChild(hold);
hide_div.setAttribute('id', 'hide_div');
hold_div.setAttribute('id', 'hold_div');
hide.setAttribute('id', 'hide');
hold.setAttribute('id','hold');
hide.setAttribute('class', 'hidehold_txt ');
hold.setAttribute('class', 'hidehold_txt ');
hide_div.setAttribute('class', 'hidehold_div controls');
hold_div.setAttribute('class', 'hidehold_div controls');


var scrll_top = document.createElement( 'a' );
scrll_top.href="#";
var scrll_bottom = document.createElement( 'a' );
scrll_top.innerHTML="scroll to <br> top";
scrll_bottom.innerHTML="scroll to <br> bottom";

scrll_top.setAttribute('id', 'scrll_top');
scrll_bottom.setAttribute('id', 'scrll_bottom');

scrll_top.setAttribute('class', 'scrll_TB controls');
scrll_bottom.setAttribute('class', 'scrll_TB controls');




var gaze_down = document.createElement( 'div' )
var gaze_up = document.createElement( 'div' )
gaze_down.setAttribute('id', 'gaze_down');
gaze_up.setAttribute('id', 'gaze_up');
gaze_down.setAttribute('class', 'gaze_pads controls ');
gaze_up.setAttribute('class', 'gaze_pads controls');



var triangle = document.createElement( 'div' )
triangle.setAttribute('class', 'triangle controls');
triangle.setAttribute('id', 'triangle_down');
var triangle_up = document.createElement( 'div' )
triangle_up.setAttribute('class', 'triangle controls');
triangle_up.setAttribute('id', 'triangle_up');
var triangleleft = document.createElement( 'div' )
triangleleft.setAttribute('class', 'triangle controls');
triangleleft.setAttribute('id', 'prev_page');
var trianglerght = document.createElement( 'div' )
trianglerght.setAttribute('class', 'triangle controls');
trianglerght.setAttribute('id', 'frwd_page');


document.body.appendChild( triangle_up);
document.body.appendChild( triangle);
document.body.appendChild( triangleleft);
document.body.appendChild( trianglerght);
document.body.appendChild( gaze_down);
document.body.appendChild( gaze_up);

// document.body.appendChild( arrow_up);
// document.body.appendChild( line_arrow_up);
// document.body.appendChild( arrow_down);
// document.body.appendChild( line_arrow_down);
document.body.appendChild(hide_div );
document.body.appendChild(hold_div);
// document.body.appendChild(prev_page );

// document.body.appendChild(scrll_top );
// document.body.appendChild(scrll_bottom );


var screenwidth = screen.width;
var screenheight = screen.width;
document.getElementById('gaze_down').style.width = (screenwidth-220)+"px";
document.getElementById('gaze_up').style.width = (screenwidth-220)+"px";



getPosition();

function getPosition(){
    var obj={};
     // var arr=["gaze_up", "gaze_down", "arrow_down","arrow_up","arrow_left","arrow_right", "prev_page"];
    // var arr =["arrow_down","arrow_up","arrow_left","arrow_right", "prev_page"];
     // var arr=["gaze_up", "gaze_down", "prev_page", "frwd_page","hide_div" ,"hold_div", "scrll_top", "scrll_bottom"];
     var arr=["gaze_up", "gaze_down", "prev_page", "frwd_page","hide_div" ,"hold_div"];
    arr.forEach(function(element) {
        console.log(document.getElementById(element));
        // var position = document.getElementById(element).offsetParent.offsetTop;
        // // $(element).position();
        // var offset = $(element).offset();  
        if(document.getElementById(element)) {
            var x = document.getElementById(element).offsetLeft;
            var y = document.getElementById(element).offsetTop;
            console.log("x "+ x + ", y"+y);



            var objelement = {
                'x': x,
                'y': y
            };
        
            obj[element] = objelement;
        }        
        
    });

    chrome.storage.local.set(obj, function () {
        console.log('position', obj);
    });
}

