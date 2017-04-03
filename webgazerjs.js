

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
        console.log(data);
                // startWebgazerfeed(data); 
        // alert( "data[\"page-action\"]" + data["start_button"] );
          if((data["start_button"] =='STOP' && data["action"]=="click") || (data["start_button"] =='STOP' && data["page-action"]=="reload" && data["action"]=="reload")) {
                // alert("start");
                startWebgazerfeed(data); 
                var obj= {
                     "page-action" : null 
                 };
                 setObjectdata(obj);

                // if ((data["start_button"] =='STOP' && data["page-action"]=="reload" && data["action"]=="reload")) {
                //     var obj= {
                //          "page-action" : null 
                //      };
                //      setObjectdata(obj);
                // }
                // alert("start");)
                
                // webgazer.pause();

            }
          else if(data["start_button"] =='START' && data["action"]=="click") {
                webgazer.pause();

          }
          if(data["start_button"] =='STOP' && data["action"]=="reload" ){
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                console.log("resume");
                webgazer.resume();
            }     
             // run if null = wala pang instance

    });


// function showVideo(enabled){
    
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
        video.style.position = 'absolute';
        video.style.top = topDist;
        video.style.left = leftDist;
        video.width = width;
        video.height = height;
        video.style.margin = '0px';

        webgazer.params.imgWidth = width;
        webgazer.params.imgHeight = height;

        var overlay = document.createElement('canvas');
        overlay.id = 'overlay';
        overlay.style.position = 'absolute';
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

function startWebgazerfeed(data){
    // getObjectdata( function(data){

        // var localstorageLabel = 'webgazerGlobalData';
        // window.localStorage.setItem(localstorageLabel, null);
   
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
    .setTracker('clmtrackr')
    .setGazeListener(function(eyedata, elapsedTime) {

        if (eyedata == null) {
            console.log("nagnull");
            return;
        }

        if (data["start_button"] == "START") webgazer.showPredictionPoints(false).clearGazeListener();


        

        
        var xprediction = eyedata.x; //these x coordinates are relative to the viewport 
        var yprediction = eyedata.y; //these y coordinates are relative to the viewport
        console.log(elapsedTime); //elapsed time is based on time since begin was called

        
        // getObjectdata( function(data){

             
            var arrow_down=data["#arrow_down"];
            var arrow_up=data["#arrow_up"];
            var arrow_left=data["#arrow_left"];
            var arrow_right=data["#arrow_right"];
            var prev_page=data["#prev_page"];

            // alert("webgazer"+ arrow_down);
            

             // /////////////////////////////////
                console.log("X-gaze:" + xprediction+ " Y-gaze:" +yprediction);
                console.log("X-data:" + arrow_down.x+ " Y-data:" +arrow_down.y);
                console.log("X-click:" + data["x"]+ " Y-click:" +data["y"]);
             // /////////////////////////////////

             // scroll_speed
            var scroll_speed=data["scroll_speed"];
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
            
            if ((prev_page.x < xprediction &&  xprediction<(prev_page.x+100))&& (arrow_down.y  < yprediction && yprediction<(arrow_down.y+100))){
                startTimer();                
                window.history.back();

            }

            if ((arrow_down.x < xprediction &&  xprediction<(arrow_down.x+100))&& (arrow_down.y  < yprediction && yprediction<(arrow_down.y+100))){
                scrolled=scrolled+scroll_speed;
                console.log("down"); 
                startTimer();
                scrollz(scrolled);
                
             }
             if ((arrow_up.x < xprediction &&  xprediction<(arrow_up.x+100))&& (arrow_up.y  < yprediction && yprediction<(arrow_up.y+100))){
                if(scrolled<=0) {
                    console.log("top top top top" +scrolled);
                    scrolled=0;
                }
                else if (scrolled>0) scrolled=scrolled-scroll_speed;
                console.log("up");           
                startTimer();
                scrollz(scrolled);
                
             }

        

            


        // });
    }).begin().showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

    // });

}


 window.onbeforeunload = function() {
    // webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    // window.localStorage.clear(); //Comment out if you want to save data across different sessions 
  }