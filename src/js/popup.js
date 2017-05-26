// small letter for start then Pascal for functions ex. startEvent
// css class and ids are snake-case

var running;
var first=1;
var defaultPixelMovement = 150;
var pageheight = screen.height;


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

// loading default values for the extension
function loadDeafultValues(){
	$('.flat-slider').slider({
		disabled: true
	});	
		$('.onoffswitch-checkbox').prop('disabled', true);	
	
	// slider values is defaultPixelMovement/pageheight *100
	var sliderVal= Math.round((defaultPixelMovement/pageheight) * 100);
	// computing for the scroll speed
	var startingScrollSpeed = pageheight * (sliderVal/100); 

	var obj= {
		"pageheight" : pageheight,
		"scroll_speed_slider" : sliderVal,
		'wgvideofeed' : false,
		'scroll_speed' : startingScrollSpeed,
		'opacity' : 50
	};
	setObjectdata(obj);
}

//load slider values for opacity and scroll value
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
		
	});
}

// loads buttons value
function loadButtonVal(){
	
	getObjectdata( function(data){
		var start_val=data["start_button"];
		console.log(start_val);
		document.getElementById('start_button').text = start_val;

	});	
}

// sets "start"'s button's value
function setBtnto(action){
	var obj= {
		'start_button' : action
	};
	setObjectdata(obj);
	document.getElementById('start_button').text = action;
}

// gets and sets button event
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

// where most of the functions are called
window.onload=function(){
	var type;
	var msg;

	loadSliders();
	// files for the start-up screen welcome page
	var first='src/js/insertPopCard2.js';
	var dep = ['src/css/welcome.css', 'src/thirdParty/jquery-3.1.1.min.js'];

	getObjectdata( function(data){
     
		setPopupsize(data["longpop-up"]);
		disablebtn(data["start_button"]);

		if (data["wgvideofeed"]) $('#myonoffswitch').prop('checked', true);
		else $('#myonoffswitch').prop('checked', false);
		console.log(data);
		var toastr_val = data["toastr_val"];
		if (!data["start_button"]){			
			type = "success";
			msg="Welcome to eyeGalaw!";
			showtoastr(type, msg);
			// call for the start-up screen welcome page
			popupBox(first,dep );

			document.getElementById('start_button').text ='START';
			setBtnto("START");
			loadDeafultValues();


		}
		else {
				loadStartBtnFxns(data, "reload");
				var obj= {
					"action" : "reload" 
				};
				setObjectdata(obj);				
				loadButtonVal();
				console.log(data);
		}

		if(toastr_val[0] == null && toastr_val[1] == null ){			
			popupBox(first, dep);
		}		

	});	

	document.getElementById('start_button').addEventListener('click', startEvent);	
}

// setting pop up size depending on the user's prerog using CSS
function setPopupsize(data){
	if(data) {
        $('.dropdown').css('display', 'none');
		
	}else{
        $(".dropdown").css('display', 'block');
		
	}
    
}

// webgazerfeed button CSS adjust
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

// shows toastr
// injects toastr options to initialize the toastr settings
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

// loading start button values
function loadStartBtnFxns(data, action){
	
	var start_val = data["start_button"];
	var insertscript = data["insert_script"];
	
	var msg;
	var type;

	function insertControls(){

		chrome.tabs.executeScript(null, {
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
		if ((data["page-action"] == "reload") || (start_val =='START' && action=="click")){
			insertControls();			
		}
		startWebgazer();
			$('.onoffswitch-checkbox').prop('disabled', false);		

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
		// else if (start_val =='START' && action=="reload")  
		$('.flat-slider').slider({
			disabled: true
		});

		$('.onoffswitch-checkbox').prop('disabled', true);		

		if (action=="click") setBtnto("START");
		loadButtonVal();

		showtoastr(type, msg);

	}


}


//fxn for inserting  the start-up screen welcome page

function popupBox(filename, dep){

	injectResources(dep).then(() => {
	  chrome.tabs.executeScript({
	    file: filename
	  },function(){


	  });
	}).catch(err => {
	  console.error(`Error occurred: ${err}`);
	});


}

// injecting web gazer whenever the user clicks start
function startWebgazer(){
	injectResources([ 'src/thirdParty/webgazer.js','src/thirdParty/toastr.min.css', 'src/thirdParty/jquery-3.1.1.min.js', 'src/thirdParty/toastr.min.js', 'src/css/dots.css']).then(() => {
	  var type="warning";
    	var msg = "Click anywhere in the screen while looking at the mouse pointer to initialize/calibrate eyeGalaw."
    	showtoastr(type, msg);
		getObjectdata( function(data){
			var loadpage = data["load_page"];
			if (!loadpage){
		    	chrome.tabs.executeScript(null, {
		            file: 'src/js/loader.js'

		        });

				var obj= {
				     "load_page" : true
				 };
				 setObjectdata(obj); 
			}
			
	        chrome.tabs.executeScript({file: 'src/js/webgazerjs.js'}, function(){
	        });			
		});

	}).catch(err => {
	  console.error(`Error occurred: ${err}`);
	});
}

// change scrolling speed
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

// change scrolling speed

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

// inscrease/dec opacity using CSS
function changeOpacity(){
	var value = $( '#flat-slider1' ).slider( 'values', 0 );
	chrome.tabs.executeScript(null, {
		code: ' var myElements = document.querySelectorAll(\'.controls\');for (var i = 0; i < myElements.length; i++) {  myElements[i].style.opacity = '+value/100+';} '
	});
	var obj= {
		'opacity' : value
	};
	setObjectdata(obj);

}

// initialization of UI by jquery
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
		var lbl;
    	if($("#options").text()== "Options▲") lbl = "Options▼";
    	else lbl = " Options▲"		
	   $("#options").text(lbl);
	 
	
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

    
    $(".onoffswitch-checkbox").on("click", function(){
    	var type, msg;

    	if ( $(this).is(':checked') ) {
        // alert("enabled");
	        var wgvideofeed= {
				'wgvideofeed' : true
			};
			setObjectdata(wgvideofeed);
			msg = "Video feed is enabled;";
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

	 var sourceSwap = function () {
        var $eyeGalawicon = $("#eyeGalaw-icon");
        var newSource = $eyeGalawicon.data('alt-src');
        $eyeGalawicon.data('alt-src', $eyeGalawicon.attr('src'));
        $eyeGalawicon.attr('src', newSource);
    }

    $(function () {
        $('#curve-div').hover(sourceSwap, sourceSwap);
    });

    $('.masterTooltip').hover(function(){
                // Hover over code
                var title = $(this).attr('title');
                $(this).data('tipText', title).removeAttr('title');
                $('<p class="tooltip"></p>')
                .text(title)
                .appendTo('body')
                .fadeIn('slow');
        }, function() {
                // Hover out code
                $(this).attr('title', $(this).data('tipText'));
                $('.tooltip').remove();
        }).mousemove(function(e) {
                var mousex = e.pageX + 20; //Get X coordinates
                var mousey = e.pageY + 10; //Get Y coordinates
                $('.tooltip')
                .css({ top: mousey, left: mousex })
        });

    $("#eyeGalaw-icon").on("click", function(){
		var filename ='src/js/insertPopCard.js';
		var dep = 	['src/css/modal.css', 'src/thirdParty/jquery-3.1.1.min.js'];

    		popupBox(filename, dep);

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