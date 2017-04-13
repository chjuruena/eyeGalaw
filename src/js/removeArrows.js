var gaze_pads = document.querySelectorAll(".gaze_pads");
var line_arrows = document.querySelectorAll(".line_arrows");

for (var i = 0; i < line_arrows.length; i++) {  
	// myElements[i].style.opacity = '+value/100+'
	if(gaze_pads[i]) document.body.removeChild(gaze_pads[i]);
	
	document.body.removeChild(line_arrows[i]);
};
		





// code: ' var myElements = document.querySelectorAll(\".arrows\");Array.prototype.forEach.call( myElements, function( node ) {node.parentNode.removeChild( node );});'
