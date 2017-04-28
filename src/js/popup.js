// small letter for start then Pascal for functions ex. startEvent
// css class and ids are snake-case

// var app = chrome.runtime.getBackgroundPage();
var running;
var first=1;
var defaultPixelMovement = 50;
var pageheight = screen.height;


// toaster


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
		$('.onoffswitch-checkbox').prop('disabled', true);		


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
		// changeOpacity();
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

		loadStartBtnFxns(data, "click");
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
	var type;
	var msg;

	loadSliders();
			popupBox();

	

	getObjectdata( function(data){
        // alert(data["page-action"]+" "+ data["start_button"] +" "+ data["action"] )
		// alert(data["page-action"])

		setPopupsize(data["longpop-up"]);
		disablebtn(data["start_button"]);

		// alert(data["wgvideofeed"]);
		if (data["wgvideofeed"]) $('#myonoffswitch').prop('checked', true);
		else $('#myonoffswitch').prop('checked', false);
		console.log(data);
		var toastr_val = data["toastr_val"];




		if (!data["start_button"]){			
			type = "success";
			msg="Welcome to eyeGalaw!";
			showtoastr(type, msg);
			popupBox();
			// tutorial
			console.log("wala pang start_button");
			document.getElementById('start_button').text ='START';
			setBtnto("START");
			// setSliderValAtStart();
			loadDeafultValues();


		}
		else {
		// setPopupsize(data["longpop-up"]);

			console.log("MERON NAAAAAAAA start_button"); 
				loadStartBtnFxns(data, "reload");
				var obj= {
					"action" : "reload" 
				};
				setObjectdata(obj);
				
				loadButtonVal();
				console.log(data);
		}

		if(toastr_val[0] == null && toastr_val[1] == null ){			
			popupBox();
		}		

	});	

	// loadButtonVal();


	document.getElementById('start_button').addEventListener('click', startEvent);	
}

function setPopupsize(data){
	if(data) {
        $('.dropdown').css('display', 'none');
		
	}else{
        $(".dropdown").css('display', 'block');

		
	}


    //   if($('#menu').height() != 200)
    //         $("#menu").css('height', '200px');
    
}
function disablebtn(start_val){
	if(start_val=="START"){
		$(".onoffswitch-inner").css('opacity', '0.40');
		$(".onoffswitch-switch").css('opacity', '0.40');
		$(".onoffswitch-checkbox").css('opacity', '0.40');
		$(".onoffswitch-checkbox").css('opacity', '0.40');
		$(".onoffswitch-label").css('cursor', 'not-allowed');

				
	}else{
		$(".onoffswitch-inner").css('opacity', '100');
		$(".onoffswitch-switch").css('opacity', '100');
		$(".onoffswitch-checkbox").css('opacity', '100');
		$(".onoffswitch-label").css('opacity', '100');
		$(".onoffswitch-label").css('cursor', 'pointer');

	}
}

/**
 * Injects resources provided as paths into active tab in chrome
 * @param files {string[]}
 * @returns {Promise}
 */
