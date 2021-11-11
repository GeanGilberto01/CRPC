const readline = require('readline')
const fs = require('fs')
const readable = fs.createReadStream('pf0022pu.htm')

const rl = readline.createInterface({
    input: readable,
    output: process.stdount
})

rl.on('line', (line)=>{
    console.log('>>>',line.toUpperCase())
})
