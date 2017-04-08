// small letter for start then Pascal for functions ex. startEvent
// css class and ids are snake-case

// var app = chrome.runtime.getBackgroundPage();
var running;
var first=1;
var defaultPixelMovement = 50;
var pageheight = screen.height;

// var sheight=$(document).height(); 


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

function setdefaultSpeed(){
	var sheight=$(window).height(); 
	var sliderVal= (defaultPixelMovement/sheight) * 100;
	var defaultScrollSpeed = sheight * (sliderVal/100);

}

function loadDeafultValues(){
	$('.flat-slider').slider({
		disabled: true
	});	

					
	
	//setdefaultSpeed
	
	
	var sliderVal= Math.round((defaultPixelMovement/pageheight) * 100);
	var startingScrollSpeed = pageheight * (sliderVal/100);   				
	


	var obj= {
		"pageheight" : pageheight,
		"scroll_speed_slider" : sliderVal,
		'wgvideofeed' : false,
		'scroll_speed' : startingScrollSpeed,
		'opacity' : 50
		// 'longpop-up' : true
	};
	setObjectdata(obj);
}

//load slider values for opacity adn scroll value
function loadSliders(){
	getObjectdata( function(data){
		var scroll_speed_slider = data['scroll_speed_slider'];
		
		var opacity_slider = data['opacity'];

		$(function() {
			$( '#slider-value-opacity' ).html( opacity_slider );
			$( '#slider-value-scroll' ).html( scroll_speed_slider );
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


function setBtnto(action){
	var obj= {
		'start_button' : action
	};
	setObjectdata(obj);
	document.getElementById('start_button').text = action;
}
function startEvent() {   

	getObjectdata( function(data){
		disablebtn(data["start_button"]);

		loadStartBtnFxns(data["start_button"], "click");
		var obj= {
			"action" : "click" 

		};
		setObjectdata(obj);	
		console.log(data)
	});	
}

function setSliderValAtStart(){
	

}

function saveClicks(){
	
}
window.onload=function(){
	// if($("#mainr").height;)
	loadSliders();

	getObjectdata( function(data){
		setPopupsize(data["longpop-up"]);
		disablebtn(data["start_button"]);

		// alert(data["wgvideofeed"]);
		if (data["wgvideofeed"]) $('#myonoffswitch').prop('checked', true);
		else $('#myonoffswitch').prop('checked', false);
		console.log(data);



		if (!data["start_button"]){
			console.log("wala pang start_button");
			document.getElementById('start_button').text ='START';


			setBtnto("START");

			// setSliderValAtStart();
			loadDeafultValues();





		}else {
		// setPopupsize(data["longpop-up"]);

			console.log("MERON NAAAAAAAA start_button");
                // disablebtn(start_val);



				loadStartBtnFxns(data["start_button"], "reload");
				var obj= {
					"action" : "reload" 
				};
				setObjectdata(obj);

				loadButtonVal();
				console.log(data);
		// console.log(data["stopped"]);



			//opening otehr pages or new

		}


		

		console.log(data);
		console.log(data["stopped"]);
	});	

	// loadButtonVal();


	document.getElementById('start_button').addEventListener('click', startEvent);	
}

function setPopupsize(data){
	if(data) {
        $('.dropdown').css('display', 'none');
		
	}else{
        $(".dropdown").css('display', 'block');
      // $( "#effect" ).toggle( "blind", null, 500 );

		
	}


    //   if($('#menu').height() != 200)
    //         $("#menu").css('height', '200px');
    
}
function disablebtn(start_val){
	if(start_val!="START"){
		// alert('ya')
					$(".onoffswitch-inner").css('opacity', '0.40');
					$(".onoffswitch-switch").css('opacity', '0.40');
					$(".onoffswitch-checkbox").css('opacity', '0.40');
					$(".onoffswitch-checkbox").css('opacity', '0.40');
					$(".onoffswitch-label").css('cursor', 'not-allowed');

							
				}else{
		// alert('ya')


					$(".onoffswitch-inner").css('opacity', '100');
					$(".onoffswitch-switch").css('opacity', '100');
					$(".onoffswitch-checkbox").css('opacity', '100');
					$(".onoffswitch-label").css('opacity', '100');
					$(".onoffswitch-label").css('cursor', 'pointer');

				}
}
function loadStartBtnFxns(start_val, action){
	// getObjectdata( function(data){		

				// var start_val=data["start_button"];
				console.log(start_val);

				//opposite azng reload at click
				// relaod =value after clicking
				// click=value before clicking



				if((start_val =='START' && action=="click") || (start_val =='STOP' && action=="reload") ){
					if(start_val =='START' && action=="click") console.log("start_val =='START' && action==click");
					else if(start_val =='STOP' && action=="reload") console.log("start_val =='STOP' && action==reload");

					// webgaer video feed
					

					document.getElementById('flat-slider1').addEventListener('mouseup', changeOpacity);
					document.getElementById('flat-slider2').addEventListener('mouseup', newchangeSpeed);
				
					//enable sliders

					$('.flat-slider').slider({
						disabled: false
					});	



					$('.onoffswitch-checkbox').prop('disabled', false);		
					chrome.tabs.executeScript(null, {
							// allFrames: true, 
						file: 'insert.js'

						
						});
					
					//tarting webgazer - dito siya inilagay para masave muna yung position sa taas
					
					startWebgazer();
					if (action=="click"){
						setBtnto("STOP");
					}

				
					
					
					
				}
				else if((start_val =='STOP' && action=="click") || (start_val =='START' && action=="reload")  ){
					if(start_val =='STOP' && action=="click") 
					console.log("start_val =='STOP' && action==click");
				else if (start_val =='START' && action=="reload")  console.log("(start_val =='START' && action==reload");
					

					chrome.tabs.executeScript(null,  {
						file: 'removeArrows.js'
					});
					$('.flat-slider').slider({
						disabled: true
					});
					$('.onoffswitch-checkbox').prop('disabled', true);		

					if (action=="click") setBtnto("START");
					loadButtonVal();

				}

}




function startWebgazer(){

    chrome.tabs.executeScript({file: 'src/thirdParty/webgazer.js'}, function(){
            chrome.tabs.executeScript({file: 'webgazerjs.js'}, function(){
            });
    });  
}

function newchangeSpeed(){
	var value = $( "#flat-slider2" ).slider( "values", 0 );
	var scroll_speed;
	var scroll_speed_slider_val;
	scroll_speed = pageheight * (value/100);



	var obj= {
		"scroll_speed_slider" : value,
		"scroll_speed" : scroll_speed
	};
	setObjectdata(obj);

}


function changeSpeed(){
	var value = $( "#flat-slider2" ).slider( "values", 0 );
	var scroll_speed;
	var scroll_speed_slider_val;
	getObjectdata( function(data){
		 	scroll_speed_slider_val = data["scroll_speed_slider"];
		 	
		getObjectdata( function(data2){

		 	scroll_speed = data2["scroll_speed"];
			console.log("scroll_speed" +scroll_speed);


			var tempvalue = value;
			if ( value > 50) tempvalue = value*5;


			if ( value > scroll_speed_slider_val ) new_scroll_speed = scroll_speed + tempvalue;
			else new_scroll_speed = scroll_speed  - tempvalue;
			// var 
			console.log("new scroll_speed");
			console.log(new_scroll_speed);
			
			alert("value"+value+","+new_scroll_speed)
			// chrome.tabs.executeScript(null, {
			// 	code: 'scroll_speed = ' + new_scroll_speed +';'
			// });
			var obj= {
				"scroll_speed" : new_scroll_speed 
			};
			setObjectdata(obj);
			getObjectdata("scroll_speed", function(res){
				console.log(res);	
			});

			$("#flat-slider2").slider('value', value).change();
		});
	});
	var obj= {
		"scroll_speed_slider" : value
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

// initialization of UI
$(function() {

	


	var last = 0;

	$('#flat-slider1').slider({
		slide: function( event, ui ) {
			// alert(ui.value);
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
	  range:       false
      
	});

	// options dropdown	
    $("#options").on("click", function(){
	// $( "#effect" ).toggle( "blind", null, 500 );
		$( "#effect" ).toggle( "blind", null, 500 );
	
		getObjectdata( function(data){
			// alert(data["longpop-up"]);
			if(data["longpop-up"]) {
				var obj= {
					'longpop-up' : false
				};
			}else{
				var obj= {
					'longpop-up' : true
				};
			}
			setObjectdata(obj);
		});
 
      




    });

    
    // $(".onoffswitch-checkbox").is(':checked') = true;
	// document.getElementById('myonoffswitch').checked=true;
    
    $(".onoffswitch-checkbox").on("click", function(){

		    	if ( $(this).is(':checked') ) {
		        // alert("enabled");
			        var wgvideofeed= {
						'wgvideofeed' : true
					};
					setObjectdata(wgvideofeed);

			    } 
			    else {
			    	var wgvideofeed= {
					'wgvideofeed' : false
					};
					setObjectdata(wgvideofeed);
				}	


						 
	});   

	
});
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