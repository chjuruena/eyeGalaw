function getObjectdata(callback) {
    chrome.storage.local.get(null, callback);
}


$(function() {

    getObjectdata( function(data){
        var toastr_val= data["toastr_val"];
        var data1 = toastr_val[1];
        var data0 = toastr_val[0];
        

        toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": true,
          "progressBar": true,
          "positionClass": "toast-bottom-right",
          "preventDuplicates": true,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }
        
        
        if (data1 != null && data0 != null ){
          if( data1 == "Video feed is enabled"){
              toastr[data0]("It will take a moment, at least 10 seconds to prepare! ", data1);

          }else toastr[data0]("", data1);
              
          
        }
            
        
    });
        
    
});