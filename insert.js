

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
// document.body.style.height = '100%';
document.documentElement.style.width = '100%';
// document.body.style.width = '100%';


// var main_frame = document.createElement( 'div' );
// main_frame.setAttribute('class', 'main_frame');


// var div = document.createElement( 'div' );
// var btnForm = document.createElement( 'form' );
// var btn = document.createElement( 'input' );

//append all elements
// document.body.appendChild( main_frame);
// main_frame.appendChild(div);
// div.appendChild( btnForm );
// btnForm.appendChild( btn );
//set attributes for div
// div.id = 'myDivId';
// div.setAttribute('id', 'myDivId');

//set attributes for btnForm
// btnForm.action = '';

//set attributes for btn
//'btn.removeAttribute( 'style' );






// create arrows
var arrow_up = document.createElement( 'div' );
var arrow_down = document.createElement( 'div' )
var arrow_right = document.createElement( 'div' )
var arrow_left = document.createElement( 'div' )
arrow_up.setAttribute('id', 'arrow_up');
arrow_down.setAttribute('id', 'arrow_down');
arrow_left.setAttribute('id', 'arrow_left');
arrow_right.setAttribute('id','arrow_right');
arrow_up.setAttribute('class', 'arrows');
arrow_down.setAttribute('class', 'arrows');
arrow_left.setAttribute('class', 'arrows');
arrow_right.setAttribute('class', 'arrows');
// append arrows
// main_frame.appendChild(arrow_up);
// main_frame.appendChild(arrow_down);
// main_frame.appendChild(arrow_left);
// main_frame.appendChild(arrow_right);

document.body.appendChild( arrow_up);
document.body.appendChild( arrow_down);
document.body.appendChild(arrow_left );
document.body.appendChild(arrow_right );





var scrolled=0;
var scroll_speed;

// var storage = chrome.storage.local;

chrome.storage.local.get(null, function(items) {
    var allKeys = Object.keys(items);
    console.log(items);
    console.log(allKeys);
});

chrome.storage.local.get(null, function (items) {
    // assignTextToTextareas(items.scroll_speed);
    // var allKeys = Object.keys(items);    
    scroll_speed = items.scroll_speed;
    // storage.remove('scroll_speed');
    // console.log(items[0])
    console.log(items.scroll_speed)
    // chrome.storage.sync.clear();

});

$(document).ready(function(){
	// alert('scroll_speed'+scroll_speed);

    	
    $("#arrow_down").on("click" ,function(event){
        scrolled=scrolled+scroll_speed;

		// $("html, body").animate({
		//         scrollTop:  scrolled
		//    });

        var x = event.clientX;
    var y = event.clientY;
     console.log("clickX:" + x+ " clickY:" +y);

     var currclick = {
            'x': x, 
            'y': y
        };
     chrome.storage.local.set(currclick, function () {
        console.log('currclick', currclick);
    });

				// console.log( "pageX: " + event.pageX + ", pageY: " + event.pageY );
	 //  	var p = $( "#arrow_down" );
		// var position = p.position();
		// var offset = p.offset();
		// console.log( "left: " + offset.left + ", top: " + position.top );

				


	});
    $("#arrow_left").on("click" ,function(event){

      

        var x = event.clientX;
    var y = event.clientY;
     console.log("clickX:" + x+ " clickY:" +y);

                // console.log( "pageX: " + event.pageX + ", pageY: " + event.pageY );
     //     var p = $( "#arrow_down" );
        // var position = p.position();
        // var offset = p.offset();
        // console.log( "left: " + offset.left + ", top: " + position.top );

                


    });

    
    $("#arrow_up").on("click" ,function(){
				scrolled=scrolled-scroll_speed;
				
				$("html, body").animate({
				        scrollTop:  scrolled
				   });

			});


// $(".clearValue").on("click" ,function(){
// 				scrolled=0;
// 		});


});


