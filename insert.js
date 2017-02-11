// DO THIS: 
// 1. load UI
// 2. load webgazer


// already working webgazer
// webgazer.setGazeListener(function(data, elapsedTime) {
//     if (data == null) {
//         return;
//     }
//     var prediction = webgazer.getCurrentPrediction();
// 	if (prediction) {
// 	    var x = prediction.x;
// 	    var y = prediction.y;
// 	}
//     // var xprediction = data.x; //these x coordinates are relative to the viewport 
//     // var yprediction = data.y; //these y coordinates are relative to the viewport
//     console.log(elapsedTime); //elapsed time is based on time since begin was called
// }).begin();



// alert('hello ' + document.location.href);
document.body.style.backgroundColor="red";

$(function(){
    //$(".add_button").click(add_timeline_element);
	alert('hello ' + document.location.href);
    // add_timeline_element();

    function add_timeline_element(){
        var text_input = $('<input />', {
            type: "text",
            class: "t_text_area"
        });
        var button = $('<button />', {
            text: '-',
            class: "t_intect_button",
            click: function() {$(this).parent().remove();}
        });
        var timeline_element = $('<td />', {
            class: "timeline_element"
        });
        timeline_element.append(button);
        timeline_element.append(text_input);
        $(".t_inject_row").append(timeline_element);
    }
    
    function minimize_t_inject_container(){
        $(".add_button").toggle();
    }
    
    function create_twitter_bar(){
        var table_container = $("<table />", {
            class: "t_inject_container"
        });
            var row = $("<tr />", {
                        class: "t_inject_row"
                        });
                var menu = $("<td />", {
                    class: "menu"
                });
                    var add_element_button = $("<button />", {
                        text: '+',
                        class: "add_button t_intect_button",
                        click: function() {add_timeline_element();}
                    });
                    var minimize_button = $("<button />", {
                        text: 'm',
                        click: function() {minimize_t_inject_container();},
                        class: "minimize_button t_intect_button"
                    });
                    menu.append(add_element_button);
                    menu.append(minimize_button);
            row.append(menu);
        table_container.append(row);
        $('body').append(table_container);
    }
    create_twitter_bar();
    
    
    
    var scroll_point = 0;
    var done_scrolling;
    var counting = "false";
    var time_counter = 0.00;
    var consecutive_scrolls = 0.00;
    
    var scroll_ending = function () {
        console.log("done scrolling");
        clearInterval(counting);
        counting = "false";
        time_counter = 0.00;
    }
    $(document).scroll(function() {
        var new_scroll_point = $(document).scrollTop();
        var scroll_delta = scroll_point - new_scroll_point;
        if(scroll_delta < 0){
            scroll_delta = scroll_delta * (-1);
        }
        scroll_point = new_scroll_point;
        if(counting=="false"){
            counting = setInterval(function(){
                time_counter += 0.1;
            }, 100);
        } else{
            var scroll_over_time = scroll_delta/time_counter;
            console.log("scrolling over time:"+ scroll_over_time);
            clearTimeout(done_scrolling);
            done_scrolling = setTimeout(scroll_ending, 150);
            if(scroll_over_time > 400 && scroll_over_time < 3000){
                $(".add_button").hide();
            }
        }        
    });
});