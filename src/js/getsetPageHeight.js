var pageheight = $(window).height(); 
	alert(pageheight);
	var obj= {
		"page-height" : pageheight 
	};
	setObjectdata(obj);




	function setObjectdata(obj){
    chrome.storage.local.set(obj, function () {
    });
}
