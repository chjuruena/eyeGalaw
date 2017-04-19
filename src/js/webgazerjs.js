

function getObjectdata(callback) {
    chrome.storage.local.get(null, callback);
}
function setObjectdata(obj){
    chrome.storage.local.set(obj, function () {
    });
}

init();
getObjectdata( function(data){


    if (data["wgvideofeed"]) showVideo(true);
    else {
        // alert("neh");
        showVideo(false);             
    }
});
var scrolled=0;
var scroll_speed;
var startvid;

function init(){
     // startvid = null;

    getObjectdata( function(data){
          if((data["start_button"] =='STOP' && data["action"]=="click") || (data["start_button"] =='STOP' && 
            data["page-action"]=="reload" && data["action"]=="reload")) {
                // alert("start");
                startWebgazerfeed(); 
                var obj= {
                     "page-action" : null 
                 };
                 setObjectdata(obj);              

            }
          else if(data["start_button"] =='START' && data["action"]=="click") {
                webgazer.pause();

          }
          if(data["start_button"] =='STOP' && data["action"]=="reload" ){                
                webgazer.resume();
            }  

    });
    
}

function showVideo(enabled){
    if (enabled) startvid=setTimeout(checkIfReady,100);
    else {
        console.log("hide");
        clearTimeout(startvid);
        var video = document.getElementById('webgazerVideoFeed');
        video.style.display = 'none';
        // document.body.removeChild(video);
        
        var overlay=document.getElementById('overlay');
        // document.body.removeChild(overlay);
        video.style.display = 'overlay';



    }
}

