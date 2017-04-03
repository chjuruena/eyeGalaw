// // / Regex-pattern to check URLs against. 
// // It matches URLs like: http[s]://[...]stackoverflow.com[...]
// var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?stackoverflow\.com/;

// // A function to use as callback
// function doStuffWithDom(domContent) {
//     console.log('I received the following DOM content:\n' + domContent);
// }

// // When the browser-action button is clicked...
// chrome.browserAction.onClicked.addListener(function (tab) {
//     // ...check the URL of the active tab against our pattern and...
//     if (urlRegex.test(tab.url)) {
//         // ...if it matches, send a message specifying a callback too
//         chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
//     }
// });
function setObjectdata(obj){
    chrome.storage.local.set(obj, function () {
    });
}


function getObjectdata(callback) {
    chrome.storage.local.get(null, callback);
}



chrome.tabs.onActivated.addListener(function(activeInfo) {
	getObjectdata( function(data){
		if (activeInfo.tabId != data["activetabId"] ){
			var obj= {
				"page-action" : "reload" 
			};
			setObjectdata(obj);
		}
	});
}); 

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   // alert(changeInfo.status);

	if(tab.active) {
		var obj= {
			"activetabId" : tab.id 
		};
		setObjectdata(obj);
	}
   if (changeInfo.status == "loading" || changeInfo.status == "complete"){
	   	var obj= {
			"page-action" : "reload" 
		};
		setObjectdata(obj);
   }
	// getObjectdata( function(data){
	// 	alert("activetabId" + data["activetabId"]);
	// });

}); 

