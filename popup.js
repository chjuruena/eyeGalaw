// var app = chrome.runtime.getBackgroundPage();
var running;


// obj["`"] = 300;
 // chrome.storage.sync.set({'value': theValue}

function setObjectdata(obj){
	chrome.storage.local.set(obj, function () {
        console.log('Saved', obj);
    });
}

// function getObjectdata(key){
// 	var data;
// 	chrome.storage.local.get(null, function (items) {
//     	data = items[key];

//     	// return(items[key])

//     });
//     	console.log(data);
//     	return data;

// }
function getObjectdata(callback) {
	// var data;

	chrome.storage.local.get(null, callback);

    	// return(items[key])
    		// (data);
    	// if(callback)  callback;

    // });
}

function loadDeafultValues(){
	// var scroll_speed=300;

	var obj= {
		"scroll_speed" : 300
	};
	setObjectdata(obj);
	// chrome.storage.local.set(obj, function () {
	//         console.log('Saved', obj);
	//     });

	chrome.storage.local.get(null, function(items) {
	    var allKeys = Object.keys(items);
	    console.log("allKeys" + allKeys);
	    // chrome.storage.local.clear();
	});

}

window.onload=function(){
	loadDeafultValues();
	document.getElementById('clickme').addEventListener('click', hello);
	
	document.getElementById('flat-slider1').addEventListener('mouseup', changeOpacity);
	document.getElementById('flat-slider2').addEventListener('mouseup', changeSpeed);
		
}
function hello() {
   // chrome.tabs.executeScript({file: "src/thirdParty/webgazer.js"}, function(){
   //          chrome.tabs.executeScript({file: 'insert.js'});
   //      });
// uncomment later


	running = true;
	$('.flat-slider').slider({
		disabled: false
	});
	chrome.tabs.executeScript(null, {
	file: 'insert.js'

	}, function (result) {
		console.log(result);
	}); 
}
function changeSpeed(){
	var value = $( "#flat-slider2" ).slider( "values", 0 );
	
    	// scroll_speed = items.scroll_speed;
	
	
	// var obj= {
	// 	"scroll_speed" : 300
	// };

	var scroll_speed;
	



	getObjectdata( function(data){
	 	scroll_speed = data["scroll_speed"];
		console.log(scroll_speed);

		console.log("scroll_speed" +scroll_speed);

		var new_scroll_speed = scroll_speed + value*5;
		console.log("new scroll_speed");
		console.log(new_scroll_speed);
		
		chrome.tabs.executeScript(null, {
			code: 'scroll_speed = ' + new_scroll_speed +';'
		});
		var obj= {
			"scroll_speed" : new_scroll_speed 
		};
		setObjectdata(obj);
		getObjectdata("scroll_speed", function(res){
			console.log(res);	
		});

		$("#flat-slider2").slider('value', value).change();
	});

	
}
function changeOpacity(){
	var value = $( "#flat-slider1" ).slider( "values", 0 );
	chrome.tabs.executeScript(null, {
		code: ' var myElements = document.querySelectorAll(\".arrows\");for (var i = 0; i < myElements.length; i++) {  myElements[i].style.opacity = '+value/100+';} '
	});
	$("#flat-slider1").slider('value', value).change();

}

// message passing
// chrome.tabs.getSelected(null, function(tab) {
//   // Send a request to the content script.
//   chrome.tabs.sendMessage(tab.id, {action: "getDOM"}, function(response) {
//     console.log(response.dom);
//   });
// });




function myFunction() {
	    // document.getElementById("myDropdown").classList.toggle("show");
	var myDropdown = document.getElementById("myDropdown");
	myDropdown.classList.toggle("show");
}


$(function() {

	$('#flat-slider1').slider({
		slide: function( event, ui ) {
                $( "#slider-value-opacity" ).html( ui.value );
            }
	});
	$('#flat-slider2').slider({
		slide: function( event, ui ) {
                $( "#slider-value-scroll" ).html( ui.value );
            }
	});
	$('.flat-slider').slider({
	  orientation: 'horizontal',
	  range:       false,
	  values:      [50]
      // disabled: true
 
	});

});

document.addEventListener('yourCustomEvent', function (e)
{
  var data=e.detail;
  console.log("received "+data);
});