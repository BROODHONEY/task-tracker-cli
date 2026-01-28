// Task Handler Module - Manages task persistence (load/save from JSON file)

const fs = require('fs');
const path = require('path');

// Path to the tasks data file

if(!fs.existsSync(__dirname)){
    fs.mkdirSync(__dirname);
}

const DATA_FILE = path.join(__dirname, 'tasks.json');

// Loads tasks from the JSON file, or returns empty structure if file doesn't exist
function loadTasks(){
    if(!fs.existsSync(DATA_FILE)){
        return {["lastId"]: 0, ["tasks"]: []};
    }
    // Parse JSON and validate data structure
    const raw = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

    return {
        lastId: raw.lastId ?? 0,
        tasks: Array.isArray(raw.tasks) ? raw.tasks : []
    }
}

// Saves tasks to JSON file with formatted output (2-space indentation)
function saveTasks(tasks){
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

module.exports = { loadTasks, saveTasks };