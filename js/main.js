// $(function(){
var a = angular.module('DrawingApp', ['ngMaterial'])
    a.config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue')
            .accentPalette('light-blue');
    });
    a.controller('AppCtrl', function($scope,  $mdDialog) {

         $scope.title = function(ev) {
                         $mdDialog.show({
                                 controller: DialogController,
                                 templateUrl: 'template/pageTitle.html',
                                 parent: angular.element(document.body),
                                 targetEvent: ev,
                                 clickOutsideToClose:true// Only for -xs, -sm breakpoints.
                         });

                 };

         function DialogController($scope, $mdDialog) {

                         $scope.close = function() {
                                 $mdDialog.cancel();
                         };
                         $scope.cancel = function() {
                                 $mdDialog.cancel();
                         };
                         $scope.print = function() {
                                 console.log("hh")
                                 $("#title").html($scope.printTitle).removeClass("hidden");
                                 window.print();
                                 $("#title").addClass("hidden");
                                 $mdDialog.cancel();

                         }  
        }                     
        $scope.width = 2;
        $scope.strokecolor;
        $("md-slider-container").click(function(){
            dimension = $scope.width + "px";
            $(".stroke_size").css("width", dimension);
            $(".stroke_size").css("height", dimension);
            ctx.lineWidth = $scope.width;

        });

        var paint = false;
        var paintOrErase = "paint";
        var canvas = document.getElementById("drawing");
        var ctx = canvas.getContext("2d");
        var canvasContainer = $(".canvas_container")

        var mouse = {x:0, y:0};

        //Get Saved Image
        if(localStorage.getItem("prevImg") != null){
            var img = new Image();
            img.onload = function(){
                ctx.drawImage(img, 0, 0);
            }
            img.src = localStorage.getItem("prevImg");
        };
        //Get Saved Image


        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        $("#drawing").mousedown(function(e){
            paint = true;
            ctx.beginPath();
            mouse.x = e.clientX - $(this).position().left;
            mouse.y = e.pageY - $(this).position().top;
            console.log(e.pageX,  this.offsetLeft, mouse.x, mouse.y)

            ctx.moveTo(mouse.x, mouse.y);
        });

        $("#drawing").mousemove(function(e){
            mouse.x = e.pageX - $(this).position().left;
            mouse.y = e.pageY - $(this).position().top; 

           if(paint == true){
                if(paintOrErase == "paint"){
                    ctx.strokeStyle = $('.selectColor').val();
                }
                else{
                    ctx.strokeStyle = "white"
                }
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        });
        canvasContainer.mouseup(function(){
            paint = false;
        });
        canvasContainer.mouseleave(function(){
            paint = false;
        });
        $(".erase").click(function(){
            if(paintOrErase == "paint"){
                paintOrErase = "erase";
                $(this).addClass('buttonSelected')
            }else{
                paintOrErase = "paint";
                $(this).removeClass('buttonSelected')
            }

        })
        $(".clear").click(function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            paintOrErase = "paint";
        })

        $(".save").click(function(){
            if(typeof(localStorage) != null){
                localStorage.setItem("prevImg", canvas.toDataURL());
            }
            else{
                window.alert('Your Web Browser does not support Local Storage');
            }
        });
        
        $('.selectColor').change(function(){
            $('.stroke_size').css("background-color", $(this).val());
            paintOrErase = "paint";
            $(".erase").removeClass('buttonSelected')

        });

    });


