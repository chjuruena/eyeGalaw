
function getObjectdata(callback) {
    chrome.storage.local.get(null, callback);
}


function init(){
     getObjectdata( function(data){
        if (data["wgvideofeed"])showVideo(true);
        else showVideo(false);
        
    });
}