// function setupvid(){
    var width = 320;
    var height = 240;
    var topDist = '0px';
    var leftDist = '0px';
    
    var setup = function() {
        var video = document.getElementById('webgazerVideoFeed');
        video.style.display = 'block';
        video.style.position = 'fixed';
        video.style.top = topDist;
        video.style.left = leftDist;
        video.width = width;
        video.height = height;
        video.style.margin = '0px';

        webgazer.params.imgWidth = width;
        webgazer.params.imgHeight = height;

        var overlay = document.createElement('canvas');
        overlay.id = 'overlay';
        overlay.style.position = 'fixed';
        overlay.width = width;
        overlay.height = height;
        overlay.style.top = topDist;
        overlay.style.left = leftDist;
        overlay.style.margin = '0px';

        document.body.appendChild(overlay);

        var cl = webgazer.getTracker().clm;

        function drawLoop() {
            requestAnimFrame(drawLoop);
            overlay.getContext('2d').clearRect(0,0,width,height);
            if (cl.getCurrentPosition()) {
                cl.draw(overlay);
            }
        }
        drawLoop();
    };
    function checkIfReady() {
        if (webgazer.isReady()) {
            setup();
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    // setTimeout(checkIfReady,100); 
// }
// function showLoadingscreen(show){
//      chrome.tabs.executeScript({file: '/thirdParty/jquery-3.1.1.min.js'}, function(){
           
//             chrome.tabs.executeScript(null, {
//             // file: 'src/js/insertLoading.js'                        
//             code:
//             "var preloader = document.createElement( \'div\' );" +
//             "preloader.setAttribute(\'id\', \'preloader\');" +
//             "document.body.appendChild(preloader);"

//         // },function(){            
//         });           

        
//              // $('.toggle-loading').click(function () {
//              //    if (target.hasClass('loading')) {
//              //      target.loadingOverlay('remove');
//              //    } else {
//              //      target.loadingOverlay();
//              //    };
//              //  });

//     });



// }

function startWebgazerfeed(){
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
    .setTracker('clmtrackr')
    .setGazeListener(function(eyedata, elapsedTime) {

        //show
        //  executescript
        // showLoadingscreen(true);
        // var target = $('#target');
        // target.loadingOverlay();  
        if (eyedata == null) {
            console.log("nagnull");
            // loading screen
            return;
        }
        $('.loader').fadeOut('slow',function(){$(this).remove();});
        // toastr["success"]("", "eyeGalaw succesfully launched");
        //hdie

       

        // showtoastr(type,msg);
        // if (eyedata != null) alert("yey")


        var xprediction = eyedata.x; //these x coordinates are relative to the viewport 
        var yprediction = eyedata.y; //these y coordinates are relative to the viewport
        console.log(elapsedTime); //elapsed time is based on time since begin was called
       
        getObjectdata( function(data){         

            
            if (data["start_button"] == "START") webgazer.showPredictionPoints(false).clearGazeListener();

            
            var arrow_down=data["gaze_down"];
            var arrow_up=data["gaze_up"];
            var prev_page=data["prev_page"];
            var hide=data["hide_div"];
            var hold=data["hold_div"];

             // /////////////////////////////////
                console.log("X-gaze:" + xprediction+ " Y-gaze:" +yprediction);
                console.log("X-arrow:" + arrow_down.x + " Y-arrow:" +arrow_down.y);
                console.log("X-arrow:" + arrow_up.x + " Y-arrow:" +arrow_up.y);
                console.log("X-click:" + data["x"]+ " Y-click:" +data["y"]);
             // /////////////////////////////////

             // scroll_speed
            var scroll_speed=data["scroll_speed"];
            var pagePosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            function scrollz(scrolled){
                $("html, body").animate({
                    scrollTop:  scrolled
               });
            }

            function startTimer( ) {
                var i = 0;
                var timer = setInterval(function() {
                    console.log(++i);
                    if (i === 4) { //seconds from RRL
                        clearInterval(timer);
                    }
                    console.log('post-interval'); //this will still run after clearing
                }, 200);
            }


            if ((hold.x < xprediction &&  xprediction<(hold.x+100))&& (hold.y  < yprediction && yprediction<(hold.y+100))){
                startTimer();
                // alert('hold');
                // window.history.back();
                 var tempToggle = data["hold_toggle"];
                 var msg;
                // alert("Toggle enabled: " + tempToggle);
                if(tempToggle) {
                   // tempToggle = !tempToggle;                    
                    scroll_speed= data["pageheight"]*(data["scroll_speed_slider"]/100);
                    // console.log()
                    msg= "Scrolling disabled";
                }else {
                    // tempToggle = true;
                    msg= "Scrolling enabled"

                   scroll_speed=0;
                }
                tempToggle = !tempToggle; 

                toastr["warning"]("", msg);
                

                // var arr = [];
                // arr.push("warning", msg);
                var obj= {
                     "hold_toggle" : tempToggle,
                     "scroll_speed" : scroll_speed
                     
                 };
                 setObjectdata(obj); 
            }
            if ((prev_page.x < xprediction &&  xprediction<(prev_page.x+100))&& (arrow_down.y  < yprediction && yprediction<(arrow_down.y+100))){
                startTimer();                
                // window.history.back();
            }

                
            var gdown=data["gaze_down"];
            var gup=data["gaze_up"];

            if  ((arrow_down.y < yprediction) && ((arrow_down.y+100)  > yprediction )){                  
               // alert(scroll_speed)
                scrolled=pagePosition+scroll_speed;
                console.log("down"); 
                startTimer();
                scrollz(scrolled);
             } 

             if ( (arrow_up.y  < yprediction && yprediction<(arrow_up.y+100))){                     
               // alert(scroll_speed)
                
                scrolled=pagePosition-scroll_speed;
                console.log("up");           
                startTimer();
                scrollz(scrolled);                
             } 

             if ((hide.x < xprediction &&  xprediction<(hide.x+100))&& (hide.y  < yprediction && yprediction<(hide.y+100))){
                // alert('hide');
               //  startTimer(); 
               startTimer();
               startTimer();
               startTimer();
               startTimer();
                
                // function togglHide(){
                    $("#hide_div").toggle(
                     function () {
                        $(".hidehold_div").css('opacity', '0');


                  
                     },function () {
                        $(".hidehold_div").css('opacity', '1');

                 
                   });
                    
                // }

                

            }
                
            // }
            

            // if ((hold.x < xprediction &&  xprediction<(hold.x+100))&& (hold.y  < yprediction && yprediction<(hold.y+100))){
            //     // startTimer();
            //     alert('hold');
            //     // window.history.back();
            // }


             // else $('#gaze_up').css('background-color', 'red');
        });

    }).begin().showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */
    // });
}


 window.onbeforeunload = function() {
    // webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    // window.localStorage.clear(); //Comment out if you want to save data across different sessions 
  }

toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": true,
          "progressBar": true,
          "positionClass": "toast-bottom-right",
          "preventDuplicates": true,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }