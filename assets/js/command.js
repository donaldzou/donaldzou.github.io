import {terminal_init, terminal_new_line, terminal_print, terminal_clear} from "./terminal.js";

class historyCommand{
    constructor() {
        this.top = undefined;
        this.tail = undefined;
        this.currentCommand = undefined;
    }
    addCommand(command){
        let tmp = new commandObj(command);
        if (this.top === undefined){
            this.top = tmp;
            this.tail = tmp;
            this.currentCommand = tmp;
        }else{
            let tmp = this.top;
            while (tmp.getNext() !== undefined){
                tmp = tmp.getNext();
            }
            let newObj = new commandObj(command);
            tmp.setNext(newObj);
            newObj.setPrevious(tmp);
            this.tail = newObj;
            this.currentCommand = newObj;
        }
    }
    setCurrentCommand(commandObj){
        this.currentCommand = commandObj;
    }
}

class commandObj{
    constructor(command) {
        this.command = command;
        this.next = undefined;
        this.previous = undefined;
    }
    getCommand(){
        return this.command;
    }
    getNext(){
        return this.next;
    }
    getPrevious(){
        return this.previous;
    }
    setNext(next){
        this.next = next
    }
    setPrevious(previous){
        this.previous = previous;
    }
    setCommand(command){
        this.command = command;
    }
}


function exec_command(cmd){
    $(".input-indicator").remove();
    cmd = cmd.trim();
    const commands = {
        "clear": clear,
        "command_not_found": cmd_not_found,
        "./donald": donald_help,
        "./donald --help": donald_help,
        "./donald --intro": donald_intro,
        "./donald --code": donald_code,
        "./donald --education": donald_education,
        "./donald --jobs": donald_jobs,
        "ls": ls
    }
    $(".running_process").html(cmd);
    try{
        if (cmd.length > 0) {
            commands[cmd]();
        }else {
            terminal_new_line();
        }
    }catch (err){
        cmd_not_found(cmd);
    }

}

// Terminal Functions
const clear = function () {
    terminal_init();
    terminal_clear();
};
const cmd_not_found = function (cmd) {
    terminal_print(['zsh:  command not found:  ' + cmd])
    terminal_new_line();
};
const donald_help = function () {
    let lines = [
        "\<👋 Welcome to Donald's Terminal 👋\>",
        "Usage: ./donald --[option]",
        "Available Options:",
        "  code: 👨‍💻 See what Donald is coding",
        "  education: 🎓 Show Donald's education",
        "  intro: 📖 Show something about Donald",
        "  jobs: 💼 Show Donald's work experiences",
        "  help: 🧐 Open this help menu"
    ]
    terminal_print(lines)
    terminal_new_line();
};
const donald_intro = function (){
    let lines = [
        "----------------------------",
        "| 📖 Something about me 📖 |",
        "----------------------------",
        "🏫 Studying Computer Science in Western University",
        "🔍 Focus on web development",
        "‍💻‍ Pursuing a career in Full Stack Developer",
    ]
    terminal_print(lines)
    terminal_new_line();
}

const donald_education = function (){
    let lines = [
        "-----------------------------",
        "| 🎓 Where I am studying 🎓 |",
        "-----------------------------",
        "| Western University |",
        "B.S., Spec. in Computer Science",
        "London, Ontario, Canada",
        "2019 - 2023",
        "| Rothesay Netherwood School |",
        "Highschool",
        "Rothesay, New Brunswick, Canada",
        "2015 - 2019",
    ]
    terminal_print(lines);
    terminal_new_line();
}

