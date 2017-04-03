getPosition();
function getPosition(){
    var obj={};
    var arr =["arrow_down","arrow_up","arrow_left","arrow_right", "prev_page"];
    arr.forEach(function(element) {
        console.log(element);
        // var position = document.getElementById(element).offsetParent.offsetTop;
        // // $(element).position();
        // var offset = $(element).offset();   


        var x = document.getElementById(element).offsetParent.offsetLeft;
        var y = document.getElementById(element).offsetParent.offsetTop;



        var objelement = {
            'x': x,
            'y': y
        };
    
        obj[element] = objelement;
        
    });

    chrome.storage.local.set(obj, function () {
        console.log('position', obj);
    });
}
