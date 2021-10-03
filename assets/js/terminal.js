// Terminal Window
import {status_bar_show, status_bar_time} from "./lockscreen.js";
import {app_bar_show} from "./appbar.js";
import {exec_command, commandObj, historyCommand} from "./command.js";

const date = new Date();
let user_input = "";
const cmd_line_one = '<p class="command">Last login: '+date.toDateString().slice(0,-5)+' '+date.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", second:"2-digit", hour12: false })+' on ttys000</p>'
const input_indicator = '<div class="input-indicator"></div>'
const newline_content = "donaldzou@Donalds-Macbook-Pro ~ % "
const newline = "<br><p class='command'>"+newline_content+"</p>"+input_indicator
const empty_newline = "<br><p class='command'></p>"+input_indicator
let running_process = "-zsh";

function terminal_init(){
    $(".running_process").html(running_process);
    const terminal = $(".terminal-body");
    terminal.html(cmd_line_one+newline);
    $(".terminal-menu-group").css('display', 'flex');
    let animation_delay = 0;
    $(".terminal-menu-group .menu-link").each(function(){
        $(this).css("animation-delay", animation_delay+"s")
        $(this).addClass("animate__animated animate__fadeInDown");
        animation_delay += 0.1
    })
}

let commandHistory = new historyCommand();
commandHistory.addCommand("");
let tmpCommand = new commandObj("");
function detect_key(){
    $(document).keydown(function(event){
        const regex = new RegExp("^[a-zA-Z0-9!@#$&()\\-`.+,/\"\'\s]*$");
        const command_max_width = $(".terminal-body").width() - 30;
        if ($(".terminal-body .command").last().width() >= command_max_width){
            $(".input-indicator").remove();
            $(".terminal-body").append(empty_newline)
            $(".terminal-body").scrollTop($(".terminal-body").height());
        }
        if (event.code === "Backspace"){
            if (!Object.is(commandHistory.currentCommand, commandHistory.tail)){
                tmpCommand.setCommand(tmpCommand.getCommand().slice(0,-1));
                terminal_print_history_command(tmpCommand)
            }
            else if (commandHistory.tail.command.length > 0){
                commandHistory.tail.command = commandHistory.tail.command.slice(0,-1);
                terminal_print_history_command(commandHistory.tail)

            }
        }else if(event.code === "Enter"){
            if (!Object.is(commandHistory.currentCommand,commandHistory.tail)){
                if (tmpCommand.command !== "") {
                    var tmp = (tmpCommand.command)
                    commandHistory.tail.setCommand(tmp);
                    tmpCommand = new commandObj("");
                }else{
                    commandHistory.tail.setCommand(commandHistory.currentCommand.getCommand());

                }
            }
            exec_command(commandHistory.tail.command)
        }else if(event.code === "Tab"){
            event.preventDefault();
        }else if(event.code === "ArrowUp"){
            event.preventDefault();
            if (commandHistory.currentCommand !== undefined && commandHistory.currentCommand.previous !== undefined){
                commandHistory.setCurrentCommand(commandHistory.currentCommand.previous)
                tmpCommand.setCommand(commandHistory.currentCommand.command.slice());
                terminal_print_history_command(commandHistory.currentCommand)
            }
        }else if(event.code === "ArrowDown"){
            event.preventDefault();
            if (commandHistory.currentCommand !== undefined && commandHistory.currentCommand.next !== undefined){
                commandHistory.setCurrentCommand(commandHistory.currentCommand.next)
                tmpCommand.setCommand(commandHistory.currentCommand.command.slice());
                terminal_print_history_command(commandHistory.currentCommand)
            }
        }
        else{
            if (regex.test(event.code) && event.key.length === 1) {
                if (commandHistory.top === undefined){
                    commandHistory.addCommand(event.key);
                    terminal_print_history_command(commandHistory.tail)
                }else if(!Object.is(commandHistory.currentCommand, commandHistory.tail)){
                    tmpCommand.setCommand(tmpCommand.getCommand()+event.key);
                    terminal_print_history_command(tmpCommand)
                }
                else{
                    commandHistory.tail.command += event.key
                    terminal_print_history_command(commandHistory.tail)
                }
            }
        }
    });
}
function terminal_print_history_command(commandObj){
    $(".terminal-body .command").last().html(newline_content+commandObj.command)
}
export function terminal_clear(){
    if (commandHistory.top === undefined || commandHistory.tail.command.length > 0){
        commandHistory.addCommand("");
    }
}

