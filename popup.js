// small letter for start then Pascal for functions ex. startEvent
// css class and ids are snake-case

// var app = chrome.runtime.getBackgroundPage();
var running;
var first=1;

getObjectdata( function(data){
	console.log(data);
});


// saving data to chrome local storage
function setObjectdata(obj){
	chrome.storage.local.set(obj, function () {
        console.log('Saved', obj);
    });
}
// retrieving data from chrome local storage

function getObjectdata(callback) {
	chrome.storage.local.get(null, callback);
}

function loadDeafultValues(){	
	var obj= {
		'scroll_speed' : 300,
		'opacity' : 50
	};
	setObjectdata(obj);
}

//load slider values for opacity adn scroll value
function loadSliders(){
	getObjectdata( function(data){
		console.log(data)
		var scroll_speed_slider = data['scroll_speed_slider'];
		var opacity_slider = data['opacity'];

		$(function() {
			$('#flat-slider2').slider('value',scroll_speed_slider);
			$('#flat-slider1').slider('value',opacity_slider);
		});
		// add opcaity

	});
}
function loadButtonVal(){
	
	getObjectdata( function(data){
		var start_val=data["start_button"];
		console.log(start_val);
		document.getElementById('start_button').text = start_val;

	});
		
	
}
window.onload=function(){
	getObjectdata( function(data){
		console.log(data);
		var start=data["start_button"];

		if (!data["start_button"]){

			var obj= {
				'start_button' :'START'
			};
			setObjectdata(obj);
		}
	});	

	loadSliders();
	loadButtonVal();


	document.getElementById('start_button').addEventListener('click', startEvent);	
}


window.onbeforeunload = function (e) {
    window.localStorage.clear(); //Comment out if you want to save data across different sessions 

	chrome.storage.local.clear(function() {
	    var error = chrome.runtime.lastError;
	    if (error) {
	        console.error(error);
	    }
	});
}
window.addEventListener('beforeunload', function(e) {
    window.localStorage.clear(); //Comment out if you want to save data across different sessions 

	chrome.storage.local.clear(function() {
	    var error = chrome.runtime.lastError;
	    if (error) {
	        console.error(error);
	    }
	});
}, false);

function startWebgazer(){

    chrome.tabs.executeScript({file: 'src/thirdParty/webgazer.js'}, function(){
            chrome.tabs.executeScript({file: 'webgazerjs.js'}, function(){});
    });  
}

function startEvent() {

   
	loadDeafultValues();
	getObjectdata( function(data){		

		var start_val=data["start_button"];
		console.log(start_val);

		//
		if(start_val =='START'){
			document.getElementById('flat-slider1').addEventListener('mouseup', changeOpacity);
			document.getElementById('flat-slider2').addEventListener('mouseup', changeSpeed);
		
			//enable sliders
			$('.flat-slider').slider({
				disabled: false
			});			

			chrome.tabs.executeScript(null, {
				allFrames: true, 
			file: 'insert.js'

			}, function (result) {
	            chrome.tabs.executeScript(null, {file: 'getposition.js'}, function (result) {								
				}); 
			});
			//tarting webgazer - dito siya inilagay para masave muna yung position sa taas
			startWebgazer();
			
			var obj= {
				'start_button' : 'STOP'
			};
			setObjectdata(obj);
			document.getElementById('start_button').text ='STOP';
		}

		else if(start_val =='STOP'){
			chrome.tabs.executeScript(null,  {
				file: 'removeArrows.js'
				// code: ' var myElements = document.querySelectorAll(\'.arrows\');Array.prototype.forEach.call( myElements, function( node ) {node.parentNode.removeChild( node );});'
				// code: ' var myElements = document.querySelectorAll(\'.arrows\');console.log(myElements);'
			});
			$('.flat-slider').slider({
				disabled: true
			});
			var obj= {
				'start_button' : 'START'
			};
			setObjectdata(obj);
			document.getElementById('start_button').text ='START';

		}

	});
	



	// loadDeafultValues();
	
	// $('.flat-slider').slider({
	// 	disabled: false
	// });
	// chrome.tabs.executeScript(null, {
	// file: 'insert.js'

	// }, function (result) {
	// 	console.log(result);
	// }); 
}

function changeSpeed(){
	var value = $( '#flat-slider2' ).slider( 'values', 0 );
	var scroll_speed;
	var scroll_speed_slider_val;
	getObjectdata( function(data){
		 	scroll_speed_slider_val = data['scroll_speed_slider'];


		getObjectdata( function(data2){

		 	scroll_speed = data2['scroll_speed'];
			console.log('scroll_speed' +scroll_speed);

			if ( value > scroll_speed_slider_val ) new_scroll_speed = scroll_speed + value*5;
			else new_scroll_speed = scroll_speed  - (value)*5;
			// var 
			console.log('new scroll_speed');
			console.log(new_scroll_speed);
			
			chrome.tabs.executeScript(null, {
				code: 'scroll_speed = ' + new_scroll_speed +';'
			});
			var obj= {
				'scroll_speed' : new_scroll_speed 
			};
			setObjectdata(obj);
			getObjectdata('scroll_speed', function(res){
				console.log(res);	
			});

			$('#flat-slider2').slider('value', value).change();
		});
	});
	var obj= {
		'scroll_speed_slider' : value
	};
	setObjectdata(obj);
	
}
function changeOpacity(){
	var value = $( '#flat-slider1' ).slider( 'values', 0 );
	chrome.tabs.executeScript(null, {
		code: ' var myElements = document.querySelectorAll(\'.arrows\');for (var i = 0; i < myElements.length; i++) {  myElements[i].style.opacity = '+value/100+';} '
	});
	// $('#flat-slider1').slider('value', value).change();
	var obj= {
		'opacity' : value
	};
	setObjectdata(obj);

}

// message passing
// chrome.tabs.getSelected(null, function(tab) {
//   // Send a request to the content script.
//   chrome.tabs.sendMessage(tab.id, {action: 'getDOM'}, function(response) {
//     console.log(response.dom);
//   });
// });




function myFunction() {
	    // document.getElementById('myDropdown').classList.toggle('show');
	var myDropdown = document.getElementById('myDropdown');
	myDropdown.classList.toggle('show');
}


$(function() {
	var last = 0;

	$('#flat-slider1').slider({
		slide: function( event, ui ) {
                $( '#slider-value-opacity' ).html( ui.value );
            }
	});
	$('#flat-slider2').slider({
		slide: function( event, ui ) {
                $( '#slider-value-scroll' ).html( ui.value );
            }
	});
	$('.flat-slider').slider({
	  orientation: 'horizontal',
	  range:       false,
      disabled: true
	  // values:      [50]
 
	});

	// slide: function(event, ui) {
 //        if (ui.value > last) $('#amount').val('this is increasing');
 //        if (ui.value < last) $('#amount').val('this is decreasing');
 //        last = ui.value;
 //    }

});

document.addEventListener('yourCustomEvent', function (e)
{
  var data=e.detail;
  console.log('received '+data);
});