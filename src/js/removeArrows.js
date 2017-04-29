var controls = document.querySelectorAll(".controls");
var line_arrows = document.querySelectorAll(".triangle");
var hidehold_div = document.querySelectorAll(".hidehold_div");

for (var i = 0; i < controls.length; i++) {  
	// myElements[i].style.opacity = '+value/100+'
	console.log(controls[i]);
	if(controls[i]) document.body.removeChild(controls[i]);
	// if(hidehold_div[i]) document.body.removeChild(hidehold_div[i]);

	
	// document.body.removeChild(line_arrows[i]);
};
		

