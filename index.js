#! /usr/bin/env node
const taskHandler = require('./task-handler');
const args = process.argv.slice(2);
const command = args[0];
const tasks = taskHandler.loadTasks(); 

if (command === 'add') {
    const title = args.slice(1).join(' ');

    if (!title) {
        console.log('Please provide a task title.');
        process.exit(1);
    }

    const newTask = {
        id : tasks.lastId + 1,
        title: title,
        progress: false,
        done: false
    }

    tasks.tasks.push(newTask);
    tasks.lastId += 1;
    taskHandler.saveTasks(tasks);

    console.log(`Added task: "${title}"`);
}
else if (command === 'list') {
    if (tasks.tasks.length === 0) {
        console.log('No tasks found.');

    } else {
        console.log('Tasks:');
        tasks.tasks.forEach(task => {
            console.log(`${task.id}. [${task.done ? 'X' : task.progress ? 'P' : ' '}] ${task.title}`);
        });
    }
}
else if (command === 'done') {
    const id = Number(args[1]);
    const task = tasks.tasks.find(t => t.id === id);
    
    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        process.exit(1);
    }
    task.done = true;
    task.progress = false;
    taskHandler.saveTasks(tasks);
    console.log(`Marked task ${id} as done.`);

}
else if (command === 'inp') {
    const id = Number(args[1]);
    const task = tasks.tasks.find(t => t.id === id);
    
    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        process.exit(1);
    }
    task.progress = true;
    taskHandler.saveTasks(tasks);
    console.log(`Marked task ${id} as in-progress.`);
}
else if (command === 'rem' || command === 'remove') {
    const id = Number(args[1]);
    const index = tasks.tasks.findIndex(t => t.id === id);
    
    if (index === -1) {
        console.log(`Task with ID ${id} not found.`);
        process.exit(1);
    }
    tasks.tasks.splice(index, 1);
    taskHandler.saveTasks(tasks);
    console.log(`Deleted task with ID ${id}.`);
}
else if (command === 'help' || !command) {
    console.log('Task Tracker CLI');
    console.log('Usage:');
    console.log('  task add "Task Title"   - Add a new task');
    console.log('  task list                - List all tasks');
    console.log('  task done <id>          - Mark a task as done');
    console.log('  task inp <id>           - Mark a task as in-progress');
    console.log('  task rem <id>           - Remove a task');
    console.log('  task clr-list           - Clear all tasks');
    console.log('  task help               - Show this help message');
}
else if (command === 'clr-list' || command === 'clear-list') {
    taskHandler.saveTasks([]);
    console.log('Cleared all tasks.');
}
else {
    console.log(`Unknown command: ${command}`);
    console.log('Use "task help" for a list of commands.');
}