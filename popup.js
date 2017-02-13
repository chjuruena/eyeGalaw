// var app = chrome.runtime.getBackgroundPage();
var running;

function hello() {
   // chrome.tabs.executeScript({file: "src/thirdParty/webgazer.js"}, function(){
   //          chrome.tabs.executeScript({file: 'insert.js'});
   //      });
// uncomment later


	running = true;
	chrome.tabs.executeScript(null, {
	file: 'insert.js'

	}, function (result) {
		console.log(result);
	}); 
}
function changeOpacity(){
	var value = $( "#flat-slider" ).slider( "values", 0 );

}

// message passing
chrome.tabs.getSelected(null, function(tab) {
  // Send a request to the content script.
  chrome.tabs.sendMessage(tab.id, {action: "getDOM"}, function(response) {
    console.log(response.dom);
  });
});



window.onload=function(){
	document.getElementById('clickme').addEventListener('click', hello);
	document.getElementById('flat-slider').addEventListener('mouseup', function(){
		var value = $( "#flat-slider" ).slider( "values", 0 );
		alert(value);
		chrome.tabs.executeScript(null, {
			code: ' var myElements = document.querySelectorAll(\".arrows\");for (var i = 0; i < myElements.length; i++) {  myElements[i].style.opacity = '+value/100+';} '
			// code: 'var myElements = document.querySelectorAll(\".arrows\");console.log(myElements)'
		
		});
	
	});
}
function myFunction() {
	    // document.getElementById("myDropdown").classList.toggle("show");
	var myDropdown = document.getElementById("myDropdown");
	myDropdown.classList.toggle("show");
	}


$(function() {

	$('#flat-slider').slider({
	  orientation: 'horizontal',
	  range:       false,
	  values:      [50]
	});
});

document.addEventListener('yourCustomEvent', function (e)
{
  var data=e.detail;
  console.log("received "+data);
});