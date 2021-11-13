const readline = require('readline')
const fs = require('fs')
const readable = fs.createReadStream('pf0022pu.htm')

const rl = readline.createInterface({
    input: readable,
    output: process.stdount
})

rl.on('line', (line)=>{
    var resultado = line.toUpperCase();
    // string = string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    resultado = resultado.replace(/[^a-zA-Z]/g, ' ');
    console.log('<<<',resultado);
})
