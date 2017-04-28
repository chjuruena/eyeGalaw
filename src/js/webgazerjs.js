

function getObjectdata(callback) {
    chrome.storage.local.get(null, callback);
}
function setObjectdata(obj){
    chrome.storage.local.set(obj, function () {
    });
}

init();
getObjectdata( function(data){


    if (data["wgvideofeed"]) showVideo(true);
    else {
        // alert("neh");
        showVideo(false);             
    }
});
var scrolled=0;
var scroll_speed;
var startvid;

 window.onload = function() {

    var localstorageLabel = 'webgazerGlobalData';
    window.localStorage.setItem(localstorageLabel, null);
}

function init(){
     // startvid = null;

    getObjectdata( function(data){
          
          if((data["start_button"] =='STOP' && data["action"]=="click") || (data["start_button"] =='STOP' && 
            data["page-action"]=="reload" && data["action"]=="reload")) {
                // alert("start");
                startWebgazerfeed(); 
                var obj= {
                     "page-action" : null 
                 };
                 setObjectdata(obj);              

            }
          else if(data["start_button"] =='START' && data["action"]=="click") {
                webgazer.pause();

          }
          if(data["start_button"] =='STOP' && data["action"]=="reload" ){                
                webgazer.resume();
            }  

    });
    
}

function showVideo(enabled){
    if (enabled) startvid=setTimeout(checkIfReady,100);
    else {
        console.log("hide");
        clearTimeout(startvid);
        var video = document.getElementById('webgazerVideoFeed');
        video.style.display = 'none';
        // document.body.removeChild(video);
        
        var overlay=document.getElementById('overlay');
        // document.body.removeChild(overlay);
        video.style.display = 'overlay';



    }
}

