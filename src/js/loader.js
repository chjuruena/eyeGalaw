/**
 * this document inserts the loading screen and/or calibrating page dynamically
 */

getObjectdata( function(data){
	var string;

	if (data["starting-page"] == true) string = "<div class=\"loader\">\n<img src=\"chrome-extension://ilgdhcbhjnidiblajhalcalmcacdbgef/src/img/dots.png\" id=\"dots-line\" >\n\n  \n\n\t<div id=\"marks\"></div>\n\t\n</div>";
	else 		string = "<div class=\"loader\">\t</div>";

	// return array of DOM Nodes
	// convert html string to jQuery object
	var jqueryObject = $($.parseHTML(string));
	// adds to the DOM body 
	$('body').append(jqueryObject);

});



var count = 0;
$(document).ready(function() {
	var obj= {
             "click-count" : 0
             
          };
          setObjectdata(obj); 

    // click function of the calibration page
    // every click creates a red dot 
	$(document).click(function(e) {


		count++;
		mark = $("<span>").css({
				'position':'absolute',
				'border':'solid 2px #cc00cc',
				'border-radius':'20px',
				'width':'17px',
				'height':'17px',
				top: e.pageY-10,
				left: e.pageX-10
		});
		
		$(mark).attr('id', "mark" + count);
		$(mark).addClass('mark');
		$(mark).css('display', 'none');
		$("div#marks").append(mark);
		$(mark).hover(mark_focus, mark_unfocus);
		$(mark).show('slow');

		var obj= {
             "click-count" : count
             
          };
          setObjectdata(obj); 			
		
	});
	
});

function coord_focus(e) {
	$(this).addClass('focused-coord');
	var id = $(this).attr('id');
	$("div#marks .mark#mark" + id.charAt( id.length-1 )).addClass('focused-mark');
}

function coord_unfocus(e) {
	$(this).removeClass('focused-coord');
	var id = $(this).attr('id');
	$("div#marks .mark#mark" + id.charAt( id.length-1 )).removeClass('focused-mark');
}
	
function mark_focus(e) {
	$(this).addClass('focused-mark');
	var id = $(this).attr('id');
	$("ol#coords .coord#coord" + id.charAt( id.length-1 )).addClass('focused-coord');
}
function mark_unfocus(e) {
	$(this).removeClass('focused-mark');
	var id = $(this).attr('id');
	$("ol#coords .coord#coord" + id.charAt( id.length-1 )).removeClass('focused-coord');
}


function getObjectdata(callback) {
    chrome.storage.local.get(null, callback);
}
function setObjectdata(obj){
    chrome.storage.local.set(obj, function () {
    });
}
