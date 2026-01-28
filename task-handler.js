const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'tasks.json');

function loadTasks(){
    if(!fs.existsSync(DATA_FILE)){
        return {["lastId"]: 0, ["tasks"]: []};
    }
    const raw = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

    return {
        lastId: raw.lastId ?? 0,
        tasks: Array.isArray(raw.tasks) ? raw.tasks : []
    }
}

function saveTasks(tasks){
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

module.exports = { loadTasks, saveTasks };