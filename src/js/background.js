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
	// checkHold();
}); 

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   // alert(changeInfo.status);

	if(tab.active) {
		var obj= {
			"activetabId" : tab.id 
		};
		setObjectdata(obj);
		// checkHold();
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
function checkHold(){
	getObjectdata( function(data){
	var msg;
	var type="info";
	if(data["hold_toggle"]==true) {
	// alert("activetabId" + data["activetabId"]);
		msg = "Scrolling is disabled!"
	}else{
		msg = "Scrolling is enabled!"

	}
	showtoastr(type, msg);
});
}





/**
 * Injects resources provided as paths into active tab in chrome
 * @param files {string[]}
 * @returns {Promise}
 */
function injectResources(files) {
    var getFileExtension = /(?:\.([^.]+))?$/;

    //helper function that returns appropriate chrome.tabs function to load resource
    var loadFunctionForExtension = (ext) => {
      switch(ext) {
          case 'js' : return chrome.tabs.executeScript;
          case 'css' : return chrome.tabs.insertCSS;
          default: throw new Error('Unsupported resource type')
      }
    };

    return Promise.all(files.map(resource => new Promise((resolve, reject) => {
        var ext = getFileExtension.exec(resource)[1];
        var loadFunction = loadFunctionForExtension(ext);

        loadFunction(null, {file: resource}, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    })));
}
function showtoastr(type, msg){  
	var arr=[];
	arr.push(type, msg);
	var obj= {
		"toastr_val" : arr
	};
	setObjectdata(obj);

    injectResources(['src/thirdParty/toastr.min.css', 'src/thirdParty/jquery-3.1.1.min.js', 'src/thirdParty/toastr.min.js']).then(() => {
	  chrome.tabs.executeScript({
	    file: 'src/js/toastrOptions.js'
	  });
	}).catch(err => {
	  console.error(`Error occurred: ${err}`);
	});
		
}
