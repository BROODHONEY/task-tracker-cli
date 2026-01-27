const fs = require('fs');
const path = require('path');

const DATA_FILE = path.json('tasks.json');

function loadTasks(){
    if(!fs.existsSync(DATA_FILE)){
        return [];
    }
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveTasks(tasks){
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}