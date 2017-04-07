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
		'opacity' : 50,
		'longpop-up' : true
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


function setBtnto(action){
	var obj= {
		'start_button' : action
	};
	setObjectdata(obj);
	document.getElementById('start_button').text = action;
}
function startEvent() {   
	loadDeafultValues();

	getObjectdata( function(data){	
		loadStartBtnFxns(data["start_button"], "click");
		var obj= {
			"action" : "click" 

		};
		setObjectdata(obj);	
		console.log(data)
	});	
}

function setSliderValAtStart(){
	$('.flat-slider').slider({
		disabled: true
	});	
	
    				
	var obj= {
		"scroll_speed_slider" : 1,
		'wgvideofeed' : false
		
	};
	setObjectdata(obj);

}

window.onload=function(){
	// if($("#mainr").height;)


	getObjectdata( function(data){
		setPopupsize(data);
		console.log(data);



		if (!data["start_button"]){
			console.log("wala pang start_button");
			document.getElementById('start_button').text ='START';


			setBtnto("START");
			setSliderValAtStart();




		}else {
			console.log("MERON NAAAAAAAA start_button");


				loadStartBtnFxns(data["start_button"], "reload");
				var obj= {
					"action" : "reload" 
				};
				setObjectdata(obj);

				loadButtonVal();
				console.log(data);
		// console.log(data["stopped"]);



			//opening otehr pages or new

			loadSliders();
		}

		if (data["wgvideofeed"]) 	$('#myonoffswitch').prop('checked', true);
		else $('#myonoffswitch').prop('checked', false);





		console.log(data);
		console.log(data["stopped"]);
	});	

	// loadButtonVal();


	document.getElementById('start_button').addEventListener('click', startEvent);	
}

function setPopupsize(data){
	if(data["longpop-up"]) {
        $('.dropdown').css('display', 'none');
		
	}else{
        $(".dropdown").css('display', 'block');
      // $( "#effect" ).toggle( "blind", null, 500 );

		
	}


    //   if($('#menu').height() != 200)
    //         $("#menu").css('height', '200px');
    
}
function disablebtn(){
	if($('.flat-slider').is(':disabled')){
		alert('ya')
					$(".onoffswitch-inner").css('opacity', '0.40');
					$(".onoffswitch-switch").css('opacity', '0.40');
					$(".onoffswitch-checkbox").css('opacity', '0.40');
					$(".onoffswitch-label").css('opacity', '0.40');
							
				}else{
					$(".onoffswitch-inner").css('opacity', '100');
					$(".onoffswitch-switch").css('opacity', '100');
					$(".onoffswitch-checkbox").css('opacity', '100');
					$(".onoffswitch-label").css('opacity', '100');
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

					loadDeafultValues();
					// webgaer video feed
					

					document.getElementById('flat-slider1').addEventListener('mouseup', changeOpacity);
					document.getElementById('flat-slider2').addEventListener('mouseup', changeSpeed);
				
					//enable sliders

					$('.flat-slider').slider({
						disabled: false
					});	



					$('.onoffswitch-checkbox').prop('disabled', false);		
					chrome.tabs.executeScript(null, {
							allFrames: true, 
						file: 'insert.js'

						// }, function (result) {
				  //           chrome.tabs.executeScript(null, {file: 'getposition.js'}, function (result) {

				  //           alert("after getposition.js")								;
						// 	}); 
						});
					
					//tarting webgazer - dito siya inilagay para masave muna yung position sa taas
					
					// startWebgazer();
					if (action=="click"){
						setBtnto("STOP");
					}

					// var i = 0;
					// var timer = setInterval(function() {
					//   console.log(++i);
					//   if (i === 5) clearInterval(timer);
					//   console.log('post-interval'); //this will still run after clearing
					// }, 200);

					
                disablebtn();
					
					
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
                disablebtn();

				}

}




function startWebgazer(){

    chrome.tabs.executeScript({file: 'src/thirdParty/webgazer.js'}, function(){
            chrome.tabs.executeScript({file: 'webgazerjs.js'}, function(){
            });
    });  
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

			if ( value > scroll_speed_slider_val ) new_scroll_speed = scroll_speed + value*5;
			else new_scroll_speed = scroll_speed  - (value)*5;
			// var 
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
      
	});

	// options dropdown	
    $("#options").on("click", function(){
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
 //    if ( $(".onoffswitch-checkbox").is(':checked') ) {
	// 	        // alert("enabled");
	// 		        var wgvideofeed= {
	// 					'wgvideofeed' : true
	// 				};
	// 				setObjectdata(wgvideofeed);
	

	// } 
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