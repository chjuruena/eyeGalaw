

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
        console.log("X:" + xprediction+ " Y:" +yprediction);
        console.log("X-click:" + data["x"]+ " Y-click:" +data["y"]);

        console.log("X-data:" + arrow_down.x+ " Y-data:" +arrow_down.y);

         

         if ((arrow_down.x < xprediction ||  xprediction<(arrow_down.x+100))&& (arrow_down.y  < yprediction || yprediction<(arrow_down.y+100))){
            console.log("TUUUT");
            console.log("TUUUT");
            console.log("TUUUT");
            console.log("TUUUT");
         }
         

         // console.log();
    });
}).begin();



