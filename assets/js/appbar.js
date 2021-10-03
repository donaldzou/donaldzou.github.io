import {terminal_window_show} from "./terminal.js";

// App bar
function app_bar_show(){
    $(".app-bar").css("transition", "ease-in-out 1s").css("bottom","10px")
    setTimeout(function (){
        $(".app-bar-img.active").addClass("app-bar-img-animation");
        setTimeout(function (){
            $(".app-bar-img.active").siblings('div').addClass('app-running')
        },1700)
        terminal_window_show();
    },1300)
}

export {app_bar_show}