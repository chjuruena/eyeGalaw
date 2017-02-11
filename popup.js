// var app = chrome.runtime.getBackgroundPage();

function hello() {
   chrome.tabs.executeScript({file: "thirdParty/webgazer.js"}, function(){
            chrome.tabs.executeScript({file: 'insert.js'});
        });

  // chrome.tabs.executeScript({
    // file: 'insert.js'
  // }); 
}

// document.addEventListener('DOMContentLoaded', function () { // working
//     // el.addEventListener('click', swapper, false);
// 		document.getElementById('clickme').addEventListener('click', hello);
// });

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