function injectResources(files) {
    var getFileExtension = /(?:\.([^.]+))?$/;

    //helper function that returns appropriate chrome.tabs function to load resource
    var loadFunctionForExtension = (ext) => {
      switch(ext) {
          case 'js' : return chrome.tabs.executeScript;
          case 'css' : return chrome.tabs.insertCSS;
          default: throw new Error('Unsupported resource type')
      }
    };

    return Promise.all(files.map(resource => new Promise((resolve, reject) => {
        var ext = getFileExtension.exec(resource)[1];
        var loadFunction = loadFunctionForExtension(ext);

        loadFunction(null, {file: resource}, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    })));
}
function showtoastr(type, msg){  
	var arr=[];
	arr.push(type, msg);
	var obj= {
		"toastr_val" : arr
	};
	setObjectdata(obj);

    injectResources(['src/thirdParty/toastr.min.css', 'src/thirdParty/jquery-3.1.1.min.js', 'src/thirdParty/toastr.min.js']).then(() => {
	  chrome.tabs.executeScript({
	    file: 'src/js/toastrOptions.js'
	  });
	}).catch(err => {
	  console.error(`Error occurred: ${err}`);
	});
		
}

function loadStartBtnFxns(data, action){
	
	var start_val = data["start_button"];
	var insertscript = data["insert_script"];
	// getObjectdata( function(data){		

	// var start_val=data["start_button"];
	console.log(start_val);

	//opposite azng reload at click
	// relaod =value after clicking
	// click=value before clicking
	var msg;
	var type;

	function insertControls(){

		// alert("insertControls"+ insertscript);
		chrome.tabs.executeScript(null, {
				// allFrames: true, 
			file: 'src/js/insert.js'						
		}, function(){
			changeOpacity();
		});
	}
	if((start_val =='START' && action=="click") || (start_val =='STOP' && action=="reload") ){
		if(start_val =='START' && action=="click") {
			// alert("start_val =='START' && action==click");
			type = "info";
			msg= "Starting eyeGalaw";			
		}
		else if(start_val =='STOP' && action=="reload") {
			// alert("start_val =='STOP' && action==reload");
			type = "info";
			msg= "eyeGalaw enabled! Loading settings.";
		}
		showtoastr(type, msg);

		document.getElementById('flat-slider1').addEventListener('mouseup', changeOpacity);
		document.getElementById('flat-slider2').addEventListener('mouseup', newchangeSpeed);	
		//enable sliders
		$('.flat-slider').slider({
			disabled: false
		});	
		// $('.onoffswitch-checkbox').prop('disabled', false);		


		console.log(insertscript)
		console.log(insertscript)
		console.log(insertscript)
		console.log(insertscript)
		console.log(insertscript)
		console.log(insertscript)
		console.log(insertscript)
		console.log(insertscript)
		console.log(insertscript)
		console.log(insertscript)
		if ((data["page-action"] == "reload") || (start_val =='START' && action=="click")){
			insertControls();
			// var obj= {
			//      "insert_script" : true			     
			// };
			// setObjectdata(obj); 
				 
		}


		// startWebgazer();
			$('.onoffswitch-checkbox').prop('disabled', false);


		// getObjectdata( function(data){
		// 	var toastr_val=data["toastr_val"];
		// 	showtoastr(toastr_val[0], toastr_val[1]);

		// 	// if(  data["hold_toggle"]) alert( data["hold_toggle"])
			
		// });

		if (action=="click"){
			setBtnto("STOP");
		}		
		showtoastr(type, msg);



	}
	else if((start_val =='STOP' && action=="click") || (start_val =='START' && action=="reload")  ){

		if(start_val =='STOP' && action=="click") {
			// alert(data["start_button"] +"start_val =='STOP' && action==click" + data["page-action"]);
			type = "info";
			msg= "eyeGalaw disabled!";
			$('.onoffswitch-checkbox').prop('disabled', true);
			chrome.tabs.executeScript(null,  {
				file: 'src/js/removeArrows.js'
			
			});
			var obj= {
				 "page-action" : "removeArrows"
				 
				};
				setObjectdata(obj); 
			console.log(data)
		}
		else if (start_val =='START' && action=="reload")  
			// alert("(start_val =='START' && action==reload" + data["page-action"]);
		
		// var obj= {
		//  "insert_script" : false
		 
		// };
		// setObjectdata(obj); 
		

		

		$('.flat-slider').slider({
			disabled: true
		});

		$('.onoffswitch-checkbox').prop('disabled', true);		

		if (action=="click") setBtnto("START");
		loadButtonVal();

		showtoastr(type, msg);
          //alert(data["page-action"]+" "+ data["start_button"] +" "+ data["action"] )

	}


}

function popupBox(){

	injectResources(['src/css/welcome.css', 'src/thirdParty/jquery-3.1.1.min.js']).then(() => {
	// injectResources(['src/css/modal.css', 'src/css/eyes.css','src/css/csscarousel.css', 'src/thirdParty/jquery-3.1.1.min.js']).then(() => {
	  chrome.tabs.executeScript({
	    file: 'src/js/insertPopCard2.js'
	  },function(){


	  });
	}).catch(err => {
	  console.error(`Error occurred: ${err}`);
	});

		
	// timer
    
    // setTimeout(checkIfReady,100);

}

function startWebgazer(){
	injectResources([ 'src/thirdParty/webgazer.js','src/thirdParty/toastr.min.css', 'src/thirdParty/jquery-3.1.1.min.js', 'src/thirdParty/toastr.min.js']).then(() => {
	  var type="warning";
    	var msg = "Click anywhere in the screen to initialize eyeGalaw."
    	showtoastr(type, msg);
		getObjectdata( function(data){
			var loadpage = data["load_page"];
			// alert(loadpage);
			if (!loadpage){
		    	chrome.tabs.executeScript(null, {
		            code:

		            "var preloader = document.createElement( \'div\' );" +
		            "preloader.setAttribute(\'class\', \'loader\');" +
		            "document.body.appendChild(preloader);"
		           

		            
		        });
				var obj= {
				     "load_page" : true
				     
				 };
				 setObjectdata(obj); 
				 
			}

	        
	            // chrome.tabs.executeScript({file: 'src/js/webgazerjs.js'}, function(){
	        chrome.tabs.executeScript({file: 'src/js/webgazerjs.js'}, function(){


	        });
			
		});

	}).catch(err => {
	  console.error(`Error occurred: ${err}`);
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
		code: ' var myElements = document.querySelectorAll(\'.controls\');for (var i = 0; i < myElements.length; i++) {  myElements[i].style.opacity = '+value/100+';} '
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
		// alert( $('#flat-slider2').prop('disabled'));
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
    	var type, msg;

    	if ( $(this).is(':checked') ) {
        // alert("enabled");
	        var wgvideofeed= {
				'wgvideofeed' : true
			};
			setObjectdata(wgvideofeed);
			msg = "Video feed is enabled;"


	    } 
	    else {
	    	var wgvideofeed= {
			'wgvideofeed' : false
			};
			setObjectdata(wgvideofeed);
			msg = "Video feed is disabled;"

		}	

		type = "info;"
		showtoastr(type, msg);


						 
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