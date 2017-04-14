function getObjectdata(callback) {
    chrome.storage.local.get(null, callback);
}


$(function() {

    getObjectdata( function(data){
        var toastr_val= data["toastr_val"];

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
        toastr[toastr_val[0]]("", toastr_val[1]);
            
    });
    
});