function terminal_new_line(){
    $(".terminal-body").append(newline).scrollTop( $(".terminal-body")[0].scrollHeight);
    // user_input = "";
    if (commandHistory.top === undefined || commandHistory.tail.command.length > 0){
        commandHistory.addCommand("");
    }
    $(".running_process").html(running_process);
}
function terminal_print(lines){
    const terminal = $(".terminal-body");
    for (let i in lines){
        terminal.append("<br><p class='command'>"+lines[i]+"</p>")
    }
}

// Terminal Window Control
const terminal_main = $(".terminal-main");
$(".mini-button").click(function (){
    if (!terminal_main.hasClass("terminal-hidden")){
        terminal_main.addClass("terminal-hidden");
    }
});
$("#terminal .app-bar-img").click(function (){
    if (terminal_main.hasClass("terminal-closed")){
        terminal_main.removeClass("terminal-closed");
        $(".terminal-wrapper").css("display","block");
        $("#terminal .app-light").addClass("app-running");
        $("#terminal .app-bar-img").addClass("app-bar-img-animation");
        terminal_init();
    }
    else if (terminal_main.hasClass("terminal-hidden")){
        terminal_main.removeClass("terminal-hidden");
    }
})
function full_terminal(){
    if (!terminal_main.hasClass("terminal-full")){
        terminal_main.addClass("terminal-full");
        $(".terminal-full").css("margin-top", ($(".status-bar").outerHeight())+"px");
        $(".terminal-full").css("height",($(window).height() - $(".status-bar").height() - $(".app-bar").height()-20)+"px");
    }else{
        $(".terminal-full").css("height","")
        $(".terminal-full").css("margin-top", "");
        terminal_main.removeClass("terminal-full");
    }
}
$( window ).resize(function() {
    if (terminal_main.hasClass("terminal-full")){
        terminal_main.addClass("terminal-full");
        $(".terminal-full").css("margin", ($(".status-bar").height())+"px auto auto auto !important");
        $(".terminal-full").css("height",($(window).height() - $(".status-bar").height() - $(".app-bar").height()-20)+"px");
    }
});
$(".full-button").click(function (){
    full_terminal();
})
$(".terminal-header").dblclick(function (){
    full_terminal();
})
$(".close-button").click(function (){
    if (!terminal_main.hasClass("terminal-closed")){
        terminal_main.addClass("terminal-closed");
        $(".terminal-wrapper").css("display","none");
        $(".app-light").removeClass("app-running");
        $(".app-bar-img").removeClass("app-bar-img-animation");
        terminal_init();
        $(".terminal-menu-group").css('display', 'none');
    }
})

let termina_resizeObserver = new ResizeObserver(() => {
    $(".terminal-width").html(Math.round($(".terminal-main").width()))
    $(".terminal-height").html(Math.round($(".terminal-main").height()))
});
termina_resizeObserver.observe($(".terminal-main")[0]);

function terminal_window_show(){
    setTimeout(function (){
        terminal_init()
        detect_key();
        $(".terminal-wrapper").css("display","block")
        let startup_command = [".","/","d","o","n","a","l","d"," ","-","-","h","e","l","p"]
        let count = 0;
        let print_command = setInterval(function(){
            $(".terminal-body .command").last().append(startup_command[count]);
            count++;
            if (count === startup_command.length) {
                exec_command("./donald --help");
                clearInterval(print_command);
            }
        },50);
    },400)
}


// For testing
// terminal_init();
// detect_key();
// $(".terminal-wrapper").css("display", "block");
// app_bar_show();
// $(".status-bar-left img").css("display", "block");
// status_bar_time();
// status_bar_show();



export {terminal_window_show, terminal_new_line, terminal_init,terminal_print}