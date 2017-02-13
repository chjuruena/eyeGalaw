// var app = chrome.runtime.getBackgroundPage();
var running;
var scroll_speed=300;

var obj= {};

obj[scroll_speed] = 300;
 // chrome.storage.sync.set({'value': theValue}

chrome.storage.sync.set(obj, function () {
        console.log('Saved', obj);
    });

chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    console.log(allKeys);
});

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
function changeOpacity(){
	var value = $( "#flat-slider" ).slider( "values", 0 );
	chrome.tabs.executeScript(null, {
		code: ' var myElements = document.querySelectorAll(\".arrows\");for (var i = 0; i < myElements.length; i++) {  myElements[i].style.opacity = '+value/100+';} '
	
	});
}

// message passing
// chrome.tabs.getSelected(null, function(tab) {
//   // Send a request to the content script.
//   chrome.tabs.sendMessage(tab.id, {action: "getDOM"}, function(response) {
//     console.log(response.dom);
//   });
// });



window.onload=function(){
	document.getElementById('clickme').addEventListener('click', hello);
	
document.getElementById('flat-slider1').addEventListener('mouseup', changeOpacity);
	document.getElementById('flat-slider2').addEventListener('mouseup', changeSpeed);
		
}
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
	  values:      [50],
      disabled: true
 
	});

});

document.addEventListener('yourCustomEvent', function (e)
{
  var data=e.detail;
  console.log("received "+data);
});