#! /usr/bin/env node

const args = process.argv.slice(2);
const command = args[0];

console.log(`Command received: ${command}`);
console.log('Arguments:', args.slice(1));