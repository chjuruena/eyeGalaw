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
var hide_div = document.createElement( 'div' );
var hold_div = document.createElement( 'div' );
var hide = document.createElement( 'div' );
var hold = document.createElement( 'div' );
var prev_page = document.createElement( 'div' );


var gaze_down = document.createElement( 'div' )
var gaze_up = document.createElement( 'div' )
gaze_down.setAttribute('id', 'gaze_down');
gaze_up.setAttribute('id', 'gaze_up');
gaze_down.setAttribute('class', 'gaze_pads');
gaze_up.setAttribute('class', 'gaze_pads');

prev_page.setAttribute('id', 'prev_page');
prev_page.setAttribute('class', 'line_arrows');
// arrow_up.setAttribute('id', 'arrow_up');
line_arrow_up.setAttribute('id', 'line_arrow_up');
// arrow_down.setAttribute('id', 'arrow_down');
line_arrow_down.setAttribute('id', 'line_arrow_down');
hide.setAttribute('id', 'hide');
hold.setAttribute('id','hold');

line_arrow_up.setAttribute('class', 'line_arrows');
line_arrow_down.setAttribute('class', 'line_arrows');
// arrow_down.setAttribute('class', 'arrows');
// arrow_down.setAttribute('class', 'arrows');
// arrow_left.setAttribute('class', 'arrows');
// arrow_right.setAttribute('class', 'arrows');

document.body.appendChild( gaze_down);
document.body.appendChild( gaze_up);

// document.body.appendChild( arrow_up);
document.body.appendChild( line_arrow_up);
// document.body.appendChild( arrow_down);
document.body.appendChild( line_arrow_down);
// document.body.appendChild(arrow_left );
// document.body.appendChild(arrow_right );
document.body.appendChild(prev_page );


var screenwidth = screen.width;
document.getElementById('gaze_down').style.width = screenwidth+"px";
document.getElementById('gaze_up').style.width = screenwidth+"px";
// alert(document.getElementById('gaze_down').style.width);




// // alert(screenwidth);

// $('.gaze_pads').css('width', screenwidth);
// getObjectdata( function(items){
//     scroll_speed = items.scroll_speed;
//     console.log(items.scroll_speed)


// });


// chrome.storage.local.get(null, function(items) {
//     var allKeys = Object.keys(items);
//     console.log(items);
//     console.log(allKeys);
// });

// chrome.storage.local.get(null, function (items) {
//     scroll_speed = items.scroll_speed;
//     console.log(items.scroll_speed)

// });
getPosition();

function getPosition(){
    var obj={};
     // var arr=["gaze_up", "gaze_down", "arrow_down","arrow_up","arrow_left","arrow_right", "prev_page"];
     var arr=["gaze_up", "gaze_down",  "prev_page"];
    // var arr =["arrow_down","arrow_up","arrow_left","arrow_right", "prev_page"];
    arr.forEach(function(element) {
        console.log(document.getElementById(element));
        // var position = document.getElementById(element).offsetParent.offsetTop;
        // // $(element).position();
        // var offset = $(element).offset();   


        var x = document.getElementById(element).offsetLeft;
        var y = document.getElementById(element).offsetTop;
        console.log("x "+ x + ", y"+y);



        var objelement = {
            'x': x,
            'y': y
        };
    
        obj[element] = objelement;
        
    });

    chrome.storage.local.set(obj, function () {
        console.log('position', obj);
    });
}


// $(function() {
//      $(document.body ).on("click" , function(event){
//         var x = event.clientX;
//         var y = event.clientY;
//          console.log("clickX:" + x+ " clickY:" +y);

//          var currclick = {
//                 'x': x, 
//                 'y': y
//             };
//          chrome.storage.local.set(currclick, function () {
//             console.log('currclick', currclick);
//         });

//     });

//     $("#prev_page").on("click" ,function(event){
//         window.history.back();

//     });
    
//     $("#arrow_down").on("click" ,function(event){
//         scrolled=scrolled+scroll_speed;

// 		$("html, body").animate({
// 		        scrollTop:  scrolled
// 		   });

//         // var x = event.clientX;
//         // var y = event.clientY;
//         //  console.log("clickX:" + x+ " clickY:" +y);

//         //  var currclick = {
//         //         'x': x, 
//         //         'y': y
//         //     };
//         //  chrome.storage.local.set(currclick, function () {
//         //     console.log('currclick', currclick);
//         // });

// 				// console.log( "pageX: " + event.pageX + ", pageY: " + event.pageY );
// 	 //  	var p = $( "#arrow_down" );
// 		// var position = p.position();
// 		// var offset = p.offset();
// 		// console.log( "left: " + offset.left + ", top: " + position.top );

				


// 	});
//     $("#arrow_left").on("click" ,function(event){     

//         var x = event.clientX;
//         var y = event.clientY;
//         console.log("clickX:" + x+ " clickY:" +y);    
//     });

    
//     $("#arrow_up").on("click" ,function(){
//         alert(scroll_speed);
// 				scrolled=scrolled-scroll_speed;
				
// 		$("html, body").animate({
// 		        scrollTop:  scrolled
// 		   });
// 	});   
    
// });


