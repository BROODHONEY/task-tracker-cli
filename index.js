#! /usr/bin/env node
// Task Tracker CLI - Main entry point
// Handles command parsing and task operations

const taskHandler = require('./task-handler');
const args = process.argv.slice(2);
const command = args[0];
const tasks = taskHandler.loadTasks(); 

// ADD command - Creates a new task with the provided title
if (command === 'add') {
    const title = args.slice(1).join(' ');

    // Validate that a title was provided
    if (!title) {
        console.log('Please provide a task title.');
        process.exit(1);
    }

    // Create new task object with initial state
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
// LIST command - Displays all tasks with their status
else if (command === 'list') {
    
    if (tasks.tasks.length === 0) {
        console.log('No tasks found.');
        process.exit(1);
    } 
    if (args.length > 1) {
        const command = String(args[1]);    
        if(command === 'done' || command === 'inp' || command === 'not-started') {
            console.log(`Filtering tasks by status: ${command}`);
        } else {
            console.log('Invalid filter command. Use "done", "inp", or "not-started".');
            process.exit(1);
        }
        const filteredTasks = tasks.tasks.filter(task => {
            if(command === 'done') return task.done === true;
            if(command === 'inp') return task.progress === true && task.done === false;
            if(command === 'not-started') return task.progress === false && task.done === false;
        });
        if (filteredTasks.length === 0) {
            console.log('No tasks found for the specified filter.');
        } else {
            console.log('Filtered Tasks:');
            filteredTasks.forEach(task => {
                console.log(`${task.id}. [${task.done ? 'X' : task.progress ? 'P' : ' '}] ${task.title}`);
            });
        }
        process.exit(1);
    }
    else {
        // Display each task with status indicator: [X] = done, [P] = in-progress, [ ] = not started
        console.log('Tasks:');
        tasks.tasks.forEach(task => {
            console.log(`${task.id}. [${task.done ? 'X' : task.progress ? 'P' : ' '}] ${task.title}`);
        });
    }
}
else if (command === 'get-id') {
    const title = args.slice(1).join(' ');

    // Validate that a title was provided
    if (!title) {
        console.log('Please provide a task title.');
        process.exit(1);
    }

    const task = tasks.tasks.find(t => t.title === title);
    
    if (!task) {
        console.log(`Task with title "${title}" not found.`);
        process.exit(1);
    }

    console.log(`Task ID for "${title}": ${task.id}`);
}
// DONE command - Marks a task as completed
else if (command === 'done') {
    const id = Number(args[1]);    
    // Verify task existsconst id = Number(args[1]);
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
// INP command - Marks a task as in-progress
else if (command === 'inp') {
    const id = Number(args[1]);    
    // Verify task existsconst id = Number(args[1]);
    const task = tasks.tasks.find(t => t.id === id);
    
    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        process.exit(1);
    }
    task.progress = true;
    task.done = false;
    taskHandler.saveTasks(tasks);
    console.log(`Marked task ${id} as in-progress.`);
}
// REMOVE command - Deletes a task by ID
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
// HELP command - Displays usage information
else if (command === 'help' || !command) {
    console.log('Task Tracker CLI');
    console.log('Usage:');
    console.log('  task add "Task Title"    - Add a new task');
    console.log('  task get-id "Task Title" - Get the ID of a task by title');
    console.log('  task list                - List all tasks');
    console.log('  task list done           - List completed tasks');
    console.log('  task list inp            - List in-progress tasks');
    console.log('  task list not-started    - List not started tasks');
    console.log('  task done <id>           - Mark a task as done');
    console.log('  task inp <id>            - Mark a task as in-progress');
    console.log('  task rem <id>            - Remove a task');
    console.log('  task clr-list            - Clear all tasks');
    console.log('  task help                - Show this help message');
}
else if (command === 'clr-list' || command === 'clear-list') {s
    taskHandler.saveTasks([]);
    console.log('Cleared all tasks.');
}
else {
    console.log(`Unknown command: ${command}`);
    console.log('Use "task help" for a list of commands.');
}
