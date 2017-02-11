// var app = chrome.runtime.getBackgroundPage();

function hello() {
   // chrome.tabs.executeScript({file: "src/thirdParty/webgazer.js"}, function(){
   //          chrome.tabs.executeScript({file: 'insert.js'});
   //      });
// uncomment later

  chrome.tabs.executeScript({
    file: 'insert.js'
  }); 
}


window.onload=function(){
	document.getElementById('clickme').addEventListener('click', hello);



}
function myFunction() {
	    // document.getElementById("myDropdown").classList.toggle("show");
	var myDropdown = document.getElementById("myDropdown");
	myDropdown.classList.toggle("show");
	}


$(function() {
    $( "#slider-1" ).slider();

	$('#flat-slider').slider({
	  orientation: 'horizontal',
	  range:       false,
	  values:      [50]
	});
});

// var clickme = document.getElementById('clickme');
// console.log(clickme);
// if(clickme){
//   clickme.addEventListener('click', hello);
// }
