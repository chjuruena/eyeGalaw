
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
				"page-action" : "reload",
				"load_page" : false 
			};
			setObjectdata(obj);
		}
	});
}); 

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	if(tab.active) {
		var obj= {
			"activetabId" : tab.id  //gets Id of active tab
		};
		setObjectdata(obj);
	}
   if (changeInfo.status == "loading" || changeInfo.status == "complete"){
	   	var obj= {
			"page-action" : "reload" //sets data for page-action
		};
		setObjectdata(obj);
   }
   
	
}); 





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
