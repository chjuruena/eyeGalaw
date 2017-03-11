// $(document).ready(function(){
$(function() {
	var obj={};
	var arr =["#arrow_down","#arrow_up","#arrow_left","#arrow_right"];
	arr.forEach(function(element) {
	    console.log(element);
	    var position = $(element).position();
	    var offset = $(element).offset();    	 	


		var objelement = {
			'x': offset.left, 
			'y': position.top
		};
	
		// obj_element[element]=coords;
		obj[element] = objelement;
		
	});



	// var arrow_down = $("#arrow_down");
	// var position = arrow_down.position(); 
	// var offset = arrow_down.offset();
	// console.log( "left: " + offset.left + ", top: " + position.top );
	// // var obj ={
	// // 	'arrow_down' : 
	// // 		coords={ 
	// // 			'x': offset.left, 
	// // 			'y': position.top 
	// // 		}		
	// // };
	// var coords={ 
	// 	'x': offset.left, 
	// 	'y': position.top 
	// }	
	// var obj ={
	// 	'arrow_down' : coords
	// };


				// var coords
	chrome.storage.local.set(obj, function () {
		console.log('position', obj);
	});
});
					 // obj
