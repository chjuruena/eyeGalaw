
webgazer.setGazeListener(function(data, elapsedTime) {
// alert("buloy");

    if (data == null) {
        return;
    }
    var xprediction = data.x; //these x coordinates are relative to the viewport 
    var yprediction = data.y; //these y coordinates are relative to the viewport
    // console.log(elapsedTime); //elapsed time is based on time since begin was called
    console.log("X:" + xprediction+ " Y:" +yprediction);
}).begin();

