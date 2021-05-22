import {terminal_window_show} from "./terminal.js";

// App bar
function app_bar_show(){
    $(".app-bar").css("transition", "ease-in-out 1s").css("bottom","10px")
    setTimeout(function (){
        $(".app-bar-img").addClass("app-bar-img-animation");
        terminal_window_show();
    },1300)
}

export {app_bar_show}