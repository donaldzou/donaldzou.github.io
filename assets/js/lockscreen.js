import {app_bar_show} from "./appbar.js";

// Start up screen
function startup(){
    setTimeout(function (){
        $(".loader-bar").css("transition", "ease-in-out 1s").css("width", "33%");
        setTimeout(function (){
            $(".loader-bar").css("transition", "ease-in-out 1.4s").css("width", "67%");
            setTimeout(function (){
                $(".loader-bar").css("transition", "ease-in-out 1.2s").css("width", "100%");
                setTimeout(function (){
                    $(".loader-bar-wrapper").removeClass("animate__fadeIn").addClass("animate__fadeOut");
                    $(".avatar-wrapper").css("transition", "ease-in-out 1.3s").css("margin-bottom", "150px");
                    setTimeout(function (){
                        $(".avatar-wrapper").addClass("loaded-avatar-wrapper").css("transition","ease-in-out 0.4s")
                        $(".avatar-name").css('transition', 'ease-in-out 1s').css("opacity", "100");
                        status_bar_time();
                        status_bar_show();
                        lockscreen_control_show();

                        // Avatar Clicked
                        $(".avatar-wrapper.loaded-avatar-wrapper").on("click",function (){
                            loader_hide();
                            lockscreen_control_hide();
                            app_bar_show();
                            $(".gradient-bg").css("transition","opacity ease-in-out 1.5s").css("opacity",100)
                            $(".status-bar").css("background-color","#13131370");
                            $(".status-bar-left img").addClass("animate__animated animate__fadeInDown").css("display", "block")
                        })

                        // loader_hide();
                        // lockscreen_control_hide();
                        // app_bar_show();
                    },1300)
                }, 1400);
            },1800)
        },1400)
    },700)
}

// Status Bar
function status_bar_show(){
    $(".status-bar").css('top','0')
}
function status_bar_time(){
    $(".status-bar-time").html(new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true }))
}
// Lockscreen Control Show
function lockscreen_control_show(){
    $(".lockscreen-control").css("bottom", "69px");
}

// Lockscreen control hide
function lockscreen_control_hide(){
    $(".lockscreen-control").addClass("animate__animated animate__fadeOut");
    setTimeout(function (){
        $(".lockscreen-control").hide();
    },1000)
}

// Lockscreen hide
function loader_hide(){
    $(".loader").addClass("animate__animated animate__fadeOut");
    setTimeout(function (){
        $(".loader").hide();
    },1000)
}




$(".lockscreen-shutdown").click(function (){
    $(".lockscreen-control").addClass("animate__animated animate__fadeOutDown");
    $(".status-bar").css("top","");
    $(".avatar-name").css("opacity","");
    $(".avatar-wrapper").css("margin-bottom","");
    setTimeout(function (){
        $(".avatar-wrapper").addClass("animate__animated animate__fadeOut");
        setTimeout(function (){
            $("body").css("background-color", "#000000").html("");
        },800)
    },300)
});

$(".lockscreen-restart").click(function (){
    $(".lockscreen-control").addClass("animate__animated animate__fadeOutDown");
    $(".status-bar").css("top","");
    $(".avatar-name").css("opacity","");
    $(".avatar-wrapper").css("margin-bottom","");
    setTimeout(function (){
        $(".avatar-wrapper").addClass("animate__animated animate__fadeOut");
        location.reload();
    },300)
});


export {startup, status_bar_time, status_bar_show};