const donald_jobs = function (){
    let lines = [
        "---------------------------------------------------------",
        "| Co-Founder / Chief Technology Office        AES Club1 |",
        "---------------------------------------------------------",
        "| Toronto, Ontario                  Jan, 2021 - Present |",
        "---------------------------------------------------------",
        "| Collaborated e-commerce start up with a friend. We    |",
        "| created this platform to help local artists in Canada |",
        "| to share or sell their amazing artwork. I’m in-charge |",
        "| on developing the whole platform. Used PHP, HTML, JS  |",
        "| to build the platform from scratch, provided to user  |",
        "| to upload and manage their artwork, and buyer can     |",
        "| communicate to seller through our messaging tool.     |",
        "---------------------------------------------------------",
        "",
        "---------------------------------------------------------",
        "| Video Editor Intern             North Pole Hoops Inc. |",
        "---------------------------------------------------------",
        "| London, Ontario                   Sep 2019 – Apr 2020 |",
        "---------------------------------------------------------",
        "| Remote video editor focused on Canada Highschool      |",
        "| basketball, making mixtapes for athletes.             |",
        "---------------------------------------------------------",
        "",
        "---------------------------------------------------------",
        "| Website UI Designer         Guangzhou Gaobo Education |",
        "---------------------------------------------------------",
        "| Guangzhou, China                  Mar 2018 – Apr 2018 |",
        "---------------------------------------------------------",
        "| Being a remote website UI designer, worked on their   |",
        "| company website for student to sign up their classes. |",
        "| Provide prototype to their website developer.         |",
        "---------------------------------------------------------",
        "",
        "---------------------------------------------------------",
        "| Website Developer Intern    Guangzhou Gaobo Education |",
        "---------------------------------------------------------",
        "| Guangzhou, China                  Jul 2017 – Sep 2017 |",
        "---------------------------------------------------------",
        "| Being a website developer intern and worked on        |",
        "| building their online course system.                  |",
        "---------------------------------------------------------",
    ]
    terminal_print(lines);
    terminal_new_line();
}


const donald_code = function (){
    let git_data = {};
    let total_repos = 0;
    let total_stargazer = 0;
    let total_open_issue = 0;
    let total_forks = 0;
    let total_code_time = 0;
    let avg_code_time = 0;
    $.ajax({
        "url": "https://api.github.com/users/donaldzou/repos",
        "method": "GET"
    }).done(function (res){
        git_data = res;
        total_repos = git_data.length;
        total_stargazer = 0;
        for (let i in git_data){
            if (git_data[i]["fork"] === false){
                total_stargazer += git_data[i]['stargazers_count'];
                total_open_issue += git_data[i]['open_issues_count'];
                total_forks += git_data[i]['forks_count'];
            }
        }
        $.ajax({
            type: 'GET',
            url: 'https://wakatime.com/share/@donaldzou/4b40bec4-c32a-4545-af66-e91eb768b92c.json',
            dataType: 'jsonp',
        }).done(function (response){
            total_code_time = response['data']['grand_total']['human_readable_total'];
            avg_code_time = response['data']['grand_total']['human_readable_daily_average'];
            let lines = [
                "---------------------------",
                "| 👨‍💻 My coding journey 👨‍💻 |",
                "---------------------------",
                "| GitHub       |  💡 "+total_repos+" Repository    " + "🤩 "+total_stargazer+" Stargazers    " + "🙋 "+total_open_issue+" Open Issues    "+"🍴 "+total_forks+" Forks",
                "| Daily Coding |  ⏰ "+total_code_time+" Total Coding Time    "+"⏱ "+avg_code_time+" Avg. Coding Time / Day"
            ]
            terminal_print(lines)
            $.ajax({
                type: 'GET',
                url: 'https://wakatime.com/share/@donaldzou/929fb406-424d-4c28-a073-6a8c2ced2e1b.json',
                dataType: 'jsonp'
            }).done(function (res){
                let lines = [
                    "| Languages    |  🛠 "+res['data'].length+" Programming Languages"
                ];
                for(let i in res['data']){
                    let percent = res['data'][i]['percent'];
                    percent = Math.floor(percent);
                    if (percent > 0) lines.push("|".repeat(percent)+" "+percent+"% - "+res['data'][i]['name'])
                }
                lines.push("and "+(res['data'].length - lines.length - 1)+" more...");
                terminal_print(lines)
                terminal_new_line();
            })
        });


    });
}

const ls = function (){
    let lines = [
        "donald    Readme.md"
    ]
    terminal_print(lines);
    terminal_new_line();
}

export {exec_command, historyCommand, commandObj}