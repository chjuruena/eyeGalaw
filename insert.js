// DO THIS: 
// 1. load UI
// 2. load webgazer


// already working webgazer
// webgazer.setGazeListener(function(data, elapsedTime) {
//     if (data == null) {
//         return;
//     }
//     var prediction = webgazer.getCurrentPrediction();
// 	if (prediction) {
// 	    var x = prediction.x;
// 	    var y = prediction.y;
// 	}
//     // var xprediction = data.x; //these x coordinates are relative to the viewport 
//     // var yprediction = data.y; //these y coordinates are relative to the viewport
//     console.log(elapsedTime); //elapsed time is based on time since begin was called
// }).begin();



// alert('hello ' + document.location.href);
// document.body.style.backgroundColor='red';

// $(function(){
//     //$('.add_button').click(add_timeline_element);
// 	// alert('hello ' + document.location.href);
//     // add_timeline_element();
//     //  function add_main_frame(){
//     //  	// var $div = $('<div>', {id: 'main_frame', 'class': 'main_frame'});
//     //  	var div = $('<div />', {
//     //         class: 'main_frame'
//     //     });
//     //     // $('body').append($div);

//     //     var text_input = $('<input />', {
//     //         type: 'text',
//     //         class: 't_text_area'
//     //     });
//     //     var button = $('<button />', {
//     //         text: '-',
//     //         class: 't_intect_button',
//     //         click: function() {$(this).parent().remove();}
//     //     });
//     //     $('.main_frame').append(text_input);
//     //     $('.main_frame').append(button);
//     //     $('body').append(div);

//     // }
//     // add_main_frame();
//     function add_arrows(){
//     	var up_arrow;
//     }
//      function add_timeline_element(){
//         var text_input = $('<input />', {
//             type: 'text',
//             class: 't_text_area'
//         });
//         var button = $('<button />', {
//             text: '-',
//             class: 't_intect_button',
//             click: function() {$(this).parent().remove();}
//         });
//         var timeline_element = $('<td />', {
//             class: 'timeline_element'
//         });
//         timeline_element.append(button);
//         timeline_element.append(text_input);
//         $('.t_inject_row').append(timeline_element);
//     }
    
//     function minimize_t_inject_container(){
//         $('.add_button').toggle();
//     }
    
//     function create_twitter_bar(){
//     	var div = $('<div />', {
//             class: 'main_frame'
//         });

//         var table_container = $('<table />', {
//             class: 't_inject_container'
//         });
//             var row = $('<tr />', {
//                         class: 't_inject_row'
//                         });
//                 var menu = $('<td />', {
//                     class: 'menu'
//                 });
//                     var add_element_button = $('<button />', {
//                         text: '+',
//                         class: 'add_button t_intect_button',
//                         click: function() {add_timeline_element();}
//                     });
//                     var minimize_button = $('<button />', {
//                         text: 'm',
//                         click: function() {minimize_t_inject_container();},
//                         class: 'minimize_button t_intect_button'
//                     });
//                     menu.append(add_element_button);
//                     menu.append(minimize_button);
//             row.append(menu);
//         table_container.append(row);
//         div.append(table_container);
//         $('body').append(div);
//     }
//     create_twitter_bar();
    
    
    
    
    
//     // var scroll_point = 0;
//     // var done_scrolling;
//     // var counting = 'false';
//     // var time_counter = 0.00;
//     // var consecutive_scrolls = 0.00;
    
//     // var scroll_ending = function () {
//     //     console.log('done scrolling');
//     //     clearInterval(counting);
//     //     counting = 'false';
//     //     time_counter = 0.00;
//     // }
//     // $(document).scroll(function() {
//     //     var new_scroll_point = $(document).scrollTop();
//     //     var scroll_delta = scroll_point - new_scroll_point;
//     //     if(scroll_delta < 0){
//     //         scroll_delta = scroll_delta * (-1);
//     //     }
//     //     scroll_point = new_scroll_point;
//     //     if(counting=='false'){
//     //         counting = setInterval(function(){
//     //             time_counter += 0.1;
//     //         }, 100);
//     //     } else{
//     //         var scroll_over_time = scroll_delta/time_counter;
//     //         console.log('scrolling over time:'+ scroll_over_time);
//     //         clearTimeout(done_scrolling);
//     //         done_scrolling = setTimeout(scroll_ending, 150);
//     //         if(scroll_over_time > 400 && scroll_over_time < 3000){
//     //             $('.add_button').hide();
//     //         }
//     //     }        
//     // });
// });



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

chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    console.log(allKeys);
});

chrome.storage.sync.get(null, function (items) {
    // assignTextToTextareas(items.scroll_speed);
    var allKeys = Object.keys(items);    
    scroll_speed = allKeys[0];
    // storage.remove('scroll_speed');
    console.log(items[0])
    console.log(allKeys[0])
    // chrome.storage.sync.clear();

});

$(document).ready(function(){
	alert('scroll_speed'+scroll_speed);

    	
    $("#arrow_down").on("click" ,function(){
                scrolled=scrolled+scroll_speed;
        
				$("html, body").animate({
				        scrollTop:  scrolled
				   });

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