// function setupvid(){
    var width = 320;
    var height = 240;
    var topDist = '100px';
    var leftDist = '0px';
    
    var setup = function() {
        var video = document.getElementById('webgazerVideoFeed');
        video.style.display = 'block';
        video.style.position = 'fixed';
        video.style.top = topDist;
        video.style.left = leftDist;
        video.width = width;
        video.height = height;
        video.style.margin = '0px';

        webgazer.params.imgWidth = width;
        webgazer.params.imgHeight = height;

        var overlay = document.createElement('canvas');
        overlay.id = 'overlay';
        overlay.style.position = 'fixed';
        overlay.width = width;
        overlay.height = height;
        overlay.style.top = topDist;
        overlay.style.left = leftDist;
        overlay.style.margin = '0px';

        document.body.appendChild(overlay);

        var cl = webgazer.getTracker().clm;

        function drawLoop() {
            requestAnimFrame(drawLoop);
            overlay.getContext('2d').clearRect(0,0,width,height);
            if (cl.getCurrentPosition()) {
                cl.draw(overlay);
            }
        }
        drawLoop();
    };
    function checkIfReady() {
        if (webgazer.isReady()) {
            setup();
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    // setTimeout(checkIfReady,100); 
// }
// function showLoadingscreen(show){
//      chrome.tabs.executeScript({file: '/thirdParty/jquery-3.1.1.min.js'}, function(){
           
//             chrome.tabs.executeScript(null, {
//             // file: 'src/js/insertLoading.js'                        
//             code:
//             "var preloader = document.createElement( \'div\' );" +
//             "preloader.setAttribute(\'id\', \'preloader\');" +
//             "document.body.appendChild(preloader);"

//         // },function(){            
//         });           

        
//              // $('.toggle-loading').click(function () {
//              //    if (target.hasClass('loading')) {
//              //      target.loadingOverlay('remove');
//              //    } else {
//              //      target.loadingOverlay();
//              //    };
//              //  });

//     });



// }

function startWebgazerfeed(){
    
    var page_action;
    var start_button;
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
    .setTracker('clmtrackr')
    .setGazeListener(function(eyedata, elapsedTime) {



          if(page_action=="removeArrows" && start_button == "START" ) {
            // alert("removeArrows")
            webgazer.showPredictionPoints(false);
            webgazer.clearGazeListener();
            webgazer.end();
            // return;

          }

        if (eyedata == null) {
            console.log("nagnull");           
            return;
        }

        //show
        //  executescript
        // showLoadingscreen(true);
        // var target = $('#target');
        // target.loadingOverlay();  
        getObjectdata( function(data){
          // alert(data["page-action"]+ data["start_button"] + data["action"]=="click" )

          if(data["page-action"]=="removeArrows" && data["start_button"] == "START" ) {
            start_button =  data["start_button"];
            page_action =  data["page-action"];
            console.log("page-action: removeArrows")

            // webgazer.showPredictionPoints(false);
            // webgazer.clearGazeListener();
            // webgazer.end();
            // return;
          } 

          
          // toastr["success"]("", "eyeGalaw succesfully launched");
          //hdie

         

          // showtoastr(type,msg);
          // if (eyedata != null) alert("yey")


          var xprediction = eyedata.x; //these x coordinates are relative to the viewport 
          var yprediction = eyedata.y; //these y coordinates are relative to the viewport
          // console.log(elapsedTime); //elapsed time is based on time since begin was called
          // alert(data["load_page"])
          if(data["load_page"]){
            $('.loader').fadeOut('slow',function(){
              $(this).remove();
              var obj= {
                 "load_page" : false
                 
              };
              setObjectdata(obj); 

            });
            if($('#popup1')){
              $('#popup1').fadeOut('slow',function(){
                $(this).remove();
              });
              
            }
            
          }



            

            
            var arrow_down=data["gaze_down"];
            var arrow_up=data["gaze_up"];
            var prev_page=data["prev_page"];
            var frwd_page=data["frwd_page"];
            var hide=data["hide_div"];
            var hold=data["hold_div"];
            // var scrll_bottom = data["scrll_bottom"];
            // var scrll_top = data["scrll_top"];
          

             // /////////////////////////////////
                console.log("X-gaze:" + xprediction+ " Y-gaze:" +yprediction);
                console.log("X-arrow:" + arrow_down.x + " Y-arrow:" +arrow_down.y);
                console.log("X-arrow:" + arrow_up.x + " Y-arrow:" +arrow_up.y);
                console.log("X-click:" + data["x"]+ " Y-click:" +data["y"]);
             // /////////////////////////////////

             // scroll_speed
            var scroll_speed=data["scroll_speed"];
            var pagePosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var position2 =  $(window).scrollTop();
            if ( position2 != pagePosition) alert("hello");           
            


            function scrollz(scrolled){
                $("html, body").animate({
                    scrollTop:  scrolled
               });
                return false;
            }

            // function //setTimeout(func) {
            //     var i = 0;
            //     var timer = setInterval(function() {
            //         console.log(++i);
            //         if (i === 4) { //seconds from RRL
            //             clearInterval(timer);
            //         }
            //         console.log('post-interval'); //this will still run after clearing
            //     }, 4000);
            // }

            // function setTimeout(func) {
            //    // var func = new Function(fxn);
            //     var i = 0;
            //      var timer;
            //     function fxn (func) {
            //         i++;
            //         console.log(++i);
            //         if (i === 4) { //seconds from RRL
                        
            //              var temp = new Function(func);
            //              temp();
            //             clearInterval(timer);
            //         }
            //         // console.log('post-interval'); //this will still run after clearing
            //     }
            //     // var fxn1 = fxn;
            //    timer = setInterval(fxn, 1000);
            // }
           


            if ((hold.x < xprediction &&  xprediction<(hold.x+100))&& (hold.y  < yprediction && yprediction<(hold.y+100))){
                // //setTimeout();
                // //setTimeout();
                // //setTimeout();
                // //setTimeout();
                // //setTimeout();
                // //setTimeout();
                // alert('hold');
                // window.history.back();
                             


                function tempToggleFunc(){
                    var tempToggle = data["hold_toggle"];
                     var msg;
                    if(tempToggle) {
                       // tempToggle = !tempToggle;                    
                        scroll_speed= data["pageheight"]*(data["scroll_speed_slider"]/100);
                        // console.log()
                        // msg= "Scrolling disabled";
                    }else{
                        // tempToggle = true;
                        // msg= "Scrolling enabled";

                       scroll_speed=0;
                    }
                    tempToggle = !tempToggle; 

                    // toastr["warning"]("", msg);
                    

                    // var arr = [];
                    // arr.push("warning", msg);
                    var obj= {
                         "hold_toggle" : tempToggle,
                         "scroll_speed" : scroll_speed
                         
                     };
                     setObjectdata(obj); 
                      getObjectdata( function(data){
                      var type, msg;
                        if(data["hold_toggle"]==true && scroll_speed==0) {
                          msg= "Scrolling disabled";
                          type="error";
                        }
                        else if(data["hold_toggle"]==false && scroll_speed!=0) {
                          msg= "Scrolling enabled";
                          type="warning"
                        }
                        toastr[type]("", msg);

                    });                     
                }
               setTimeout(tempToggleFunc(), 4000);

            // if ((arrow_down.x < xprediction &&  xprediction<(screen.width-110))&& (arrow_down.y  < yprediction && yprediction<(arrow_down.y+100))){
            }
            frwd_page
            if ((frwd_page.x < xprediction &&  xprediction<(frwd_page.x+50))&& (frwd_page.y  < yprediction && yprediction<(frwd_page.y+100))){
                // alert("me here");
                if ( scroll_speed>0) setTimeout(window.history.forward(), 4000);                
                else  toastr["error"]("", "Scrolling disabled"); 
                
            }

            if ((prev_page.x < xprediction &&  xprediction<(prev_page.x+50))&& (prev_page.y  < yprediction && yprediction<(prev_page.y+100))){
                // alert("me here");
                if ( scroll_speed>0) setTimeout(window.history.back(), 4000); 
                else  toastr["error"]("", "Scrolling disabled"); 
            }
            if ((arrow_up.x < xprediction &&  xprediction<(screen.width-110))&& (arrow_up.y  < yprediction && yprediction<(arrow_up.y+100))){
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
              console.log("arrow_up")
             // if ( (arrow_up.y  < yprediction && yprediction<(arrow_up.y+100))){                     
               // alert("arr up")
               function arrDown(){

                 if(scroll_speed==0)  toastr["error"]("", "Scrolling is disabled");

                  
                  scrolled=pagePosition-scroll_speed;
                  console.log("up");           
                  //setTimeout();
                  scrollz(scrolled);  
                }     
                setTimeout(arrDown(), 4000);

             } 

            if ((arrow_down.x < xprediction &&  xprediction<(screen.width-110))&& (arrow_down.y  < yprediction && yprediction<(arrow_down.y+100))){
            
              // if  ((arrow_down.y < yprediction) && ((arrow_down.y+100)  > yprediction )){                  
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               console.log("down")
               function arrDown(){
                 if(scroll_speed==0)  toastr["error"]("", "Scrolling is disabled");
                  scrolled=pagePosition+scroll_speed;
                  console.log("down"); 
                  scrollz(scrolled);
                
               }
                setTimeout(arrDown(), 4000);
                // setTimeout(arrDown(), 4000);
                

             }



                
            
            // if ((scrll_top.x < xprediction &&  xprediction<(scrll_top.x+50))&& (scrll_top.y  < yprediction && yprediction<(scrll_top.y+50))){
            //     // alert("scrollTop")
            //     //setTimeout();                
            //     // window.history.back();
            //     // $('html, body').scrollTop(0);
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     console.log("scrll_top")
            //     function scrllT(){
            //       if (scroll_speed!=0){
            //           $('html, body').animate({ scrollTop: 0 }, 'fast');
            //           // $(window).scrollTop();


            //       }

            //       return false;


            //     }
            //     $( "#scrll_top" ).on( "click", function(e) {
            //         // alert( $( this ).text() );
            //          e.preventDefault();
            //         if (scroll_speed!=0){
            //           $('html, body').animate({ scrollTop: 0 }, 'fast');
            //         }
            //         return false;

            //       });
            //     $( "#scrll_top" ).triggerHandler( "click" );

            //     // var pagePositiontemp = pagePosition;
            //     // while(pagePositiontemp>0){
            //     // pagePositiontemp = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            //     // arrUP();
            //     // }
            //     function arrUP(){

            //      if(scroll_speed==0)  toastr["error"]("", "Scrolling is disabled");

                  
            //       scrolled=0;
            //       console.log("scroll__up");           
            //       //setTimeout();
            //       scrollz(scrolled);  
            //       // return false;
            //     }    
            //     // setTimeout(, 4000);
            //     // pagePosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
               


            // }
            // if ((scrll_bottom.x < xprediction &&  xprediction<(scrll_bottom.x+50))&& (scrll_bottom.y  < yprediction && yprediction<(scrll_bottom.y+50))){
            //     // alert("scrll_bottom");
            //     //setTimeout();                
            //   // window.history.back();
            //   console.log("scrll_bottom")
            //   console.log("scrll_bottom")
            //   console.log("scrll_bottom")
            //   console.log("scrll_bottom")
            //   console.log("scrll_bottom")
            //   console.log("scrll_bottom")
            //   console.log("scrll_bottom")
            //   console.log("scrll_bottom")
            //   console.log("scrll_bottom")
            //   console.log("scrll_bottom")
            //   console.log("scrll_bottom")
            //   console.log("scrll_bottom")
            //   function scrllB(){
            //     if (scroll_speed!=0){
            //             // $("html, body").animate({ scrollTop: $(document).height() }, 'fast');
            //             window.scrollTo(0, document.body.scrollHeight);

            //     }
                
            //   }
            //   setTimeout(scrllB(), 4000);
            //     // alert("pagePosition scrll_bot" +pagePosition);
            //     pagePosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            //     // //setTimeout();                
            //     // //setTimeout();                



            // }
             


             if ((hide.x < xprediction &&  xprediction<(hide.x+100))&& (hide.y  < yprediction && yprediction<(hide.y+100))){
               
                  function tempToggleFunc(){
                    var tempToggle = data["hide_toggle"];
                     var msg;
                     function changeOpcty(val){
                        var arr=[ "#prev_page", "#frwd_page", "#hide_div","#hold_div", "#scrll_top", "#scrll_bottom", "#triangle_down", "#triangle_up"];
                        arr.forEach(function(element) {
                            console.log(document.getElementById(element));
                            if (element) $(element).css('opacity', val);
                        });  

                     }
                    if(tempToggle) {
                      changeOpcty(0);
                    }else {
                      changeOpcty(data["opacity"]/100);                        
                    }
                    tempToggle = !tempToggle; 

                    var obj= {
                         "hide_toggle" : tempToggle                         
                     };
                     setObjectdata(obj); 
                  
                }
                setTimeout(tempToggleFunc(), 4000);


              }



                   //  $("#hide_div").toggle(
                   //   function () {
                                        
                   //   }
                   //   ,function () {
                       
                   //      $(".hidehold_div").css('opacity', '1');
                   //      var arr=[ "#prev_page","#hide_div" ,"#hold_div", "#scrll_top", "#scrll_bottom"];
                   //      arr.forEach(function(element) {
                   //          console.log(document.getElementById(element));
                            
                   //          $(element).css('opacity', data["opacity"]/100);
                            
                   //      });

                 
                   // });
                
          







                
            // }
            

            // if ((hold.x < xprediction &&  xprediction<(hold.x+100))&& (hold.y  < yprediction && yprediction<(hold.y+100))){
            //     // //setTimeout();
            //     alert('hold');
            //     // window.history.back();
            // }


             // else $('#gaze_up').css('background-color', 'red');
        });

    }).begin().showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */
    // });
}


 window.onbeforeunload = function() {
    webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    // window.localStorage.clear(); //Comment out if you want to save data across different sessions 
  }

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "200",
    "hideDuration": "1000",
    "timeOut": "1000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}