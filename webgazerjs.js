

function getObjectdata(callback) {
    chrome.storage.local.get(null, callback);
}

webgazer.setGazeListener(function(data, elapsedTime) {
// alert("buloy");

    if (data == null) {
        console.log("nagnull");
        return;
    }
    
    var xprediction = data.x; //these x coordinates are relative to the viewport 
    var yprediction = data.y; //these y coordinates are relative to the viewport
    console.log(elapsedTime); //elapsed time is based on time since begin was called


    getObjectdata( function(data){
         // console.log("data" + data);

         // console.log("from webgazer" + data["#arrow_down"]);
         var arrow_down=data["#arrow_down"];
        console.log("X-gaze:" + xprediction+ " Y-gaze:" +yprediction);
        console.log("X-click:" + data["x"]+ " Y-click:" +data["y"]);

        console.log("X-data:" + arrow_down.x+ " Y-data:" +arrow_down.y);

         

         if ((arrow_down.x < xprediction &&  xprediction<(arrow_down.x+100))&& (arrow_down.y  < yprediction && yprediction<(arrow_down.y+100))){
            console.log("TUUUT");
            console.log("TUUUT");
            console.log("TUUUT");
            console.log("TUUUT");
         }
         

         // console.log();
    });
}).begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

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



