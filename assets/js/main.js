$(document).ready(function (){
    start_up();
    status_bar_time();
})

function start_up(){
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
                        status_bar_show();
                    },1300)
                }, 1400);
            },1800)
        },1400)
    },1000)
}

function status_bar_show(){
    $(".status-bar").css('top','0')
};
function status_bar_time(){
    $(".status-bar-time").html(new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true }))
}

function app_bar_show(){
    $(".app-bar").css("transition", "ease-in-out 1s").css("bottom","10px")
    setTimeout(function (){
        $(".app-bar-img").addClass("app-bar-img-animation");
        terminal_window_show();
    },1300)
}

function terminal_window_show(){
    setTimeout(function (){
        $(".terminal-wrapper").css("display","flex")
        // detect_key();
    },400)

}


$(".avatar-wrapper").on("click", $(".loader-bar-wrapper"),function (){
    $(".loader").addClass("animate__animated animate__fadeOut");
    app_bar_show();
})


function detect_key(){
    var input_indicator = '<div class="input-indicator"></div>'
    var newline_content = "donaldzou@Donalds-Macbook-Pro ~ % "
    var newline = "<br><p class='command'>"+newline_content+"</p>"+input_indicator
    var empty_newline = "<br><p class='command'></p>"+input_indicator

    $(document).keyup(function(event){
        var regex = new RegExp("^[a-zA-Z0-9!@#$&()\\-`.+,/\"\'\s]*$");
        var command_max_width = $(".terminal-body").width() - 30;
        if ($(".terminal-body .command").last().width() >= command_max_width){
            $(".input-indicator").remove();
            $(".terminal-body").append(empty_newline)
            $(".terminal-body").scrollTop( $(".terminal-body").height());
        }
        if (event.code === "Backspace"){
            var newhtml = $(".terminal-body .command").last().html().slice(0,-1)
            if (newhtml.length >= newline_content.length){
                $(".terminal-body .command").last().html(newhtml)
            }
        }else if(event.code === "Enter"){
            $(".input-indicator").remove();
            $(".terminal-body").append(newline)
            $(".terminal-body").scrollTop( $(".terminal-body").height());
        }
        else{
            if (regex.test(event.code) && event.key.length == 1) {
                $(".terminal-body .command").last().append(event.key)
            }
        }


    });
}

detect_key();
