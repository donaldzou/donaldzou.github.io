class historyCommand{
    constructor() {
        this.top = undefined;
        this.tail = undefined;
    }
    addCommand(command){
        let tmp = new commandObj(command);
        if (this.top === undefined){
            this.top = tmp;
            this.tail = tmp;
        }else{
            let tmp = this.top;
            while (tmp.getNext() !== undefined){
                tmp = tmp.getNext();
            }
            let newobj = new commandObj(command);
            tmp.setNext(newobj);
            newobj.setPrevious(tmp);
            this.tail = newobj;
        }
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
}

let commandHistory = new historyCommand();
commandHistory.addCommand("")
if (commandHistory.top === undefined || commandHistory.tail.command !== ""){
    commandHistory.addCommand("hello2");
}else{
    commandHistory.tail.command += "sd"
}

console.log(commandHistory);
